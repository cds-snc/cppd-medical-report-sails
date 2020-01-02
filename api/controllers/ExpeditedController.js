/**
 * ExpeditedController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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

    res.view('pages/expedited', {
      data: data
    });
  },

  store: function (req, res) {
    let valid = req.validate(req, res, require('../schemas/expedited.schema'));

    if (valid) {
      // save the model
      req.session.medicalReport.conditionType = req.body.conditionType;
      req.session.medicalReport.diagnosis = req.body.diagnosis;
      req.session.medicalReport.icdCode = req.body.icdCode;
      req.session.medicalReport.onsetDate = req.body.onsetDate;

      res.redirect(sails.route('conditions'));
    }
  }
};
