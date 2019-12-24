/**
 * DeleteMedicationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  delete: function (req, res) {
    const index = req.params.id - 1 // array is zero-indexed

    req.session.medicalReport.medications.splice(index, 1);

    res.redirect(sails.route('medications'));
  }
};
