/**
 * DeleteTreatmentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  delete: async function (req, res) {
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      },
      include: [
        {
          model: Treatment,
          as: 'Treatments',
          where: { id: req.params.id }
        }
      ]
    });

    if (!medicalReport) {
      // TODO: should probably flash a message 'condition not found'
      return res.redirect(sails.route('treatments'));
    }

    // medication comes back as the first index of the array
    let treatment = _.first(medicalReport.Treatments);

    await treatment.destroy();

    res.redirect(sails.route('treatments'));
  }
};

