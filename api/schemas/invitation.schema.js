const birthDateValidtor = require("../utils/validators").birthDateValidator;
const validate = require('validate.js');

validate.validators.applicationCodeExists = (value, options, key, attributes) => {
  return options.message;
};

module.exports = {
  applicationCode: {
    presence: {
      allowEmpty: false,
      message: '^errors.application_code_presence'
    },
    format: {
      pattern: /^[0-9a-zA-Z]{6}$/,
      message: '^errors.application_code_format'
    },
    applicationCodeExists: {
      message: "^errors.application_code_does_not_exist"
    }
  },
  birthDate: birthDateValidtor,
};
