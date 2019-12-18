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
      res.redirect('/en/start');
    }
  }
};
