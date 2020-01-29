/**
 * ConditionDocumentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
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

    let condition = _.first(medicalReport.Conditions);

    res.send(condition.Documents);
  },

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
      }
    });

    condition.removeDocument(document);

    res.send('ok');
    // If this is the only Condition this is associated with, then delete Document?
  }
};

