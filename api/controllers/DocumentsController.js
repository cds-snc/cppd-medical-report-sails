/**
 * DocumentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const dataStore = require('../utils/DataStore');
const documentsHelper = require('../utils/DocumentsHelper');

module.exports = {
  index: function (req, res) {
    let data = req.session.medicalReport;
    // data.supportingDocuments = [];
    /**
     * If we're returning to the form with flash data in locals,
     * merge it with the rest of the medicalReport in the session.
     */
    if (res.locals.data) {
      data = _.merge(res.locals.data, req.session.medicalReport);
    }

    res.view('pages/documents', {
      data: data,
      documents: data.supportingDocuments || [],
      conditions: data.conditions || []
    });
  },

  store: function (req, res) {
    let valid = req.validate(req, res, require('../schemas/documents.schema'));

    if (valid) {
      // save the model
      req.session.medicalReport.attachLater = req.body.attachLater;
      documentsHelper.saveDocuments(req.session.medicalReport, req.body.supportingDocuments);
      dataStore.storeMedicalReport(req.session.medicalReport);

      res.redirect(sails.route('dashboard'));
    }
  }
};
