const validate = require('validate.js');
const { dateValidators } = require("../hooks/validate/validators/dates.validator");

module.exports = {
  applicationCode: (value) => {
    if (!value) {
      return {
        presence: {
          allowEmpty: false,
          message: '^errors.application_code_presence'
        }
      }
    }
    return {
      format: {
        pattern: /^[0-9a-zA-Z]{6}$/,
        message: '^errors.application_code_format'
      }
    }
  },
  birthdate: (value) => dateValidators(value, '^errors.patient_birthdate_not_valid', '^errors.patient_birthdate_not_valid', '^errors.patient_birthdate_is_required'),
};
