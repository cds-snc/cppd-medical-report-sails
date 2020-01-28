/**
 * SessionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fs = require('fs');
const path = require('path');
const conditionHelper = require('../utils/ConditionHelpers');

module.exports = {
  index: async function (req, res) {

    const reports = await MedicalReport.findAll({limit: 10, attributes: ['id', 'firstName', 'lastName', 'socialInsuranceNumber']});
    sails.log(`Query returned: ${JSON.stringify(reports)}`);
    const viewModel = reports.map(x =>  {
      return {
        id: x.id,
        dateRecieved: 'Not Implemented',
        applicant: `${x.lastName}, ${x.firstName}`,
        sin: x.socialInsuranceNumber,
        lastViewed: 'Not Implemented'
      };
    });

    const totalReports = await MedicalReport.count();
    sails.log(`totalReports: ${totalReports}`);
    return res.view('pages/sessions', {
      reports: viewModel,
      total: totalReports
    });
  },

  download: function (req, res) {
    const filename = req.params.session;
    const sessionFile = path.resolve(__dirname, '../../sessions/' + filename);

    var SkipperDisk = require('skipper-disk');
    var fileAdapter = SkipperDisk(/* optional opts */);

    // set the filename to the same file as the user uploaded
    res.set('Content-disposition', 'attachment; filename=' + filename);

    // Stream the file down
    fileAdapter.read(sessionFile)
      .on('error', (err) => {
        return res.serverError(err);
      })
      .pipe(res);
  },

  view: async function (req, res) {

    const medicalReport = await MedicalReport.findOne({ where: {id: req.params.session}});
    sails.log(`medicalReport: ${JSON.stringify(medicalReport, 2)}`);

    const conditions = conditionHelper.getConditionsWithMedicationsAndTreatments(medicalReport);
    // console.log(require('../utils/support/symptomsOccur')[1]);
    res.view('pages/sessions/view', {
      data:medicalReport,
      conditions: conditions,
      symptomsOccur: require('../utils/support/symptomsOccur'),
      conditionOutlook: require('../utils/support/conditionOutlook'),
      stopWorking: require('../utils/support/stopWorking'),
      returnToWorkWhen: require('../utils/support/returnToWorkWhen'),
      typeOfWork: require('../utils/support/typeOfWork'),
      getDocumentsByCondition: require('../utils/DocumentsHelper').getDocumentsByCondition,
      moment: require('moment')
    });
  }
};
