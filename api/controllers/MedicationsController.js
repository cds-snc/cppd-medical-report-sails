/**
 * MedicationsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const dataStore = require('../utils/DataStore');

module.exports = {
  index: async function (req, res) {
    // Load the report from the database.
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      }
    });

    res.view('pages/medications/index', {
      data: medicalReport
    });
  },

  save: async function (req, res) {
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
      await MedicalReport.update({
        patientMedications: req.body.patientMedications,
      }, {
        where: {
          applicationCode: req.session.applicationCode
        }
      });

      if (req.body.patientMedications) {
        return res.redirect(sails.route('medications.add'));
      }

      return res.redirect(sails.route('dashboard'));
    }
  }
};
