/**
 * PractitionerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async function (req, res) {
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      }
    });

    /**
     * If we're returning to the form with flash data in locals,
     * merge it with the rest of the medicalReport in the session.
     */
    if (res.locals.data) {
      medicalReport = _.merge(res.locals.data, medicalReport);
    }

    res.view('pages/practitioner', {
      data: medicalReport
    });
  },

  store: async function (req, res) {
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      }
    });

    let valid = req.validate(req, res, require('../schemas/practitioner.schema'));

    if (valid) {
      // save the model
      await medicalReport.update({
        practitionerType: req.body.practitionerType,
        practitionerTypeOtherSpecify: req.body.practitionerTypeOtherSpecify,
        practitionerFirstName: req.body.practitionerFirstName,
        practitionerLastName: req.body.practitionerLastName,
        practitionerAddress: req.body.practitionerAddress,
        practitionerCity: req.body.practitionerCity,
        practitionerProvince: req.body.practitionerProvince,
        practitionerCountry: req.body.practitionerCountry,
        practitionerPostal: req.body.practitionerPostal,
        practitionerEmail: req.body.practitionerEmail,
        practitionerPhone: req.body.practitionerPhone
      });

      res.redirect(sails.route('dashboard'));
    }
  }
};

