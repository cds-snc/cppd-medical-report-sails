const { dateValidators } = require('../hooks/validate/validators/dates.validator');

module.exports = {
  socialInsuranceNumber: {
    presence: {
      allowEmpty: false,
      message: '^Social Insurance Number is required'
    },
    validateSIN: {
      message: '^Social Insurance Number is invalid'
    },
  },
  firstName: {
    presence: {
      allowEmpty: false,
      message: '^First name is required'
    },
  },
  lastName: {
    presence: {
      allowEmpty: false,
      message: '^Last name is required'
    }
  },
  birthdate: dateValidators,
  address: {
    presence: {
      allowEmpty: false,
      message: '^Mailing address is required'
    }
  },
  telephone: function (value) {
    if (value) {
      return {
        format: {
          pattern: /^(\+0?1\s)??\(?\d{3}\)?[-]\d{3}[-]\d{4}$/,
          message: '^Telephone is incorrectly formatted'
        }
      };
    }
    return {
      presence: {
        allowEmpty: false,
        message: '^Telephone is required'
      },
    };
  },
  alternateTelephone: function (value) {
    if (value) { // makes it optional
      return {
        format: {
          pattern: /^(\+0?1\s)??\(?\d{3}\)?[-]\d{3}[-]\d{4}$/,
          message: '^Alternate telephone is incorrectly formatted'
        }
      };
    }
  },
  contactTime: {
    presence: {
      message: '^Best time to contact you is required'
    },
    inclusion: {
      within: ['morning', 'afternoon', 'letters_only'],
      message: '^Invalid selection'
    }
  }
};
