/**
 * HealthController
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
      res.locals.data = req.session.medicalReport;
    }

    res.view('pages/health');
  },

  store: function (req, res) {
    let valid = req.validate(req, res, require('../schemas/health.schema'));

    if (valid) {
      // save the model
      req.session.medicalReport.overall_health = req.body.overall_health;
      res.redirect(sails.route('documents'));
    }
  }

};
