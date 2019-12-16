/**
 * PersonalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  index: function (req, res) {
    /**
     * This might belong somewhere else
     * Check to see if there is _old_input in the session
     * then assign it to local data object so it populates
     * the form.
     * _old_input = form data flashed to the session by the validator
     */
    /*
    if (req.session) {
      if (req.session._old_input) {
        res.locals.data = req.session._old_input
      }
    } */
    // sails.log.info(req.flash('_old_input'));
    const errors = req.flash('errors');
    const data = req.flash('data')[0];

    res.view('pages/personal', {
      errors: errors,
      data: data
    });
  },

  store: function (req, res) {
    let valid = req.validate(req, res, {
      social: {
        presence: true,
        numericality: {
          message: '^Social must be numeric'
        },
        length: {
          minimum: 9,
          maximum: 9,
          tooShort: "^Social needs to have %{count} digits or more",
          tooLong: "^Whoa that's too much"
        }
      }
    })

    if (valid) {
      // probably save the model here
      // optionally flash a success message
      // then redirect
      res.redirect('/en/start');
    }
  }
};
