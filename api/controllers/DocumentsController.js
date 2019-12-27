/**
 * DocumentsController
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

    res.view('pages/documents');
  },

  store: function (req, res) {
    let valid = req.validate(req, res, require('../schemas/documents.schema'));

    if (valid) {
      // save the model
      req.session.medicalReport.supporting_documents = req.body.supporting_documents;
      res.redirect(sails.route('employment'));
    }
  }
};
