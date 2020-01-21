/**
 * EditMedicationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const conditionReducer = require('../utils/ConditionHelpers').conditionReducer;
const arrayHelpers = require('../utils/ArrayHelpers');

module.exports = {
  edit: async function (req, res) {
    /**
     * Load the medical report and associated conditions
     * to populate the checkbox list
     */
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      },
      include: [
        {
          model: Condition,
          as: 'Conditions',
          attributes: ['id', 'conditionName'],
        }
      ]
    });

    // get a list suitable for the checkboxes component
    const conditionList = conditionReducer(medicalReport.Conditions);

    /**
     * Load the medication we're editing. Include the MedicalReport
     * model to ensure we're allowed to edit this medication. Also
     * include seleccted Conditions.
     */
    let medication = await Medication.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: MedicalReport,
          as: 'MedicalReport',
          where: { applicationCode: req.session.applicationCode }
        },
        {
          model: Condition,
          as: 'Conditions',
          attributes: ['id']
        }
      ]
    });

    if (!medication) {
      // TODO: maybe flash a message
      return res.redirect(sails.route('medications'));
    }

    /**
     * Get an array of selected ids, assign it back to the
     * medication object for convenience.
     */
    medication.selectedConditions = arrayHelpers.pluckIds(medication.Conditions);

    /**
     * If we're returning to the form with flash data in locals,
     * merge it with the rest of the medication from the session.
     */
    if (res.locals.data) {
      medication = _.merge(medication, res.locals.data);
    }

    res.view('pages/medications/edit', {
      id: req.params.id,
      medication: medication,
      conditionList: conditionList,
      medicalReport: medicalReport
    });
  },

  update: async function (req, res) {
    /**
     * Load the medical report, include the selected medication
     */
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      },
      include: [
        {
          model: Medication,
          as: 'Medications',
          where: { id: req.params.id }
        }
      ]
    });

    if (!medicalReport) {
      // TODO: should probably flash a message 'condition not found'
      return res.redirect(sails.route('medications'));
    }

    // use the value of the submit button to determine redirect
    const action = req.body.save_and;

    // the medication comes back as the first index of an array
    let medication = _.first(medicalReport.Medications);

    let valid = req.validate(req, res, require('../schemas/medication.schema'));

    if (valid) {
      // replace the contents of the medication on the array
      medication.update({
        medicationName: req.body.medicationName,
        medicationDosage: req.body.medicationDosage,
        medicationFrequency: req.body.medicationFrequency,
        medicationStartDate: req.body.medicationStartDate,
        medicationEndDate: req.body.medicationEndDate,
        medicationResults: req.body.medicationResults
      });

      // clear out condition associations
      medication.removeConditions();

      /**
       * Create any newConditions and associate them
       * to the medication.
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
        let selectedConditions = arrayHelpers.castArray(req.body.selectedConditions);

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

