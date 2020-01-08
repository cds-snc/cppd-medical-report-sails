/**
 * ConditionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function (req, res) {
    if (_.has(req.session.medicalReport, 'conditions') && req.session.medicalReport.conditions.length) {
      return res.view('pages/conditions/index', {
        data: req.session.medicalReport
      });
    }

    return res.redirect(sails.route('conditions.add'));
  }
};
