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
      },
      include: [
        { model: Condition, as: 'Conditions', include: [ { model: Document, as: 'Documents' } ] },
        { model: Medication, as: 'Medications', include: [ { model: Condition, as: 'Conditions' } ] },
        { model: Treatment, as: 'Treatments', include: [ { model: Condition, as: 'Conditions' } ] },
      ]
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

  store: async function () {
    // placeholder
  }
};
