/**
 * ConditionDocumentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const path = require('path');
const fs = require('fs');

module.exports = {
  /**
   * Get all documents related to a condition
   * @route GET /api/conditions/:id/documents
   * @param {number} id The id of the condition
   * @return {Array.Documents} Associated documents
   */
  index: async function (req, res) {
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
          where: { id: req.params.id },
          include: [
            {
              model: Document,
              as: 'Documents',
            }
          ]
        }
      ]
    });

    /**
     * In the previous query the Conditions relationship
     * is returned as an array with a single item.
     */
    let condition = _.first(medicalReport.Conditions);

    // massage the data a bit
    let documents = condition.Documents.map(document => {
      return {
        id: document.id,
        fileName: document.originalFileName
      };
    });

    res.send(documents);
  },

  /**
   * Remove a document from a condition
   * @route DELETE /api/conditions/:id/documents
   * @param {number} id The id of the condition
   * @param {number} docId The id of the document
   * @return 200 ok
   */
  delete: async function (req, res) {
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
          where: { id: req.params.id },
          include: [
            {
              model: Document,
              as: 'Documents',
            }
          ]
        }
      ]
    });

    let condition = _.first(medicalReport.Conditions);

    let document = await Document.findOne({
      where: {
        id: req.body.docId
      },
      include: [
        {
          model: Condition,
          as: 'Conditions'
        }
      ]
    });

    // remove the document from this condition
    await condition.removeDocument(document);

    // refresh the document model
    await document.reload();

    /**
     * If this was the only condition the document was
     * associated with, delete the document.
     */
    if (!document.Conditions.length) {
      const filePath = path.join(process.cwd(), '.tmp/uploads', document.fileName);

      fs.unlink(filePath, async (err) => {
        if (err) { return console.log(err); }

        await document.destroy();

        return res.ok();
      });
    } else {
      res.ok();
    }
  }
};

