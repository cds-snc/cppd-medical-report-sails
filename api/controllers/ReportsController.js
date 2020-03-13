/**
 * ReportsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { Op, fn } = require('sequelize');

module.exports = {
  index: async function (req, res) {

    const reports = await MedicalReport.findAll({
      where: {
        practitionerSubmittedAt: { [Op.not]: null }
      },
      order: [
        ['practitionerSubmittedAt', 'DESC']
      ]
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

    medicalReport.update({
      lastAccessedAt: fn('NOW')
    });

    res.view('pages/reports/view', {
      data: medicalReport,
      symptomsOccur: require('../utils/support/symptomsOccur'),
      conditionOutlook: require('../utils/support/conditionOutlook'),
      stopWorking: require('../utils/support/stopWorking'),
      returnToWorkWhen: require('../utils/support/returnToWorkWhen'),
      typeOfWork: require('../utils/support/typeOfWork'),
      moment: require('moment')
    });
  }
};
