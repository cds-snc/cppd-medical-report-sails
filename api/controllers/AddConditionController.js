/**
 * AddConditionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const dataStore = require('../utils/DataStore');

module.exports = {
  create: function (req, res) {
    if (_.has(req.session.medicalReport, 'conditions') && req.session.medicalReport.conditions.length) {
      return res.view('pages/conditions/add', {
        data: req.session.medicalReport
      });
    }

    res.view('pages/conditions/add_first', {
      data: req.session.medicalReport
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
      dataStore.storeMedicalReport(req.session.medicalReport);

      res.redirect(sails.route('conditions'));
    }
  }
};
