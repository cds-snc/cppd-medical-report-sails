/**
 * AddTreatmentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const {
  conditionReducer,
  oneAttribute,
} = require('../utils/condition.mapper');

const dataStore = require('../utils/DataStore');
const ConditionHelper = require('../utils/ConditionHelper');

module.exports = {
  create: function (req, res) {
    let data = req.session.medicalReport;
    const conditionList = conditionReducer(data.conditions);

    /**
     * If we're returning to the form with flash data in locals,
     * merge it with the rest of the medicalReport in the session.
     */
    if (res.locals.data) {
      data = _.merge(res.locals.data, req.session.medicalReport);
    }

    res.view('pages/treatments/add', {
      conditionList: conditionList,
      oneValue: oneAttribute(conditionList),
      data: data,
    });
  },

  store: function (req, res) {
    const body = Object.assign({}, req.body);
    delete body._csrf;

    // use the value of the submit button to determine redirect
    const action = body.save_and;

    /**
     * If there are newConditions, create them pre-validation
     * and auto-select them
     */
    if (body.newConditions) {
      req.body = ConditionHelper.addConditions(req, body, 'medicationTreatedCondition');
    }

    let valid = req.validate(req, res, require('../schemas/treatment.schema'));

    if (valid) {
      // save model here
      if (!_.has(req.session.medicalReport, 'treatments')) {
        req.session.medicalReport.treatments = [];
      }

      req.session.medicalReport.treatments.push(body);
      dataStore.storeMedicalReport(req.session.medicalReport);

      if (action === 'add_another') {
        return res.redirect(sails.route('treatments.add'));
      }

      res.redirect(sails.route('treatments'));
    }
  }
};
