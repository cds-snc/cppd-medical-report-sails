/**
 * AddConditionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const dataStore = require('../utils/DataStore');
const Documents = require('../utils/DocumentsHelper');

module.exports = {
  create: function (req, res) {
    if (!res.locals.data) {
      res.locals.data = {
        conditionFiles: ''
      }
    }

    if (_.has(req.session.medicalReport, 'conditions') && req.session.medicalReport.conditions.length) {
      return res.view('pages/conditions/add', {
        medicalReport: req.session.medicalReport
      });
    }

    res.view('pages/conditions/add_first', {
      medicalReport: req.session.medicalReport
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

      Documents.saveDocumentsFromCondition(req.session.medicalReport, body);
      dataStore.storeMedicalReport(req.session.medicalReport);

      if (action === 'add_another') {
        return res.redirect(sails.route('conditions.add'));
      }

      res.redirect(sails.route('conditions'));
    }
  }
};
