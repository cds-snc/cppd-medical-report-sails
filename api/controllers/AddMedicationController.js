/**
 * AddMedicationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const {
  conditionReducer,
  oneAttribute,
} = require('../utils/condition.mapper');
const dataStore = require('../utils/DataStore');

module.exports = {
  create: function (req, res) {
    const data = req.session.medicalReport;
    const conditionList = conditionReducer(data.conditions);

    res.view('pages/medications/add', {
      conditionList: conditionList,
      oneValue: oneAttribute(conditionList),
      data: data,
    });
  },

  store: function (req, res) {
    const body = Object.assign({}, req.body);
    delete body._csrf;

    /**
     * If there are newConditions, create them pre-validation
     * and auto-select them
     */
    if (body.newConditions) {
      body.newConditions.forEach((item, index) => {
        if (!_.has(req.session.medicalReport, 'conditions')) {
          req.session.medicalReport.conditions = [];
        }

        if (item !== '') {
          req.session.medicalReport.conditions.push({
            conditionName: item
          });
        }
      });
    }

    let valid = req.validate(req, res, require('../schemas/medication.schema'));

    if (valid) {
      // save model here
      if (!_.has(req.session.medicalReport, 'medications')) {
        req.session.medicalReport.medications = [];
      }
      req.session.medicalReport.medications.push(body);

      dataStore.storeMedicalReport(req.session.medicalReport);
      res.redirect(sails.route('medications'));
    }
  }
};

