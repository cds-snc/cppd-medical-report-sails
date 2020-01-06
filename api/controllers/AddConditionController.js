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

    /**
     * If this is the first condition being entered,
     * bypass the regular validation, and redirect
     * to edit route instead.
     */
    if (_.has(req.session.medicalReport, 'conditions') && req.session.medicalReport.conditions.length) {

      let valid = req.validate(req, res, require('../schemas/condition.schema'));

      if (valid) {
        // save model here
        if (!_.has(req.session.medicalReport, 'conditions')) {
          req.session.medicalReport.conditions = [];
        }
        req.session.medicalReport.conditions.push(body);
        res.redirect(sails.route('conditions'));
      }

      return;
    }

    let valid = req.validate(req, res, {
      conditionName: {
        presence: {
          allowEmpty: false,
          message: '^errors.name_of_condition.length'
        }
      },
    });

    if (valid) {
      req.session.medicalReport.conditions = [];
      req.session.medicalReport.conditions.push(body);
      dataStore.storeMedicalReport(req.session.medicalReport);

      return res.redirect(sails.route('conditions.edit', { id: 1 }));
    }
  }
};

