/**
 * ConditionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  /**
   * Get all conditions related to the current MR
   * @route GET /api/conditions
   * @return {Array<Condition>} Associated documents
   */
  index: async function (req, res) {
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      },
      include: [
        {
          model: Condition,
          as: 'Conditions'
        }
      ]
    });

    res.send(medicalReport.Conditions);
  }

};

