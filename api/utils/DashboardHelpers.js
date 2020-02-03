const validate = require('../hooks/validate/validator');

const isValid = (model, schema) => {
  return validate(model, schema) === undefined;
};

const isCollectionValid = (models) => {
  if (!models.length) { // not sure about this
    return false;
  }

  for (const model of models) {
    if (!model.isValid) {
      return false;
    }
  }
  return true;
}

function checkMedications(medicalReport) {
  if (medicalReport.patientMedications === false) {
    return true;
  }
  return isCollectionValid(medicalReport.Medications);
}

function checkTreatements(medicalReport) {
  if (medicalReport.patientTreatments === false) {
    return true;
  }
  return isCollectionValid(medicalReport.Treatments);
}

const getValidationStatus = (medicalReport) => {
  return {
    personal: isValid(medicalReport, require('../schemas/relationship.schema')),
    expedited: isValid(medicalReport, require('../schemas/expedited.schema')),
    functional: isValid(medicalReport, require('../schemas/functional.schema')),
    conditions: isCollectionValid(medicalReport.Conditions),
    medications: checkMedications(medicalReport),
    treatments: checkTreatements(medicalReport),
    futureWork: isValid(medicalReport, require('../schemas/work.schema')),
    supportingDocuments: isValid(medicalReport, require('../schemas/documents.schema')),
    overallHealth: isValid(medicalReport, require('../schemas/health.schema')),
    practitioner: isValid(medicalReport, require('../schemas/practitioner.schema')),
  };
};

module.exports = {
  getValidationStatus,
  isValid,
  isCollectionValid
}