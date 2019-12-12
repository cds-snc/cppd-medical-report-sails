const validate = require('validate.js');

/**
 * PersonalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  index: function (req, res) {
    res.view("pages/personal");
  },

  store: function (req, res) {

    const validations = {
      social: {
        presence: true,
        numericality: {
          message: "Must be numeric"
        }
      }
    }

    const result = validate(req.body, validations);
    if (result) {
      sails.log.info(result);
      req.flash('errors', result);
      return res.redirect('back');
    } else {
      return res.redirect('start');
    }


    /*
    req.validate({
      'social': 'numeric'
    }, (err, params) => {
      sails.log.error(err);
      sails.log.error(params);

      if (err) {
        req.flash('errors', err);
        return res.redirect('back');
      } else {
        res.redirect('/en/start');
      }
    });
    */
  }
};
