module.exports = {
  returnToWork: {
    presence: {
      allowEmpty: false,
      message: '^Return to work is required'
    }
  },
  returnToWorkWhen: function (value, attributes) {
    if (attributes.returnToWork && attributes.returnToWork === '1') {
      return {
        presence: {
          allowEmpty: false,
          message: '^Required if return to work is yes'
        }
      }
    }
  },
  typeOfWork: function (value, attributes) {
    if (attributes.returnToWork && attributes.returnToWork === '1') {
      return {
        presence: {
          allowEmpty: false,
          message: '^Required if return to work is yes'
        }
      }
    }
  }
}