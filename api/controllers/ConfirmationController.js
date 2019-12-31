/**
 * ConfirmationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function (req, res) {
    res.view('pages/confirmation');
  },

  store: function (req, res) {
    const fs = require('fs');
    const data = JSON.stringify(req.session.medicalReport);

    const filename = Date.now() + '.json';

    fs.writeFileSync('sessions/' + filename, data);
    req.session.medicalReport = {};

    res.redirect(sails.route('start'));
  }
};
