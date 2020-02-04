/**
 * ConsentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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
      await MedicalReport.update({
        consent: req.body.consent === '1',
        signature: req.body.signature,
        witnessFirst: req.body.witnessFirst,
        witnessMiddle: req.body.witnessMiddle,
        witnessLast: req.body.witnessLast,
        witnessPhone: req.body.witnessPhone,
        witnessSignature: req.body.witnessSignature,
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
