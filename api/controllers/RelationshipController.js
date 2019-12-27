/**
 * RelationshipController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function (req, res) {
    /**
     * If there is a medical report in the session, load it
     */
    if (req.session.medicalReport) {
      if (res.locals.data) {
        res.locals.data = _.merge(res.locals.data, req.session.medicalReport);
      } else {
        res.locals.data = req.session.medicalReport;
      }
    }

    res.view('pages/relationship');
  },

  store: function (req, res) {
    let valid = req.validate(req, res, require('../schemas/relationship.schema'));

    if (valid) {
      // save the model
      req.session.medicalReport.numYearsWasPatient = req.body.numYearsWasPatient;
      req.session.medicalReport.visitNumber = req.body.visitNumber;
      req.session.medicalReport.lastVisitDate = req.body.lastVisitDate;
      req.session.medicalReport.firstTreatmentDate = req.body.firstTreatmentDate;

      res.redirect(sails.route('expedited'));
    }
  }
};
