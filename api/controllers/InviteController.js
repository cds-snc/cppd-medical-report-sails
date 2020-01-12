/**
 * MedicalProfessionalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { applicationExists, getApplication } = require('../utils/DataStore');

module.exports = {
  index: function (req, res) {
    /**
     * If there is a medical report in the session, load it
     */
    if (req.session.medicalReport) {
      res.locals.data = req.session.medicalReport;
    }

    // Get code, then clear session
    const applicationCode = req.session.medicalReport.applicationCode;
    req.session.medicalReport = {};

    // Get full URL
    const protocol = req.connection.encrypted? 'https' : 'http';
    const medicalProfessionalRoute = sails.config.routes['GET /en/medical-professional'].i18n[req.i18n.locale];
    let medicalProfessionalUrl = protocol + '://' + req.headers.host + medicalProfessionalRoute;    

    res.view('pages/invite',{
      applicationCode: applicationCode,
      medicalProfessionalUrl: medicalProfessionalUrl,
    });
  },
};
