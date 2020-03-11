/**
 * FutureWorkCapacityController
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

    res.view('pages/work', {
      data: medicalReport
    });
  },

  store: async function (req, res) {
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      }
    });

    let valid = req.validate(req, res, require('../schemas/work.schema'));

    if (valid) {
      // save the model
      const willReturn = req.body.returnToWork === '1';
      await medicalReport.update({
        returnToWork: req.body.returnToWork,
        plannedTreatments: req.body.plannedTreatments,
        returnToWorkWhen: willReturn ? req.body.returnToWorkWhen : null,
        typeOfWork: willReturn ? req.body.typeOfWork : null,
        workDetails: willReturn ? req.body.workDetails : null,
      });

      res.redirect(sails.route('dashboard'));
    }
  }
};
