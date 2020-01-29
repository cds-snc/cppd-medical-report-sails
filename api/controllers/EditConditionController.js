/**
 * EditConditionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const arrayHelpers = require('../utils/ArrayHelpers');

module.exports = {
  edit: async function (req, res) {
    /**
     * Grab the medicalReport and the associated condition.
     * This is an AND query, so the object will be null
     * if either the applicationCode or conditionId
     * don't exist.
     */
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      },
      include: [
        {
          model: Condition,
          as: 'Conditions',
          where: { id: req.params.id }
        }
      ]
    });

    if (!medicalReport) {
      // TODO: should probably flash a message 'condition not found'
      return res.redirect(sails.route('conditions'));
    }

    // the condition comes back as the first index of an array
    let condition = _.first(medicalReport.Conditions);

    /**
     * If we're returning to the form with flash data in locals,
     * merge it with the rest of the condition from the db.
     */
    if (res.locals.data) {
      condition = _.merge(condition, res.locals.data);
    }

    if (!res.locals.data) {
      res.locals.data = {
        conditionFiles: ''
      };
    }

    res.view('pages/conditions/edit', {
      id: req.params.id,
      condition: condition,
      medicalReport: medicalReport,
      documents: []
    });
  },

  update: async function (req, res) {
    /**
     * Grab the medicalReport and the associated condition.
     * This is an AND query, so the object will be null
     * if either the applicationCode or conditionId
     * don't exist.
     */
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      },
      include: [
        {
          model: Condition,
          as: 'Conditions',
          where: { id: req.params.id }
        }
      ]
    });

    if (!medicalReport) {
      // TODO: should probably flash a message 'condition not found'
      return res.redirect(sails.route('conditions'));
    }

    let condition = _.first(medicalReport.Conditions);

    let valid = req.validate(req, res, require('../schemas/condition.schema'));

    if (valid) {
      condition.update({
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

      res.redirect(sails.route('conditions'));
    }
  }
};

