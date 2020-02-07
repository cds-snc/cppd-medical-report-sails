/**
 * MedicalProfessionalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async function (req, res) {
    // Get some data, then clear session
    const medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      }
    });
    req.session.destroy();

    // Get full URL
    const protocol = req.connection.encrypted ? 'https' : 'http';
    const medicalProfessionalRoute = sails.route('medical-professional');
    let medicalProfessionalUrl = protocol + '://' + req.headers.host + medicalProfessionalRoute;

    res.view('pages/invite',{
      applicationCode: medicalReport.applicationCode,
      medicalProfessionalUrl: medicalProfessionalUrl,
      consent: medicalReport.consent,
    });
  },
};
