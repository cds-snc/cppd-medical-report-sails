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
  }
};
