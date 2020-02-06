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
  birthdateDay: {
    presence: {
      allowEmpty: false,
      message: '^Birthdate day is required'
    }
  },
  birthdateMonth: {
    presence: {
      allowEmpty: false,
      message: '^Birthdate month is required'
    }
  },
  birthdateYear: {
    presence: {
      allowEmpty: false,
      message: '^Birthdate year is required'
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
      };
    }
    return {
      presence: {
        allowEmpty: false,
        message: '^Birthdate is required'
      },
    };
  },
  address: {
    presence: {
      allowEmpty: false,
      message: '^Mailing address is required'
    }
  },
  city: {
    presence: {
      allowEmpty: false,
      message: '^City is required'
    }
  },
  province: {
    presence: {
      allowEmpty: false,
      message: '^Province is required'
    }
  },
  country: {
    presence: {
      allowEmpty: false,
      message: '^Country is required'
    }
  },
  postal: {
    presence: {
      allowEmpty: false,
      message: '^Postal code is required'
    }
  },
  email: {
    presence: {
      allowEmpty: false,
      message: '^Email is required'
    },
    email: {
      message: '^Does not seem to be a valid email'
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
};
