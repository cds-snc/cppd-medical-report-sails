/**
 * MedicalProfessionalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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
    let valid = req.validate(req, res, require('../schemas/invitation.schema'));

    if (valid) {
      // save the model
      req.session.medicalReport = req.body;
      res.redirect(sails.route('relationship'));
    }
  }
};
