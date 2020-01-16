/**
 * ConditionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async function (req, res) {
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      },
      include: [
        {model: Condition, as: 'Conditions'}
      ]
    });

    if (!medicalReport.Conditions.length) {
      return res.redirect(sails.route('conditions.add'));
    }

    return res.view('pages/conditions/index', { data: medicalReport });
  }
};
