/**
 * DocumentsControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const arrayHelpers = require('../../utils/ArrayHelpers');

module.exports = {
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

  save: async function (req, res) {
    let document = await Document.findOne({
      where: {
        id: req.params.id
      },
    });

    await document.setConditions(req.body.conditions);

    res.send('ok');
  },

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

