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
     * assign them to local variables
     */
    const errors = req.flash('errors');
    const data = req.flash('data')[0];

    res.view('pages/personal', {
      errors: errors.length ? errors : null,
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
      },
      first_name: {
        presence: {
          allowEmpty: false,
        },
      },
      last_name: {
        presence: {
          allowEmpty: false
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
