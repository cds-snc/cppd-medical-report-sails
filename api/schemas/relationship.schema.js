module.exports = {
  relationshipStarted: {
    presence: {
      allowEmpty: false,
      message: '^Must pick an option'
    }
  },
  firstTreatmentDate: {
    presence: {
      allowEmpty: false,
      message: '^Date of first treatment is required'
    },
  },
  visitNumber: {
    presence: {
      allowEmpty: false,
      message: '^You must enter how many times the patient has visited your office in the past 12 months.'
    },
    numericality: true,
  },
  lastVisitDate: function (value) {
    if (value) {
      return {
        validateDateFormat: {
          message: '^Date of last office visit is not formatted correctly'
        },
        validateDateExists: {
          message: '^Date of last office visit is not a valid date'
        }
      };
    }
    return {
      presence: {
        allowEmpty: false,
        message: '^Date of last office visit is required'
      },
    };
  }
};
