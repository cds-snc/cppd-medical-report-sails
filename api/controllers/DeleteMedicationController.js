/**
 * DeleteMedicationController
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
          model: Medication,
          as: 'Medications',
          where: { id: req.params.id }
        }
      ]
    });

    if (!medicalReport) {
      // TODO: should probably flash a message 'condition not found'
      return res.redirect(sails.route('medications'));
    }

    // medication comes back as the first index of the array
    let medication = _.first(medicalReport.Medications);

    medication.destroy();

    res.redirect(sails.route('medications'));
  }
};

