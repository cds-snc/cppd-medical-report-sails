/**
 * DocumentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const arrayHelpers = require('../utils/ArrayHelpers');

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
              as: 'Conditions',
              attributes: ['id']
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

    console.log(_.first(medicalReport.toJSON().Documents));

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

    let valid = req.validate(req, res, require('../schemas/documents.schema'));

    if (valid) {
      console.log(req.body.supportingDocuments);
      /*
      _.forIn(req.body.supportingDocuments, async (docConditions, docId) => {
        docId = _.trimLeft(docId, 'docId:');
        // if id, find in db and attach conditions
        if (docId !== 'undefined') {
          let document = await Document.findOne({
            where: {
              id: docId
            }
          });
          if (document) {
            let selectedConditions = castArray(_.values(docConditions));
            selectedConditions = selectedConditions.map(Number);
            document.setConditions(selectedConditions);
          }
        }
        // if undefined, create in db and attach condtions

      });
      */
      res.redirect(sails.route('dashboard'));
    }
  }
};
