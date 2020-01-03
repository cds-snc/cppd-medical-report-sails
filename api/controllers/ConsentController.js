/**
 * ConsentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const dataStore = require('../utils/DataStore');

module.exports = {
  index: function (req, res) {
    let data = req.session.medicalReport;

    /**
     * If we're returning to the form with flash data in locals,
     * merge it with the rest of the medicalReport in the session.
     */
    if (res.locals.data) {
      data = _.merge(res.locals.data, req.session.medicalReport);
    }

    res.view('pages/consent', {
      data: data
    });
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
      req.session.medicalReport.applicationCode = dataStore.generateApplicationCode();

      dataStore.storeMedicalReport(req.session.medicalReport);


      res.redirect(sails.route('relationship'));
    }
  }
};
