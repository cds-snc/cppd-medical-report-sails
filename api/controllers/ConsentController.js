/**
 * ConsentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function (req, res) {
    /**
     * If there is a medical report in the session, load it
     */
    if (req.session.medicalReport) {
      res.locals.data = req.session.medicalReport;
    }

    res.view('pages/consent');
  },

  store: function (req, res) {
    let valid = req.validate(req, res, require('../schemas/consent.schema'));

    if (valid) {
      // save the model
      req.session.medicalReport.consent = req.body.consent;
      req.session.medicalReport.signature = req.body.signature;
      req.session.medicalReport.witnessFirst = req.body.witnessFirst;
      req.session.medicalReport.witnessMiddle = req.body.witnessMiddle;
      req.session.medicalReport.witnessLast = req.body.witnessLast;
      req.session.medicalReport.witnessPhone = req.body.witnessPhone;
      req.session.medicalReport.witnessSignature = req.body.witnessSignature;

      res.redirect(sails.route('conditions'));
    }
  }
};
