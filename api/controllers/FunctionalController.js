/**
 * FunctionalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: (req, res) => {
    let data = req.session.medicalReport;

    /**
     * If we're returning to the form with flash data in locals,
     * merge it with the rest of the medicalReport in the session.
     */
    if (res.locals.data) {
      data = _.merge(res.locals.data, req.session.medicalReport);
    }

    res.view('pages/functional', {
      data: data
    });
  },
  store: function (req, res) {
    let valid = false;

    if (require('../../config/featureflags').disableValidation) {
      valid = true;
    } else {
      valid = req.validate(req, res, require('../schemas/functional.schema'));
    }

    if (valid) {
      // save the model, but not yet to the datastore
      req.session.medicalReport.limitations = req.body.limitations;
      req.session.medicalReport.plannedTreatments= req.body.plannedTreatments;
      req.session.medicalReport.height= req.body.height;
      req.session.medicalReport.weight= req.body.weight;
      res.redirect(sails.route('dashboard'));
    }
  }
};

