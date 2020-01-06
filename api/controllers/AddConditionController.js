/**
 * AddConditionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: function (req, res) {

    const condition = {};

    res.view('pages/conditions/add', {
      data: req.session.medicalReport,
      condition: condition,
      schema: require('../schemas/condition.schema')
    });
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

