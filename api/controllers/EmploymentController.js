/**
 * EmploymentController
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

    res.view('pages/employment');
  },
  
  store: function (req, res) {
    let valid = req.validate(req, res, require('../schemas/employment.schema'));

    if (valid) {
      // save the model
      req.session.medicalReport.stop_work = req.body.stop_work;
      req.session.medicalReport.date_stopped_work = req.body.date_stopped_work;
      req.session.medicalReport.return_to_work = req.body.return_to_work;
      req.session.medicalReport.return_to_work_timeframe = req.body.return_to_work_timeframe;
      req.session.medicalReport.type_of_work = req.body.type_of_work;
      req.session.medicalReport.type_of_work_other = req.body.type_of_work_other;

      res.redirect(sails.route('health'));
    }
  }
};
