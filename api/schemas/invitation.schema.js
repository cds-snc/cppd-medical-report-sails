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
      message: '^Birthdate day is required'
    },
    numericality: {
      greaterThan: 0,
      notGreaterThan: '^Birthdate day must be a number between 1 and 31',
      lessThanOrEqualTo: 31,
      notLessThanOrEqualTo: '^Birthdate day be a number between 1 and 31'
    }
  },
  birthdateMonth: {
    presence: {
      allowEmpty: false,
      message: '^Birthdate month is required'
    },
    numericality: {
      greaterThan: 0,
      notGreaterThan: '^Birthdate month must be a number between 1 and 12',
      lessThanOrEqualTo: 12,
      notLessThanOrEqualTo: '^Birthdate must be a number between 1 and 12'
    }
  },
  birthdateYear: {
    presence: {
      allowEmpty: false,
      message: '^Birthdate year is required'
    },
    numericality: {
      greaterThan: 0,
      notGreaterThan: '^Birthdate year must be greater than 0'
    }
  },
  birthdate: function (value) {
    if (value) {
      return {
        validateDateExists: {
          message: '^Birthdate is not a valid date'
        },
        date: {
          latest: moment().subtract(1, 'days').format('YYYY-MM-DD'),
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
};
