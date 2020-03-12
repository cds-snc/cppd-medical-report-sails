module.exports = {
  relationshipStarted: {
    presence: {
      allowEmpty: false,
      message: '^When did they come into your care is required'
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
  lastVisitDate: {
    presence: {
      allowEmpty: false,
      message: '^Date of last office visit is required'
    },
  },
  stopWorking: {
    presence: {
      allowEmpty: false,
      message: '^Stopped working is required'
    }
  },
  stopWorkingWhen: function (value, attributes) {
    if (attributes.stopWorking === '1') {
      return {
        presence: {
          allowEmpty: false,
          message: '^When they stopped working is required'
        }
      };
    }
  }
};
