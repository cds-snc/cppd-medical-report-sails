const crypto = require('crypto');

const generate = async () => {
  let code = null;

  do {
    code = crypto.randomBytes(3).toString('hex').toUpperCase();
  } while (
    await MedicalReport.findOne({
      where: {
        applicationCode: code
      }
    }) !== null
  );

  return code;
}

module.exports = {
  generate
}