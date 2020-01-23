/**
 * DocumentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async function (req, res) {
    // Load the report from the database.
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      },
      include: [
        {
          model: Document,
          as: 'Documents',
          attributes: ['id', 'fileName'],
          include: [
            { 
              model: Condition,
              as: 'Conditions'
            }
          ]
        },
        {
          model: Condition,
          as: 'Conditions',
          attributes: ['id', 'conditionName']
        }
      ]
    });

    /**
     * If we're returning to the form with flash data in locals,
     * merge it with the rest of the medicalReport in the session.
     */
    if (res.locals.data) {
      medicalReport = _.merge(res.locals.data, medicalReport);
    }

    res.view('pages/documents', {
      data: medicalReport,
      documents: medicalReport.toJSON().Documents || [],
      conditions: medicalReport.toJSON().Conditions || []
    });
  },

  store: async function (req, res) {
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      }
    });

    console.log(req.body.supportingDocuments);

    let valid = req.validate(req, res, require('../schemas/documents.schema'));

    if (valid) {
      // save the model
      // req.session.medicalReport.attachLater = req.body.attachLater;
      // documentsHelper.saveDocuments(req.session.medicalReport, req.body.supportingDocuments);
      // dataStore.storeMedicalReport(req.session.medicalReport);

      res.redirect(sails.route('dashboard'));
    }
  }
};
