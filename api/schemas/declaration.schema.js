module.exports = {
  practitionerType: {
    presence: {
      message: '^I am a is required',
      allowEmpty: false,
    },
  },
  otherSpecify: function (value, attributes) {
    const practitionerType = attributes.practitionerType;
    if (practitionerType === 'other') {
      return {
        presence: {
          message: '^Other is required if Other is selected',
          allowEmpty: false
        }
      }
    }
  },
  name: {
    presence: {
      message: '^Name is required',
      allowEmpty: false,
    },
  },
  date: function (value) {
    if (value) {
      return {
        validateDateFormat: {
          message: '^Date is not formatted correctly'
        },
        validateDateExists: {
          message: '^Date is not a valid date'
        }
      }
    }
    return {
      presence: {
        allowEmpty: false,
        message: '^Date is required'
      },
    }
  },
  physicianAddress: {
    presence: {
      message: '^Address is required',
      allowEmpty: false,
    },
  }
}