module.exports = {
  i_am_a: {
    presence: {
      message: '^I am a is required',
      allowEmpty: false,
    },
  },
  other_specify: function (value, attributes) {
    const i_am_a = attributes.i_am_a;
    if (i_am_a === 'other') {
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
  physician_address: {
    presence: {
      message: '^Address is required',
      allowEmpty: false,
    },
  }
}