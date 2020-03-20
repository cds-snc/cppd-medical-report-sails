const moment = require('moment');

module.exports = {
  socialInsuranceNumber: {
    presence: {
      allowEmpty: false,
      message: '^errors.personal.sin_required'
    },
    validateSIN: {
      message: '^errors.personal.sin_invalid'
    },
  },
  firstName: {
    presence: {
      allowEmpty: false,
      message: '^errors.personal.first_name'
    },
  },
  lastName: {
    presence: {
      allowEmpty: false,
      message: '^errors.personal.last_name'
    }
  },
  birthdateDay: {
    presence: {
      allowEmpty: false,
      message: '^errors.invitation.birthdate_day'
    },
    numericality: {
      greaterThan: 0,
      notGreaterThan: '^errors.invitation.birthdate_day_range',
      lessThanOrEqualTo: 31,
      notLessThanOrEqualTo: '^errors.invitation.birthdate_day_range'
    }
  },
  birthdateMonth: {
    presence: {
      allowEmpty: false,
      message: '^errors.invitation.birthdate_month'
    },
    numericality: {
      greaterThan: 0,
      notGreaterThan: '^errors.invitation.birthdate_month_range',
      lessThanOrEqualTo: 12,
      notLessThanOrEqualTo: '^errors.invitation.birthdate_month_range'
    }
  },
  birthdateYear: {
    presence: {
      allowEmpty: false,
      message: '^errors.invitation.birthdate_year'
    },
    numericality: {
      greaterThan: 0,
      notGreaterThan: '^errors.invitation.birthdate_year_range'
    }
  },
  birthdate: function (value) {
    if (value) {
      return {
        validateDateExists: {
          message: '^errors.invitation.birtdate_invalid'
        },
        date: {
          latest: moment.utc().subtract(1, 'days'),
          message: '^errors.invitation.birthdate_age'
        }
      };
    }
    return {
      presence: {
        allowEmpty: false,
        message: '^errors.invitation.birtdate_required'
      },
    };
  },
  address: {
    presence: {
      allowEmpty: false,
      message: '^errors.personal.mailing_address'
    }
  },
  city: {
    presence: {
      allowEmpty: false,
      message: '^errors.personal.city'
    }
  },
  province: {
    presence: {
      allowEmpty: false,
      message: '^errors.personal.province'
    }
  },
  country: {
    presence: {
      allowEmpty: false,
      message: '^errors.personal.country'
    }
  },
  postal: {
    presence: {
      allowEmpty: false,
      message: '^errors.personal.postal'
    }
  },
  email: function (value) {
    if (value) {
      return {
        email: {
          message: '^errors.personal.email_invalid'
        }
      };
    }
  },
  telephone: {
    presence: {
      allowEmpty: false,
      message: '^errors.personal.telephone'
    },
  },
};
