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

module.exports = {
  create: function (req, res) {
    const data = req.session.medicalReport;
    const conditionList = conditionReducer(data.conditions);

    res.view('pages/medications/add', {
      conditionList: conditionList,
      oneValue: oneAttribute(conditionList)
    });
  },

  store: function (req, res) {
    const body = Object.assign({}, req.body);
    delete body._csrf;

    let valid = req.validate(req, res, require('../schemas/medication.schema'));

    if (valid) {
      // save model here
      if (!_.has(req.session.medicalReport, 'medications')) {
        req.session.medicalReport.medications = [];
      }
      req.session.medicalReport.medications.push(body);
      res.redirect(sails.route('medications'));
    }
  }
};

