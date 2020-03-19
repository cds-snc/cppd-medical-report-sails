const moment = require('moment');

module.exports = {
  applicationCode: (value) => {
    if (!value) {
      return {
        presence: {
          allowEmpty: false,
          message: '^errors.application_code_presence'
        }
      };
    }
    return {
      format: {
        pattern: /^[0-9a-zA-Z]{6}$/,
        message: '^errors.application_code_format'
      }
    };
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
      notGreaterThan: '^errors.invitation.birthdate_year_range' // Birthdate year must be greater than 0
    }
  },
  birthdate: function (value) {
    if (value) {
      return {
        validateDateExists: {
          message: '^errors.invitation.birtdate_invalid'
        },
        date: {
          latest: moment().subtract(1, 'days').format('YYYY-MM-DD'),
          message: '^errors.invitation.birthdate_age'
        }
      };
    }
    return {
      presence: {
        allowEmpty: false,
        message: '^errors.invitation.birtdate_required' // Birthdate is required
      },
    };
  },
};
