/**
 * PersonalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  index: function (req, res) {
    // this belongs somewhere else
    if (req.session) {
      if (req.session._old_input) {
        res.locals.data = req.session._old_input
      }
    }
    res.view("pages/personal");
  },

  store: function (req, res) {
    let valid = req.validate(req, res, {
      social: {
        presence: true,
        numericality: {
          message: "^Must be numeric"
        }
      }
    })

    if (valid) {
      // probably save the model here
      res.redirect('/en/start');
    }
  }
};
