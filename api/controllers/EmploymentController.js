/**
 * EmploymentController
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

    res.view('pages/employment', {
      data: data
    });
  },

  store: function (req, res) {
    let valid = req.validate(req, res, require('../schemas/employment.schema'));

    if (valid) {
      // save the model
      req.session.medicalReport.stopWork = req.body.stopWork;
      req.session.medicalReport.dateStoppedWork = req.body.dateStoppedWork;
      req.session.medicalReport.returnToWork = req.body.returnToWork;
      req.session.medicalReport.returnToWorkTimeframe = req.body.returnToWorkTimeframe;
      req.session.medicalReport.typeOfWork = req.body.typeOfWork;
      req.session.medicalReport.typeOfWorkOther = req.body.typeOfWorkOther;

      res.redirect(sails.route('declaration'));
    }
  }
};
