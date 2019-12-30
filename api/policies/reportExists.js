/**
 * Checks for the existence of the Medical Report in the session.
 * If you haven't started yet, redirect back to the start.
 */

module.exports = function (req, res, next) {
  if (!_.has(req.session, 'medicalReport')) {
    return res.redirect(sails.route('start'));
  }
}