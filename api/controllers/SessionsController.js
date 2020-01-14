/**
 * SessionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fs = require('fs');
const path = require('path');
const conditionHelper = require('../utils/ConditionHelper');

module.exports = {
  index: function (req, res) {

    let directory = path.resolve(__dirname, '../../sessions');

    fs.readdir(directory, (err, files) => {
      if (!err) {
        _.pull(files, '.gitignore');
        res.view('pages/sessions', {
          files: files
        });
      }
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
    });
  }
};
