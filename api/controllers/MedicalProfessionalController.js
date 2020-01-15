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
     * If there is an applicationCode in the session, clear it
     */
    if (req.session.applicationCode) {
      req.session.applicationCode = null;
    }
    res.view('pages/medical-professional');
  },

  store: async function (req, res) {
    // Validate completion / formatting, this calls res.redirect if invalid
    let valid = req.validate(req, res, require('../schemas/invitation.schema'));

    if (valid) {
      // Validate whether or not the application code exists and, if so, matches the birthdate
      const applicationCode = req.body.applicationCode.toUpperCase();

      let medicalReport = await MedicalReport.findOne({
        where: {
          applicationCode: applicationCode,
          birthdate: req.body.birthdate
        }
      });

      if (!medicalReport) {
        req.flash('error', 'errors.no_application_found');
        req.flash('data', req.body);
        return res.redirect('back');
      }

      req.session.applicationCode = applicationCode;
      return res.redirect(sails.route('dashboard'));
    }
  }
};
