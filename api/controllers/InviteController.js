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
    const protocol = req.connection.encrypted? 'https' : 'http';
    const medicalProfessionalRoute = sails.config.routes['GET /en/medical-professional'].i18n[req.i18n.locale];
    let medicalProfessionalUrl = protocol + '://' + req.headers.host + medicalProfessionalRoute;

    res.view('pages/invite',{
      applicationCode: medicalReport.applicationCode,
      medicalProfessionalUrl: medicalProfessionalUrl,
      consent: medicalReport.consent,
    });
  },
};
