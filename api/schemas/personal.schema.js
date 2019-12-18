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
  birthdate: {
    presence: {
      allowEmpty: false,
      message: '^Birthdate is required'
    },
    validateDateFormat: {
      message: '^Birthdate is not formatted correctly'
    },
    validateDateExists: {
      message: '^Birthdate is not a valid date'
    }
  },
  address: {
    presence: {
      allowEmpty: false,
      message: '^Mailing address is required'
    }
  },
  telephone: {
    presence: {
      allowEmpty: false,
      message: '^Telephone is required'
    },
    format: {
      pattern: /^(\+0?1\s)??\(?\d{3}\)?[-]\d{3}[-]\d{4}$/,
      message: '^Telephone is incorrectly formatted'
    }
  },
  alternate_telephone: {
    format: {
      pattern: /^(\+0?1\s)??\(?\d{3}\)?[-]\d{3}[-]\d{4}$/,
      message: '^Alternate telephone is incorrectly formatted'
    },
    presence: {
      allowEmpty: true
    }
  },
  contact_time: {
    presence: true,
    inclusion: {
      within: ['morning', 'afternoon', 'letters_only'],
      message: '^Invalid selection'
    }
  }
}