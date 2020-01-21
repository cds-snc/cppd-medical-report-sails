/**
 * AddTreatmentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const arrayHelpers = require('../utils/ArrayHelpers');
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

    // if there's only one condition, default to it being selected
    if (Object.keys(conditionList).length === 1) {
      _.set(res.locals, 'data.selectedConditions', conditionList);
    }

    res.view('pages/treatments/add', {
      conditionList: conditionList,
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

    let valid = req.validate(req, res, require('../schemas/treatment.schema'));

    if (valid) {
      // save model here
      let treatment = await Treatment.create({
        treatmentType: req.body.treatmentType,
        treatmentFrequency: req.body.treatmentFrequency,
        treatmentStartDate: req.body.treatmentStartDate,
        treatmentEndDate: req.body.treatmentEndDate,
        treatmentResults: req.body.treatmentResults,
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
            treatment.addCondition(condition);
          }
        });
      }

      /**
       * Associate the selected existing conditions
       */
      if (req.body.Conditions) {
        // It won't be an array if only one checkbox is checked
        let selectedConditions = arrayHelpers.castArray(req.body.Conditions);

        selectedConditions.forEach(async (conditionId) => {
          // Get an instance of the condition
          let condition = await Condition.findOne({
            where: {
              id: conditionId
            },
            include: [
              { // ensures this condition belongs to current mr
                model: MedicalReport,
                as: 'MedicalReport',
                where: { applicationCode: req.session.applicationCode }
              },
            ]
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
