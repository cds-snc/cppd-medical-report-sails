/**
 * DocumentsControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const arrayHelpers = require('../../utils/ArrayHelpers');

module.exports = {
  /**
   * Get all documents belonging to the current MR
   * @route GET /api/documents
   * @return {Array<Document>} Associated documents
   */
  index: async function (req, res) {
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
      ]
    });

    if (!medicalReport) {
      return res.send('Sorry, no report found. You may not be logged in.');
    }

    let documents = [];

    // massage the data a bit
    medicalReport.Documents.forEach((document) => {
      documents.push({
        id: document.id,
        fileName: document.fileName,
        conditions: arrayHelpers.pluckIds(document.Conditions)
      });
    });

    res.send(documents);
  },

  /**
   * Create a new document belonging to the current MR
   * @route POST /api/documents
   * @param {string} file The filename
   * @return {Document} The document object
   */
  add: async function (req, res) {
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      },
    });

    let document = await medicalReport.createDocument({
      originalFileName: req.body.file,
      fileName: req.body.file
    });

    res.send(document);
  },

  /**
   * Associate conditions to a document
   * @route PATCH /api/documents/:id
   * @param {number} id The id of the document
   * @param {Array<number>} Array of condition Ids
   * @return 200 ok
   */
  save: async function (req, res) {
    let document = await Document.findOne({
      where: {
        id: req.params.id
      },
    });

    await document.setConditions(req.body.conditions);

    res.send('ok');
  },

  /**
   * Delete a document
   * @route DELETE /api/documents
   * @param {number} id The id of the document
   * @return 200 ok
   */
  delete: async function (req, res) {
    let document = await Document.findOne({
      where: {
        id: req.body.id
      },
    });

    await document.destroy();

    res.send('ok');
  }
};

