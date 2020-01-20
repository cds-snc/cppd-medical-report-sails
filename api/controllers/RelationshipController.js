/**
 * RelationshipController
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
      }
    });

    /**
     * If we're returning to the form with flash data in locals,
     * merge it with the rest of the medicalReport in the session.
     */
    if (res.locals.data) {
      medicalReport = _.merge(res.locals.data, medicalReport);
    }

    res.view('pages/relationship', {
      data: medicalReport
    });
  },

  store: async function (req, res) {
    // Load the report from the database.
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      }
    });

    let valid = req.validate(req, res, require('../schemas/relationship.schema'));

    if (valid) {
      // save the model
      medicalReport.update({
        relationshipStarted: req.body.relationshipStarted,
        firstTreatmentDate: req.body.firstTreatmentDate,
        visitNumber: req.body.visitNumber,
        lastVisitDate: req.body.lastVisitDate,
        stopWorking: req.body.stopWorking,
        stopWorkingWhen: req.body.stopWorkingWhen,
      });

      res.redirect(sails.route('dashboard'));
    }
  }
};
