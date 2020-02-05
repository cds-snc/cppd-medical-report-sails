/**
 * ConsentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const moment = require('moment');

function getSignatureDrawData(req) {
  if(req.body.signatureMode === 'draw') {
    let drawData = req.body.signatureDrawData;
    let match = /(<svg.+<\/svg>)/.exec(drawData);
    if(match === null) {
      return undefined;
    }
    return match[1];
  }

  return undefined;
}

function getSignatureTypedData(req) {
  if(req.body.signatureMode === 'type') {
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
    let valid = req.validate(req, res, require('../schemas/consent.schema'));

    if (valid) {
      // Update existing, or create a new one!
      if( req.body.consent === 'no') {
        await MedicalReport.update({
          consent: false,
          applicantSubmittedAt: moment().format()
        }, {
          where: {
            applicationCode: req.session.applicationCode
          }
        });
      }
      else {
        await MedicalReport.update({
          consent: true,
          consentEducation: req.body.consent_optional_parties.includes('education'),
          consentAccountant: req.body.consent_optional_parties.includes('accountant'),
          consentFinancial: req.body.consent_optional_parties.includes('financial'),
          consentVolunteer: req.body.consent_optional_parties.includes('volunteer'),
          consentEmployees: req.body.consent_optional_parties.includes('employees'),
          signatureMode: req.body.signatureMode,
          signatureDraw: getSignatureDrawData(req),
          signatureType: getSignatureTypedData(req),
          applicantSubmittedAt: moment().format()
        }, {
          where: {
            applicationCode: req.session.applicationCode
          }
        });
      }

      res.redirect(sails.route('invite'));
    }
  },

  show: async function (req, res) {
    // Load the report from the database.
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      }
    });

    let submissionMoment = moment(medicalReport.applicantSubmittedAt);
    let submittedAt = submissionMoment.format('H:mm MMMM D[,] YYYY');
    let validTil = submissionMoment.add(3, 'y').format('LL');

    res.view('pages/show_consent', {
      data: medicalReport,
      submittedAt: submittedAt,
      validTil: validTil
    });
  }
};
