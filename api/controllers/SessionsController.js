/**
 * SessionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const conditionHelper = require('../utils/ConditionHelpers');

module.exports = {
  index: async function (req, res) {

    const reports = await MedicalReport.findAll({limit: 10, attributes: ['id', 'firstName', 'lastName', 'socialInsuranceNumber']});
    sails.log.silly(`Query returned: ${JSON.stringify(reports, null,  2)}`);
    const viewModel = reports.map(x =>  {
      return {
        id: x.id,
        dateReceived: 'Not Implemented',
        applicant: `${x.lastName}, ${x.firstName}`,
        sin: x.socialInsuranceNumber,
        lastViewed: 'Not Implemented'
      };
    });

    const totalReports = await MedicalReport.count();
    sails.log.silly(`totalReports: ${totalReports}`);
    return res.view('pages/sessions', {
      reports: viewModel,
      total: totalReports
    });
  },

  view: async function (req, res) {
    const reportId = req.params.session;
    sails.log.silly(`Requesing medical report: ${reportId}`);
    const medicalReport = await MedicalReport.findOne({
      where: {id: reportId},
      include: [{
        model: Condition,
        as: 'Conditions',
        include: [ {
          model: Treatment,
          as: 'Treatments'
        }, {
          model: Medication,
          as: 'Medications'
        }
        ]

      }]
    });
    sails.log.silly(`medicalReport: ${JSON.stringify(medicalReport.toJSON(), null, 2)}`);

    res.view('pages/sessions/view', {
      data:medicalReport,
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
