/**
 * TreatmentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function (req, res) {
    if (!_.has(req.session.medicalReport, 'treatments')) {
      res.redirect(sails.route('treatments.add'));
    } else {
      res.locals.data = req.session.medicalReport;

      res.view('pages/treatments/index');
    }
  }
};
