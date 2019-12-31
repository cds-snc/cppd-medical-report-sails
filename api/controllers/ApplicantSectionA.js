/**
 * ApplicantSectionA.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function (req, res) {
    res.view('pages/applicantSectionA');
  },

  store: function (req, res) {
    let valid = req.validate(req, res, require('../schemas/applicantSectionA.schema'));

    if (valid) {
      res.redirect(sails.route('consent')); // figure out where to direct this next
    }
  }
};
