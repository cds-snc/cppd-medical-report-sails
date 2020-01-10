/**
 * DashboardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const validate = require('../hooks/validate/validator');

function ableToSubmit (sections) {
  return sections.personal &&
         sections.functional &&
         sections.conditions &&
         sections.medications &&
         sections.treatments &&
         sections.futureWork &&
         sections.supportingDocs &&
         sections.declaration;
}

function isValid (obj, schema){
  if (obj === undefined) {
    return false;
  }

  return validate(obj, schema) === undefined;
}

function isArrayValid (arr, schema){
  if (arr === undefined) {
    return false;
  }

  return arr.every(element => {
    return isValid(element, schema);
  });
}

module.exports = {
  index: function(req, res) {
    const sectionsCompleted = {
      personal: false,
      functional: false,
      conditions: false,
      medications: false,
      treatments: false,
      futureWork: false,
      supportingDocs: false,
      declaration: false
    };

    if (req.session.medicalReport !== undefined) {
      const report = req.session.medicalReport;
      sectionsCompleted.personal = isValid(report,require('../schemas/relationship.schema'));
      sectionsCompleted.functional = isValid(report,require('../schemas/functional.schema'));
      sectionsCompleted.supportingDocs = isValid(report.supportingDocuments,require('../schemas/documents.schema'));
      sectionsCompleted.conditions = isArrayValid(report.conditions, require('../schemas/condition.schema'));
      sectionsCompleted.medications = isArrayValid(report.medications, require('../schemas/medication.schema'));
      sectionsCompleted.treatments = isArrayValid(report.treatments, require('../schemas/treatment.schema'));
      sectionsCompleted.declaration = isValid(report, require('../schemas/declaration.schema'));

    } else {
      req.session.medicalReport = {};
    }

    let data = req.session.medicalReport;

    /**
     * If we're returning to the form with flash data in locals,
     * merge it with the rest of the medicalReport in the session.
     */
    if (res.locals.data) {
      data = _.merge(res.locals.data, req.session.medicalReport);
    }

    res.view('pages/dashboard', {
      sectionsCompleted: sectionsCompleted,
      ableToSubmit: ableToSubmit(sectionsCompleted),
      data: data
    });
  }
};
