/**
 * MedicationsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const dataStore = require('../utils/DataStore');

module.exports = {
  index: function (req, res) {
    res.view('pages/medications/index', {
      data: req.session.medicalReport
    });
  },

  save: function (req, res) {
    let valid = req.validate(req, res, {
      patientMedications: {
        presence: {
          allowEmpty: false,
          message: '^Please make a selection'
        }
      },
    });

    if (valid) {
      // save the model
      req.session.medicalReport.patientMedications = req.body.patientMedications;
      dataStore.storeMedicalReport(req.session.medicalReport);

      if (req.body.patientMedications === 'yes') {
        return res.redirect(sails.route('medications.add'));
      }

      return res.redirect(sails.route('dashboard'));
    }
  }
};
