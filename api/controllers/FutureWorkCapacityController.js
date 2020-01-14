/**
 * FutureWorkCapacityController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const dataStore = require('../utils/DataStore');

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

    res.view('pages/work', {
      data: data
    });
  },

  store: function (req, res) {
    let valid = req.validate(req, res, require('../schemas/work.schema'));

    if (valid) {
      // save the model
      req.session.medicalReport.returnToWork = req.body.returnToWork;
      req.session.medicalReport.returnToWorkWhen = req.body.returnToWorkWhen;
      req.session.medicalReport.typeOfWork = req.body.typeOfWork;
      req.session.medicalReport.workDetails = req.body.workDetails;
      dataStore.storeMedicalReport(req.session.medicalReport);

      res.redirect(sails.route('dashboard'));
    }
  }
};