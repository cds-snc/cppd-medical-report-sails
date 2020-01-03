/**
 * PersonalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const dataStore = require('../utils/DataStore');

module.exports = {
  index: function (req, res) {
    /**
     * If there is a medical report in the session, load it
     */
    if (req.session.medicalReport) {
      res.locals.data = req.session.medicalReport;
    }

    res.view('pages/personal');
  },

  store: function (req, res) {
    let valid = req.validate(req, res, require('../schemas/personal.schema'));

    if (valid) {
      // save the model, but not yet to the datastore
      req.session.medicalReport = req.body;
      res.redirect(sails.route('consent'));

      /* Commenting out for now -ds
      MedicalReport.create({
        sin: req.body.social,
        title: req.body.preferred_title,
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        last_name_at_birth: req.body.birth_last_name,
        birth_date: req.body.birthdate,
        address: req.body.address,
        telephone_number: req.body.telephone,
        alt_telephone_number: req.body.alternate_telephone,
        contact_period: req.body.contact_time
      });
      res.redirect('/en/start');
      */
    }
  }
};
