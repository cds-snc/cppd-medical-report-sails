/**
 * MedicalProfessionalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const {applicationExists, getApplication} = require("../utils/DataStore");

module.exports = {
  index: function (req, res) {
    /**
     * If there is a medical report in the session, clear it
     */
    if (req.session.medicalReport) {
      req.session.medicalReport = null;
    }

    res.view('pages/medical-professionals');
  },

  store: function (req, res) {
    // Validate completion / formatting
    let valid = req.validate(req, res, require('../schemas/invitation.schema'));

    // Validate whether or not the application code exists and, if so, matches the birthdate
    const applicationCode = req.body.applicationCode;
    console.log('Code: ' + applicationCode);
    console.log('Birthdate: ' + req.body.birthdate);
    valid = applicationExists(applicationCode, req.body.birthdate);
    console.log('Is Valid: ' + valid);

    if (valid) {
      req.session.medicalReport = getApplication(applicationCode);
      return res.redirect(sails.route('relationship'));
    }
    else {
      req.session.medicalReport = getApplication(applicationCode);
      return res.redirect(sails.route('relationship')); // TODO change
    }
  }
};
