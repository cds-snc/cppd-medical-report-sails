/**
 * AddMedicationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const castArray = require('../utils/ArrayHelpers').castArray;
const conditionReducer = require('../utils/ConditionHelpers').conditionReducer;

module.exports = {
  create: async function (req, res) {
    // load the medical report
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      },
      include: [
        { model: Condition, as: 'Conditions' }
      ]
    });

    // get a list suitable for checkbox list component
    let conditionList = conditionReducer(medicalReport.Conditions);

    res.view('pages/medications/add', {
      conditionList: conditionList,
      oneValue: Object.keys(conditionList).length === 1, // TODO - just force the selected condition?
      medicalReport: medicalReport,
    });
  },

  store: async function (req, res) {
    // load the medical report
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      }
    });

    // use the value of the submit button to determine redirect
    const action = req.body.save_and;

    let valid = req.validate(req, res, require('../schemas/medication.schema'));

    if (valid) {
      // Save the model
      let medication = await Medication.create({
        medicationName: req.body.medicationName,
        medicationDosage: req.body.medicationDosage,
        medicationFrequency: req.body.medicationFrequency,
        medicationStartDate: req.body.medicationStartDate,
        medicationEndDate: req.body.medicationEndDate,
        medicationResults: req.body.medicationResults,
        MedicalReportId: medicalReport.id,
      });

      /**
       * Create any newConditions and associate them
       * to the new medication.
       */
      if (req.body.newConditions) {
        req.body.newConditions.forEach(async (item) => {
          if (item) {
            let condition = await Condition.create({
              MedicalReportId: medicalReport.id,
              conditionName: item
            });
            medication.addCondition(condition);
          }
        });
      }

      /**
       * Associate the selected existing conditions
       */
      if (req.body.selectedConditions) {
        // It won't be an array if only one checkbox is checked
        let selectedConditions = castArray(req.body.selectedConditions);

        selectedConditions.forEach(async (conditionId) => {
          // Get an instance of the condition
          let condition = await Condition.findOne({
            where: {
              id: conditionId
            }
          });

          if (condition) {
            medication.addCondition(condition);
          }
        });
      }

      if (action === 'add_another') {
        return res.redirect(sails.route('medications.add'));
      }

      res.redirect(sails.route('medications'));
    }
  }
};

