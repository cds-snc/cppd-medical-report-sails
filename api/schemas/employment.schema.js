module.exports = {
  stopWork: {
    presence: {
      message: '^Stop working is required',
      allowEmpty: false,
    },
  },
  dateStoppedWork: function (value, attributes) {
    const stopWork = attributes.stopWork;
    if (stopWork && stopWork === '1') {
      if (value) {
        return {
          validateDateFormat: {
            message: '^Stop work date is incorrectly formatted'
          },
          validateDateExists: {
            message: '^Stop work date is not a valid date'
          }
        };
      }
      return {
        presence: {
          allowEmpty: false,
          message: '^Stop work date is required if stop work is selected'
        },
      };
    }
  },
  returnToWork: {
    presence: {
      message: '^Stop working is required',
      allowEmpty: false,
    },
  },
  returnToWorkTimeframe: function (value, attributes) {
    const returnToWork = attributes.returnToWork;
    if (returnToWork && returnToWork === '1') {
      return {
        presence: {
          allowEmpty: false,
          message: '^Return to work timeframe is required if return to work is yes'
        },
      };
    }
  },
  typeOfWork: function (value, attributes) {
    const returnToWork = attributes.returnToWork;
    if (returnToWork && returnToWork === '1') {
      return {
        presence: {
          allowEmpty: false,
          message: '^Type of work is required if return to work is yes'
        },
      };
    }
  },
  typeOfWorkOther: function (value, attributes) {
    const typeOfWork = attributes.typeOfWork;
    if (typeOfWork && typeOfWork === '4') {
      return {
        presence: {
          allowEmpty: false,
          message: '^Other type of work is required if Other selected'
        },
      };
    }
  },
};
