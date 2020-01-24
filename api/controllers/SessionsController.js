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
  index: function (req, res) {

    const reports = MedicalReport.findAll({limit: 10});
    sails.log(`Found Items ${JSON.stringify(reports)}`);

    return res.view('pages/sessions', {
      reports:[
        { dateRecieved: '0001-01-01', applicant: 'John Doe', sin: '111 111 118', lastViewed: 'Now'},
        { dateRecieved: '2001-01-01', applicant: 'Jane Doe', sin: '111 111 118', lastViewed: 'Now'},
        { dateRecieved: '1999-01-01', applicant: 'Pierre Poutine', sin: '111 111 118', lastViewed: '0001-01-01'}
      ],
      total: 100
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

  view: function (req, res) {

    const filename = req.params.session;
    const sessionFile = path.resolve(__dirname, '../../sessions/' + filename);

    const medicalReport = JSON.parse(fs.readFileSync(sessionFile));
    const conditions = conditionHelper.getConditionsWithMedicationsAndTreatments(medicalReport);
    // console.log(require('../utils/support/symptomsOccur')[1]);
    res.view('pages/sessions/view', {
      data: medicalReport,
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
