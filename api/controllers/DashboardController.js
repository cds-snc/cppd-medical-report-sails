/**
 * DashboardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const validate = require('../hooks/validate/validator');

function checkMedications(report) {
  if (report.patientMedications === 'no') {
    return true;
  }
  return isArrayValid(report.medications, require('../schemas/medication.schema'));
}

function checkTreatements(report) {
  if (report.patientTreatments === 'no') {
    return true;
  }
  return isArrayValid(report.treatments, require('../schemas/treatment.schema'));
}

function getSectionsCompleted(report) {
  return {
    personal: isValid(report, require('../schemas/relationship.schema')),
    expedited : isValid(report, require('../schemas/expedited.schema')),
    functional: isValid(report,require('../schemas/functional.schema')),
    conditions: isArrayValid(report.conditions, require('../schemas/condition.schema')),
    medications: checkMedications(report),
    treatments: checkTreatements(report),
    futureWork: isValid(report, require('../schemas/work.schema')),
    supportingDocuments: isValid(report, require('../schemas/documents.schema')),
    overallHealth : isValid(report, require('../schemas/health.schema')),
  };
}

function ableToSubmit (sections) {
  if (require('../../config/featureflags').disableValidation) {
    return true;
  } else {
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
}

function isValid(obj, schema) {
  if (obj === undefined) {
    return false;
  }

  return validate(obj, schema) === undefined;
}

function isArrayValid(arr, schema) {
  if (arr === undefined) {
    return false;
  }

  if (arr.length === 0) {
    return false;
  }

  return arr.every(element => {
    return isValid(element, schema);
  });
}

module.exports = {
  index: function(req, res) {

    let data = req.session.medicalReport;

    /**
     * If we're returning to the form with flash data in locals,
     * merge it with the rest of the medicalReport in the session.
     */
    if (res.locals.data) {
      data = _.merge(res.locals.data, req.session.medicalReport);
    }

    const sectionsCompleted = getSectionsCompleted(data);

    res.view('pages/dashboard', {
      sectionsCompleted: sectionsCompleted,
      ableToSubmit: ableToSubmit(sectionsCompleted),
      data: data
    });
  },

  ready: function(req, res) {
    if(ableToSubmit(getSectionsCompleted(req.session.medicalReport))) {
      return res.redirect(sails.route('declaration'));
    }
    return res.redirect('back');
  }
};
