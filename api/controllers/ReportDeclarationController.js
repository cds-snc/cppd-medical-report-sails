/**
 * ReportConsentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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

    res.view('pages/declaration/simple', {
      data: medicalReport,
    });
  }
};
