/**
 * EditTreatmentController
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
     * Load the treatment we're editing. Include the MedicalReport
     * model to ensure we're allowed to edit this treatment. Also
     * include seleccted Conditions.
     */
    let treatment = await Treatment.findOne({
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

    if (!treatment) {
      // TODO: maybe flash a message
      return res.redirect(sails.route('treatments'));
    }

    /**
     * Get an array of selected ids, assign it back to the
     * treatment object for convenience.
     */
    treatment.selectedConditions = arrayHelpers.pluckIds(treatment.Conditions);

    /**
     * If we're returning to the form with flash data in locals,
     * merge it with the rest of the medication from the session.
     */
    if (res.locals.data) {
      treatment = _.merge(treatment, res.locals.data);
    }

    res.view('pages/treatments/edit', {
      id: req.params.id,
      treatment: treatment,
      conditionList: conditionList,
      medicalReport: medicalReport,
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
          model: Treatment,
          as: 'Treatments',
          where: { id: req.params.id }
        }
      ]
    });

    if (!medicalReport) {
      // TODO: should probably flash a message 'condition not found'
      return res.redirect(sails.route('treatments'));
    }

    // use the value of the submit button to determine redirect
    const action = req.body.save_and;

    // the medication comes back as the first index of an array
    let treatment = _.first(medicalReport.Treatments);

    let valid = req.validate(req, res, require('../schemas/treatment.schema'));

    if (valid) {
      treatment.update({
        treatmentType: req.body.treatmentType,
        treatmentFrequency: req.body.treatmentFrequency,
        treatmentStartDate: req.body.treatmentStartDate,
        treatmentEndDate: req.body.treatmentEndDate,
        treatmentResults: req.body.treatmentResults,
      });

      // clear out condition associations
      treatment.removeConditions();

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
            treatment.addCondition(condition);
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
            treatment.addCondition(condition);
          }
        });
      }

      if (action === 'add_another') {
        return res.redirect(sails.route('treatments.add'));
      }

      res.redirect(sails.route('treatments'));
    }
  }
};
