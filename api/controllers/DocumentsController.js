/**
 * DocumentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function (req, res) {
    if (!_.has(req.session, 'medicalReport')) {
      return res.redirect(sails.route('start'));
    }

    let data = req.session.medicalReport;

    /**
     * If we're returning to the form with flash data in locals,
     * merge it with the rest of the medicalReport in the session.
     */
    if (res.locals.data) {
      data = _.merge(res.locals.data, req.session.medicalReport);
    }

    res.view('pages/documents', {
      data: data
    });
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
