/**
 * RelationshipController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const dataStore = require('../utils/DataStore');

module.exports = {
  index: function (req, res) {
    let data = req.session.medicalReport;

    /**
     * If we're returning to the form with flash data in locals,
     * merge it with the rest of the medicalReport in the session.
     */
    if (res.locals.data) {
      data = _.merge(res.locals.data, req.session.medicalReport);
    }

    res.view('pages/relationship', {
      data: data
    });
  },

  store: function (req, res) {
    let valid = req.validate(req, res, require('../schemas/relationship.schema'));

    if (valid) {
      // save the model
      req.session.medicalReport.numYearsWasPatient = req.body.numYearsWasPatient;
      req.session.medicalReport.visitNumber = req.body.visitNumber;
      req.session.medicalReport.lastVisitDate = req.body.lastVisitDate;
      req.session.medicalReport.firstTreatmentDate = req.body.firstTreatmentDate;
      dataStore.storeMedicalReport(req.session.medicalReport);

      res.redirect(sails.route('expedited'));
    }
  }
};
