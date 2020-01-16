/**
 * AddMedicationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const dataStore = require('../utils/DataStore');
const ConditionHelper = require('../utils/ConditionHelper');

module.exports = {
  create: async function (req, res) {
    // load the medical report
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      }
    });

    let conditions = await Condition.findAll({
      where: {
        MedicalReportId: medicalReport.id
      },
      attributes: [ 'id', 'conditionName' ],
      raw: true
    });

    let conditionList = _.reduce(
      conditions,
      (outList, condition) => {
        outList[condition.id] = condition.conditionName;
        return outList;
      },
      {},
    );

    res.view('pages/medications/add', {
      conditionList: conditionList,
      oneValue: Object.keys(conditionList).length === 1,
      medicalReport: medicalReport,
    });
  },

  store: function (req, res) {
    const body = Object.assign({}, req.body);
    delete body._csrf;

    // use the value of the submit button to determine redirect
    const action = body.save_and;

    /**
     * If there are newConditions, create them pre-validation
     * and auto-select them
     */
    if (body.newConditions) {
      req.body = ConditionHelper.addConditions(req, body, 'medicationTreatedCondition');
    }

    let valid = req.validate(req, res, require('../schemas/medication.schema'));

    if (valid) {
      // save model here
      if (!_.has(req.session.medicalReport, 'medications')) {
        req.session.medicalReport.medications = [];
      }
      req.session.medicalReport.medications.push(body);
      dataStore.storeMedicalReport(req.session.medicalReport);

      if (action === 'add_another') {
        return res.redirect(sails.route('medications.add'));
      }

      res.redirect(sails.route('medications'));
    }
  }
};

