/**
 * EditMedicationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const {
  conditionReducer,
} = require('../utils/condition.mapper');

module.exports = {
  edit: function (req, res) {
    const data = req.session.medicalReport;
    const conditionList = conditionReducer(data.conditions);

    // redirect back if there are no medications
    if (!_.has(req.session.medicalReport, 'medications')) {
      return res.redirect(sails.route('medications'));
    }

    const medication = req.session.medicalReport.medications[req.params.id - 1];

    if (!medication) {
      return res.redirect(sails.route('medications'));
    }

    res.view('pages/medications/edit', {
      id: req.params.id,
      medication: medication,
      conditionList: conditionList
    });
  },

  update: function (req, res) {
    const body = Object.assign({}, req.body);
    delete body._csrf;

    // the medications array is 0 indexed
    const medicationId = req.params.id - 1;

    let valid = req.validate(req, res, require('../schemas/medication.schema'));

    if (valid) {
      // replace the contents of the medication on the array
      req.session.medicalReport.medications[medicationId] = body;

      res.redirect(sails.route('medications'));
    }
  }
};

