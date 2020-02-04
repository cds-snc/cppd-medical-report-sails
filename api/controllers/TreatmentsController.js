/**
 * TreatmentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async function (req, res) {
    // Load the report from the database.
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      },
      include: [
        { model: Treatment, as: 'Treatments' }
      ]
    });

    res.view('pages/treatments/index', {
      data: medicalReport
    });
  },

  save: async function (req, res) {
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
      await MedicalReport.update({
        patientTreatments: req.body.patientTreatments,
      }, {
        where: {
          applicationCode: req.session.applicationCode
        }
      });

      if (req.body.patientTreatments === '1') {
        return res.redirect(sails.route('treatments.add'));
      }

      return res.redirect(sails.route('dashboard'));
    }
  }
};
