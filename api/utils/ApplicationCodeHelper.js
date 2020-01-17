const crypto = require('crypto');

const generate = async () => {
  let code = null;

  let existingCodes = await MedicalReport.findAll({
    attributes: ['applicationCode'],
    raw: true
  });

  const codes = _.pluck(existingCodes, 'applicationCode');

  do {
    code = crypto.randomBytes(3).toString('hex').toUpperCase();
  } while (codes.indexOf(code) !== -1);

  return code;
}

module.exports = {
  generate
}