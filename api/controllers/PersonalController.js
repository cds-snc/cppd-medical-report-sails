/**
 * PersonalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function (req, res) {
    /**
     * If there are errors or data flashed to the session
     * assign them to local variables. Note that connect-flash
     * pushes values onto an array, hence the _.first() helpers
     */
    const errors = req.flash('errors');
    const data = req.flash('data');

    res.view('pages/personal', {
      errors: _.first(errors) || null,
      data: _.first(data) || null
    });
  },

  store: function (req, res) {
    let valid = req.validate(req, res, require('../schemas/personal.schema'))

    if (valid) {
      // probably save the model here
      // optionally flash a success message
      // then redirect
      MedicalReport.create({
        sin: req.body.social,
        title: req.body.preferred_title,
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        last_name_at_birth: req.body.birth_last_name,
        birth_date: req.body.birthdate,
        address: req.body.address,
        telephone_number: req.body.telephone_number,
        alt_telephone_number: req.body.alternate_telephone,
        contact_period: req.body.contact_time
      });
      res.redirect('/en/start');
    }
  }
};
