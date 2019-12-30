/**
 * TreatmentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function (req, res) {
    if (!_.has(req.session.medicalReport, 'treatments')) {
      return res.redirect(sails.route('treatments.add'));
    }

    res.view('pages/treatments/index', {
      data: req.session.medicalReport
    });
  }
};
