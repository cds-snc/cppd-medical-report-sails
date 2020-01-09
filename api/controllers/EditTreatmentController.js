/**
 * EditTreatmentController
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
  edit: function (req, res) {
    let data = req.session.medicalReport;
    const conditionList = conditionReducer(data.conditions);

    // redirect back if there are no treatments
    if (!_.has(req.session.medicalReport, 'treatments')) {
      return res.redirect(sails.route('treatments'));
    }

    // Grab this treatment from the array by index
    let treatment = req.session.medicalReport.treatments[req.params.id - 1];

    if (!treatment) {
      return res.redirect(sails.route('treatments'));
    }

    /**
     * If we're returning to the form with flash data in locals,
     * merge it with the rest of the condition from the array.
     */
    if (res.locals.data) {
      treatment = _.merge(treatment, res.locals.data);
    }

    res.view('pages/treatments/edit', {
      id: req.params.id,
      treatment: treatment,
      conditionList: conditionList,
      oneValue: oneAttribute(conditionList),
      data: req.session.medicalReport,
    });
  },

  update: function (req, res) {
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

    // the medications array is 0 indexed
    const treatmentId = req.params.id - 1;

    let valid = req.validate(req, res, require('../schemas/treatment.schema'));

    if (valid) {
      // replace the contents of the medication on the array
      req.session.medicalReport.treatments[treatmentId] = body;
      dataStore.storeMedicalReport(req.session.medicalReport);

      if (action === 'add_another') {
        return res.redirect(sails.route('treatments.add'));
      }

      res.redirect(sails.route('treatments'));
    }
  }
};
