/**
 * ConsentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const moment = require('moment');

function getSignatureDrawData(req) {
  if (req.body.signatureMode === 'draw') {
    return req.body.signatureDrawData;
  }

  return undefined;
}

function getSignatureTypedData(req) {
  if (req.body.signatureMode === 'type') {
    return req.body.signatureTyped;
  }

  return undefined;
}


module.exports = {
  index: async function (req, res) {
    // Load the report from the database.
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      }
    });

    /**
     * If we're returning to the form with flash data in locals,
     * merge it with the rest of the medicalReport in the session.
     */
    if (res.locals.data) {
      medicalReport = _.merge(res.locals.data, medicalReport);
    }

    res.view('pages/consent', {
      data: medicalReport
    });
  },

  store: async function (req, res) {
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      },
    });

    let valid = req.validate(req, res, require('../schemas/consent.schema'));

    if (valid) {
      await medicalReport.update({
        consent: req.body.consent === 'yes',
        signatureMode: req.body.signatureMode,
        signatureDraw: getSignatureDrawData(req),
        signatureType: getSignatureTypedData(req),
        applicantSubmittedAt: moment().format()
      });

      if (req.body.consent === 'yes') {
        return res.redirect(sails.route('invite'));
      }

      return res.redirect(sails.route('consent.no'));
    }
  },

  show: async function (req, res) {
    let medicalReport = null;
    if (req.session.applicationCode) { // For medical professional view
      medicalReport = await MedicalReport.findOne({
        where: {
          applicationCode: req.session.applicationCode
        }
      });
    }
    else { // For MAs
      medicalReport = await MedicalReport.findOne({
        where: {
          id: req.params.session
        }
      });
    }

    let submissionMoment = moment(medicalReport.applicantSubmittedAt);
    let submittedAt = submissionMoment.format('LL');

    res.view('pages/show_consent', {
      data: medicalReport,
      submittedAt: submittedAt
    });
  },

  noConsent: async function (req, res) {
    req.session.destroy();

    res.view('pages/no_consent');
  }
};
