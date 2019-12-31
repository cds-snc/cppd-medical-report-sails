/**
 * DeclarationController
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

    res.view('pages/declaration', {
      data: data
    });
  },

  store: function (req, res) {
    let valid = req.validate(req, res, require('../schemas/declaration.schema'));

    if (valid) {
      // save the model
      req.session.medicalReport.i_am_a = req.body.i_am_a;
      req.session.medicalReport.other_specify = req.body.other_specify;
      req.session.medicalReport.name = req.body.name;
      req.session.medicalReport.date = req.body.date;
      req.session.medicalReport.physician_address = req.body.physician_address;

      res.redirect(sails.route('confirmation'));
    }
  }
};
