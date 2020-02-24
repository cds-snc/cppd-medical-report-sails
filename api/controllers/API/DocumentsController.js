/**
 * DocumentsControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const arrayHelpers = require('../../utils/ArrayHelpers');
const path = require('path');
const fs = require('fs');

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
          attributes: ['id', 'fileName', 'originalFileName'],
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

    // massage the data a bit
    let documents = medicalReport.Documents.map(document => {
      return {
        id: document.id,
        fileName: document.originalFileName,
        conditions: arrayHelpers.pluckIds(document.Conditions)
      };
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


    var settings = {
      maxBytes: 10000000,
      adapter: require('skipper-azure'),
      key: process.env.AZURE_STORAGE_ACCOUNT,
      secret: process.env.AZURE_STORAGE_ACCESS_KEY,
      container: process.env.AZURE_STORAGE_CONTAINER
    };

    req.file('file').upload(settings, async (err, uploadedFiles) => {
      if (err) {
        if (err.code === 'E_EXCEEDS_UPLOAD_LIMIT') {
          res.status(413);
          return res.json(err.code);
        }

        return res.serverError(err);
      }

      if (uploadedFiles.length === 0) {
        return res.badRequest('No file was uploaded');
      }

      let file = uploadedFiles[0];
      let filename = path.basename(file.fd);

      let document = await medicalReport.createDocument({
        originalFileName: file.filename,
        fileName: filename
      });

      return res.json({
        message: uploadedFiles.length + ' file(s) uploaded successfully!',
        files: uploadedFiles,
        document: document
      });
    });
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

    const filePath = path.join(process.cwd(), '.tmp/uploads', document.fileName);

    // delete from filesystem
    fs.unlink(filePath, async (err) => {
      if (err) { return console.log(err); }

      await document.destroy();

      res.ok();
    });
  }
};

