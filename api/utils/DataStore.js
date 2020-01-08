const fs = require('fs');
const crypto = require('crypto');

// --- Helper Functions/Variables ---
const getDataFilePath = (applicationCode) => {
  return 'sessions/' + applicationCode + '.json';
};

// --- Exported Functions ---
const applicationExists = (applicationCode) => {
  return fs.existsSync( getDataFilePath(applicationCode) );
};

const generateApplicationCode = () => {
  // TODO Replace file system storage in favor of a database

  // Find a unique code
  let code = null;
  let fileName = null;
  do {
    code = crypto.randomBytes(3).toString('hex');
    fileName = getDataFilePath(code);
  } while(fs.existsSync(fileName));

  // Create the file
  fs.openSync(fileName, 'w');

  return code;
};

// const getMedicalReport = (applicationCode, birthDate) => {
//   // TODO Use the birthdate to verify a match of the code with the person
//   // TODO Replace file system storage in favor of a database
//   return JSON.parse(fs.readFileSync(getDataFilePath(applicationCode)));
// };

const storeMedicalReport = (medicalReportData) => {
  // TODO Replace file system storage in favor of a database
  fs.writeFileSync(
        getDataFilePath(medicalReportData.applicationCode),
        JSON.stringify(medicalReportData, null, '\t')
  );
};

module.exports = {
  applicationExists,
  generateApplicationCode,
  storeMedicalReport
};
