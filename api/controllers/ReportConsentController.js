/**
 * ReportConsentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const moment = require('moment');

module.exports = {
  show: async function (req, res) {
    let medicalReport = await MedicalReport.findOne({
      where: {
        id: req.params.report
      }
    });

    if (!medicalReport) {
      res.notFound();
    }

    let submissionMoment = moment(medicalReport.applicantSubmittedAt);
    let submittedAt = submissionMoment.format('LL');

    res.view('pages/show_consent', {
      maView: true,
      data: medicalReport,
      submittedAt: submittedAt
    });
  }

};
