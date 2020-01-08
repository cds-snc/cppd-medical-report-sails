/**
 * EditMedicationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const {
  conditionReducer,
  oneAttribute,
} = require('../utils/condition.mapper');

const dataStore = require('../utils/DataStore');
const Condition = require('../utils/Condition');

module.exports = {
  edit: function (req, res) {
    const data = req.session.medicalReport;
    const conditionList = conditionReducer(data.conditions);

    // redirect back if there are no medications
    if (!_.has(req.session.medicalReport, 'medications')) {
      return res.redirect(sails.route('medications'));
    }

    const medication = req.session.medicalReport.medications[req.params.id - 1];

    if (!medication) {
      return res.redirect(sails.route('medications'));
    }

    res.view('pages/medications/edit', {
      id: req.params.id,
      medication: medication,
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
      req.body = Condition.addConditions(req, body, 'medicationTreatedCondition');
    }

    // the medications array is 0 indexed
    const medicationId = req.params.id - 1;

    let valid = req.validate(req, res, require('../schemas/medication.schema'));

    if (valid) {
      // replace the contents of the medication on the array
      req.session.medicalReport.medications[medicationId] = body;
      dataStore.storeMedicalReport(req.session.medicalReport);

      if (action === 'add_another') {
        return res.redirect(sails.route('medications.add'));
      }

      res.redirect(sails.route('medications'));
    }
  }
};

