/**
 * SessionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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

  view: async function (req, res) {

    const medicalReport = await MedicalReport.findOne({ where: {id: req.params.session}});
    sails.log(`medicalReport: ${JSON.stringify(medicalReport, 2)}`);

    const conditions = conditionHelper.getConditionsWithMedicationsAndTreatments(medicalReport);
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
