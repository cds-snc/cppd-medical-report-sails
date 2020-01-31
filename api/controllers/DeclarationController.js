/**
 * DeclarationController
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

    res.view('pages/declaration', {
      data: medicalReport
    });
  },

  store: async function (req, res) {
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      }
    });

    let valid = req.validate(req, res, require('../schemas/declaration.schema'));

    if (valid) {
      // save the model
      await medicalReport.update({
        practitionerType: req.body.practitionerType,
        otherSpecify: req.body.otherSpecify,
        name: req.body.name,
        date: req.body.date,
        physicianAddress: req.body.physicianAddress,
        billingIdType: req.body.billingIdType,
        billingId: req.body.billingId,
      });

      res.redirect(sails.route('confirmation'));
    }
  }
};
