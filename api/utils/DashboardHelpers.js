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
};

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

function checkDocuments(medicalReport) {
  if (medicalReport.patientDocuments === false) {
    return true;
  }
  return medicalReport.Documents.length > 0;
}

const getValidationStatus = (medicalReport) => {
  return {
    personal: isValid(medicalReport, require('../schemas/relationship.schema')),
    functional: isValid(medicalReport, require('../schemas/functional.schema')),
    conditions: isCollectionValid(medicalReport.Conditions),
    medications: checkMedications(medicalReport),
    treatments: checkTreatements(medicalReport),
    futureWork: isValid(medicalReport, require('../schemas/work.schema')),
    supportingDocuments: checkDocuments(medicalReport),
    practitioner: isValid(medicalReport, require('../schemas/practitioner.schema')),
  };
};

module.exports = {
  getValidationStatus,
  isValid,
  isCollectionValid
};
