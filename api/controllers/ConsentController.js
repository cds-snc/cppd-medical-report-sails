/**
 * ConsentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

function getSignatureDrawData(req) {
  if(req.body.signature_mode === 'draw') {
    return req.body.signature_draw_data;
  }

  return undefined;
}

function getSignatureTypedData(req) {
  if(req.body.signature_mode === 'type') {
    return req.body.signature_typed;
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

    console.log(req);

    let valid = req.validate(req, res, require('../schemas/consent.schema'));

    if (valid) {
      // Update existing, or create a new one!
      await MedicalReport.update({
        consent: req.body.consent === 'yes',
        consentEducation: req.body.consent_optional_parties.includes('education'),
        consentAccountant: req.body.consent_optional_parties.includes('accountant'),
        consentFinancial: req.body.consent_optional_parties.includes('financial'),
        consentVolunteer: req.body.consent_optional_parties.includes('volunteer'),
        consentEmployees: req.body.consent_optional_parties.includes('employees'),
        signatureMode: req.body.signature_mode,
        signatureDraw: getSignatureDrawData(req),
        signatureType: getSignatureTypedData(req),
      }, {
        where: {
          applicationCode: req.session.applicationCode
        }
      });

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

    res.view('pages/show_consent', {
      data: medicalReport
    });
  }
};
