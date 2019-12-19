module.exports = {
  social: {
    presence: {
      allowEmpty: false,
      message: '^Social Insurance Number is required'
    },
    validateSIN: {
      message: '^Social Insurance Number is invalid'
    },
  },
  first_name: {
    presence: {
      allowEmpty: false,
      message: '^First name is required'
    },
  },
  last_name: {
    presence: {
      allowEmpty: false,
      message: '^Last name is required'
    }
  },
  birthdate: function (value) {
    if (value) {
      return {
        validateDateFormat: {
          message: '^Birthdate is not formatted correctly'
        },
        validateDateExists: {
          message: '^Birthdate is not a valid date'
        }
      }
    }
    return {
      presence: {
        allowEmpty: false,
        message: '^Birthdate is required'
      },
    }
  },
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
      }
    }
    return {
      presence: {
        allowEmpty: false,
        message: '^Telephone is required'
      },
    }
  },
  alternate_telephone: function (value) {
    if (value) { // makes it optional
      return {
        format: {
          pattern: /^(\+0?1\s)??\(?\d{3}\)?[-]\d{3}[-]\d{4}$/,
          message: '^Alternate telephone is incorrectly formatted'
        }
      }
    }
  },
  contact_time: {
    presence: {
      message: '^Best time to contact you is required'
    },
    inclusion: {
      within: ['morning', 'afternoon', 'letters_only'],
      message: '^Invalid selection'
    }
  }
}