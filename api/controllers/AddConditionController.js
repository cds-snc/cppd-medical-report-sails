/**
 * AddConditionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function (req, res) {
    res.view('pages/conditions/add');
  },

  store: function (req, res) {
    const body = Object.assign({}, req.body);
    delete body._csrf;

    let valid = req.validate(req, res, require('../schemas/condition.schema'));

    if (valid) {
      // save model here
      if (!_.has(req.session.medicalReport, 'conditions')) {
        req.session.medicalReport.conditions = [];
      }
      req.session.medicalReport.conditions.push(body);
      res.redirect(sails.route('conditions'));
    }
  }
};

