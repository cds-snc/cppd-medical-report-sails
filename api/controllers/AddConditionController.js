/**
 * AddConditionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const arrayHelpers = require('../utils/ArrayHelpers');

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

    /**
     * Placeholder for files that get sent back in a
     * validation post-back.
     */
    if (!res.locals.data) {
      res.locals.data = {
        conditionFiles: ''
      };
    }

    if (medicalReport.Conditions) {
      return res.view('pages/conditions/add', {
        medicalReport: medicalReport
      });
    }

    res.view('pages/conditions/add_first', {
      medicalReport: medicalReport
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

    let valid = req.validate(req, res, require('../schemas/condition.schema'));

    if (valid) {
      /**
       * Not crazy about this, but can't figure out how to create
       * a related model from base, ie, medicalReport.Condition.create()
       */
      let condition = await Condition.create({
        MedicalReportId: medicalReport.id,
        conditionName: req.body.conditionName,
        icdCode: req.body.icdCode,
        symptomsBegan: req.body.symptomsBegan,
        clinicallyImpair: req.body.clinicallyImpair,
        conditionOutlook: req.body.conditionOutlook,
        conditionOutlookUnknown: req.body.conditionOutlookUnknown,
        conditionLast: req.body.conditionLast,
        symptomsOccur: req.body.symptomsOccur,
        symptomsOccurUnknown: req.body.symptomsOccurUnknown
      });

      if (req.body.conditionFiles) {
        let fileIds = arrayHelpers.pluckIds(JSON.parse(req.body.conditionFiles));
        condition.setDocuments(fileIds);
      }

      if (action === 'add_another') {
        return res.redirect(sails.route('conditions.add'));
      }

      res.redirect(sails.route('conditions'));
    }
  }
};
