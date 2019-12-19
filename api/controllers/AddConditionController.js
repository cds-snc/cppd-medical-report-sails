/**
 * AddConditionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function (req, res) {
    sails.log.info('conditions.add');
    res.view('pages/conditions/add');
  },

  store: function (req, res) {
    let valid = req.validate(req, res, require('../schemas/condition.schema'));

    sails.log.info(req.session.medicalReport);

    if (valid) {
      // save model here
      if (!_.has(req.session.medicalReport, 'conditions')) {
        req.session.medicalReport.conditions = [];
      }

      req.session.medicalReport.conditions.push(body);

      sails.log.info(req.session.medicalReport);

      res.redirect(sails.route('conditions'));
    }
  }
};

