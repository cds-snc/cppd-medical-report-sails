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
    req.addFlash('success', 'Huzzah');
    res.redirect('/en/personal');
  }
};
