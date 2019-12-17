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
      },
      preferred_title: {
        presence: true
      },
      contact_time: {
        presence: true
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
