/**
 * MedicationsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function (req, res) {
    if (!_.has(req.session.medicalReport, 'medications')) {
      return res.redirect(sails.route('medications.add'));
    } 

    res.view('pages/medications/index', {
      data: req.session.medicalReport
    });
  }
};
