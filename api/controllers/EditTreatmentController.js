/**
 * EditTreatmentController
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
  edit: function (req, res) {
    const data = req.session.medicalReport;
    const conditionList = conditionReducer(data.conditions);

    // redirect back if there are no treatments
    if (!_.has(req.session.medicalReport, 'treatments')) {
      return res.redirect(sails.route('treatments'));
    }

    const treatment = req.session.medicalReport.treatments[req.params.id - 1];

    if (!treatment) {
      return res.redirect(sails.route('treatments'));
    }

    res.view('pages/treatments/edit', {
      id: req.params.id,
      treatment: treatment,
      conditionList: conditionList,
      oneValue: oneAttribute(conditionList),
      data: req.session.medicalReport,
    });
  },

  update: function (req, res) {
    const body = Object.assign({}, req.body);
    delete body._csrf;

    // the medications array is 0 indexed
    const treatmentId = req.params.id - 1;

    let valid = req.validate(req, res, require('../schemas/treatment.schema'));

    if (valid) {
      // replace the contents of the medication on the array
      req.session.medicalReport.treatments[treatmentId] = body;
      dataStore.storeMedicalReport(req.session.medicalReport);
      
      res.redirect(sails.route('treatments'));
    }
  }
};
