/**
 * ExpeditedController
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
      if (res.locals.data) {
        res.locals.data = _.merge(res.locals.data, req.session.medicalReport);
      } else {
        res.locals.data = req.session.medicalReport;
      }
    }

    res.view('pages/expedited');
  },

  store: function (req, res) {
    let valid = req.validate(req, res, require('../schemas/expedited.schema'));

    if (valid) {
      // save the model
      req.session.medicalReport.condition_type = req.body.condition_type;
      req.session.medicalReport.diagnosis = req.body.diagnosis;
      req.session.medicalReport.icd_code = req.body.icd_code;
      req.session.medicalReport.onset_date = req.body.onset_date;

      res.redirect(sails.route('conditions'));
    }
  }
};
