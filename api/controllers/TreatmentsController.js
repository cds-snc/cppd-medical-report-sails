/**
 * TreatmentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const dataStore = require('../utils/DataStore');

module.exports = {
  index: function (req, res) {
    res.view('pages/treatments/index', {
      data: req.session.medicalReport
    });
  },

  save: function (req, res) {
    let valid = req.validate(req, res, {
      patientTreatments: {
        presence: {
          allowEmpty: false,
          message: '^Please make a selection'
        }
      },
    });

    if (valid) {
      // save the model
      req.session.medicalReport.patientTreatments = req.body.patientTreatments;
      dataStore.storeMedicalReport(req.session.medicalReport);

      if (req.body.patientTreatments === 'yes') {
        return res.redirect(sails.route('treatments.add'));
      }

      return res.redirect(sails.route('dashboard'));
    }
  }
};
