/**
 * DashboardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


function ableToSubmit(sections) {
  return sections.personal &&
    sections.expedited &&
    sections.functional &&
    sections.conditions &&
    sections.medications &&
    sections.treatments &&
    sections.futureWork &&
    sections.supportingDocuments &&
    sections.overallHealth;
}

const dashboardHelpers = require('../utils/DashboardHelpers');

module.exports = {
  index: async function (req, res) {

    // let data = req.session.medicalReport;
    let medicalReport = await MedicalReport.findOne({
      where: {
        applicationCode: req.session.applicationCode
      },
      include: [
        { model: Condition, as: 'Conditions' },
        {
          model: Medication,
          as: 'Medications',
          include: [{ model: Condition, as: 'Conditions' }]
        },
        {
          model: Treatment,
          as: 'Treatments',
          include: [{ model: Condition, as: 'Conditions' }]
        }
      ]
    });

    const sectionsCompleted = dashboardHelpers.getValidationStatus(medicalReport);

    res.view('pages/dashboard', {
      sectionsCompleted: sectionsCompleted,
      ableToSubmit: ableToSubmit(sectionsCompleted),
      data: medicalReport
    });
  },

  ready: function (req, res) {
    if (ableToSubmit(getSectionsCompleted(req.session.medicalReport))) {
      return res.redirect(sails.route('declaration'));
    }
    return res.redirect('back');
  }
};
