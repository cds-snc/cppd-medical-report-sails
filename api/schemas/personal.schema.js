const moment = require('moment');

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
        validateDateExists: {
          message: '^Birthdate is not a valid date'
        },
        date: {
          latest: moment.utc().subtract(1, 'days'),
          message: '^You must have been born before yesterday'
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
  email: function (value) {
    if (value) {
      return {
        email: {
          message: '^Does not seem to be a valid email'
        }
      };
    }
  },
  telephone: {
    presence: {
      allowEmpty: false,
      message: '^Telephone is required'
    },
  },
};
