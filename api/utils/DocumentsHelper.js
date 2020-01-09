
/**
 * 'documents' => [
 *   {
 *      name: 'something.pdf',
 *      conditions: [0,1,2]
 *   }
 * ]
 */

const getAllDocuments = (medicalReport) => {
  if (medicalReport.supportingDocuments) {
    return medicalReport.supportingDocuments;
  }
  return false;
}

const getDocumentsByCondition = (medicalReport, conditionId) => {
  if (medicalReport.supportingDocuments) {

    // should store docs in an array so we don't have to do this
    const documents = medicalReport.supportingDocuments.split(',');

    documents.forEach(document => {
      // build array of docs that contain condition id
    });
  }
  return false;
}

module.exports = {
  getAllDocuments,
  getDocumentsByCondition
}
