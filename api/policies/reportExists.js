/**
 * Checks for the existence of the Medical Report in the session.
 * If you haven't started yet, redirect back to the start.
 */

module.exports = async function (req, res, next) {
  if (!_.has(req.session, 'applicationCode') || req.session.applicationCode === null) {
    return res.redirect(sails.route('start'));
  }

  let medicalReport = await MedicalReport.findOne({
    where: {
      applicationCode: req.session.applicationCode
    },
  });

  if (!medicalReport) {
    req.session.applicationCode = null;
    return res.redirect(sails.route('start'));
  }

  next();
};
