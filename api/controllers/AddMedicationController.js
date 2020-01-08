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
const Condition = require('../utils/Condition');

module.exports = {
  create: function (req, res) {
    let data = req.session.medicalReport;
    const conditionList = conditionReducer(data.conditions);

    /**
     * If we're returning to the form with flash data in locals,
     * merge it with the rest of the medicalReport in the session.
     */
    if (res.locals.data) {
      data = _.merge(res.locals.data, req.session.medicalReport);
    }

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
      req.body = Condition.addConditions(req, body, 'medicationTreatedCondition');
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

