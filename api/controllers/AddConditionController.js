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

    // use the value of the submit button to determine redirect
    const action = body.save_and;

    // delete stuff we don't want to save
    delete body._csrf;
    delete body.save_and;

    let valid = req.validate(req, res, require('../schemas/condition.schema'));

    if (valid) {
      // save model here
      if (!_.has(req.session.medicalReport, 'conditions')) {
        req.session.medicalReport.conditions = [];
      }
      req.session.medicalReport.conditions.push(body);
      dataStore.storeMedicalReport(req.session.medicalReport);

      if (action === 'add_another') {
        return res.redirect(sails.route('conditions.add'));
      }

      res.redirect(sails.route('conditions'));
    }
  }
};
