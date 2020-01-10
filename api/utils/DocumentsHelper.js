const castArray = require('./ArrayHelpers').castArray;

const getAllDocuments = (medicalReport) => {
  if (medicalReport.supportingDocuments) {
    return medicalReport.supportingDocuments;
  }
  return false;
}

const getDocumentsByCondition = (medicalReport, conditionId) => {
  if (medicalReport.supportingDocuments) {

    const documents = medicalReport.supportingDocuments;
    const conditionDocuments = [];

    documents.forEach((document) => {
      if (document.conditions.indexOf(conditionId) !== -1) {
        conditionDocuments.push(document.name);
      }
    });

    return conditionDocuments;
  }
  return false;
}

const saveDocumentsFromCondition = (medicalReport, condition) => {
  if (!medicalReport.supportingDocuments) {
    medicalReport.supportingDocuments = [];
  }

  const conditionId = medicalReport.conditions.indexOf(condition);

  if (condition.conditionFiles) {
    const files = condition.conditionFiles.split(',');

    files.forEach(file => {
      let found = medicalReport.supportingDocuments.findIndex(document => {
        return document.conditions.indexOf(conditionId) !== -1 && document.name === file;
      });

      if (found === -1) {
        medicalReport.supportingDocuments.push({
          name: file,
          conditions: [conditionId]
        });
      }
    });
  }
}

const saveDocuments = (medicalReport, uploadedFiles) => {

  medicalReport.supportingDocuments = [];

  _.forIn(_.first(uploadedFiles), (conditions, file) => {
    medicalReport.supportingDocuments.push({
      name: file,
      conditions: castArray(conditions).join(',')
    });
  });
}

module.exports = {
  getAllDocuments,
  getDocumentsByCondition,
  saveDocumentsFromCondition,
  saveDocuments
}
