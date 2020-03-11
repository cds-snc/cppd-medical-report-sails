/**
 * ReportsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const moment = require('moment');
const { Op } = require('sequelize');

module.exports = {
  index: async function (req, res) {

    const reports = await MedicalReport.findAll({
      where: {
        practitionerSubmittedAt: { [Op.not]: null }
      }
    });

    return res.view('pages/reports/index', {
      reports: reports
    });
  },

  view: async function (req, res) {
    const reportId = req.params.report;
    sails.log.silly(`Requesing medical report: ${reportId}`);
    const medicalReport = await MedicalReport.findOne({
      where: { id: reportId },
      include: [{
        model: Condition,
        as: 'Conditions',
        include: [{
          model: Treatment,
          as: 'Treatments'
        }, {
          model: Medication,
          as: 'Medications'
        }, {
          model: Document,
          as: 'Documents'
        }]

      }]
    });
    sails.log.silly(`medicalReport: ${JSON.stringify(medicalReport.toJSON(), null, 2)}`);

    res.view('pages/reports/view', {
      data: medicalReport,
      symptomsOccur: require('../utils/support/symptomsOccur'),
      conditionOutlook: require('../utils/support/conditionOutlook'),
      stopWorking: require('../utils/support/stopWorking'),
      returnToWorkWhen: require('../utils/support/returnToWorkWhen'),
      typeOfWork: require('../utils/support/typeOfWork'),
      moment: require('moment')
    });
  },

  showConsent: async function (req, res) {
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
