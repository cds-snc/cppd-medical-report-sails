/**
 * ConfirmationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const dataStore = require('../utils/DataStore');

module.exports = {
  index: function (req, res) {
    res.view('pages/confirmation');
  },

  store: function (req, res) {
    dataStore.storeMedicalReport(req.session.medicalReport);
    req.session.medicalReport = {};
    
    res.redirect(sails.route('start'));
  }
};
