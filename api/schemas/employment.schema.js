module.exports = {
  stop_work: {
    presence: {
      message: '^Stop working is required',
      allowEmpty: false,
    },
  },
  date_stopped_work: function (value, attributes) {
    const stop_work = attributes.stop_work;
    if (stop_work && stop_work === '1') {
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
  return_to_work: {
    presence: {
      message: '^Stop working is required',
      allowEmpty: false,
    },
  },
  return_to_work_timeframe: function (value, attributes) {
    const return_to_work = attributes.return_to_work;
    if (return_to_work && return_to_work === '1') {
      return {
        presence: {
          allowEmpty: false,
          message: '^Return to work timeframe is required if return to work is yes'
        },
      };
    }
  },
  type_of_work: function (value, attributes) {
    const return_to_work = attributes.return_to_work;
    if (return_to_work && return_to_work === '1') {
      return {
        presence: {
          allowEmpty: false,
          message: '^Type of work is required if return to work is yes'
        },
      };
    }
  },
  type_of_work_other: function (value, attributes) {
    const type_of_work = attributes.type_of_work;
    if (type_of_work && type_of_work === '4') {
      return {
        presence: {
          allowEmpty: false,
          message: '^Other type of work is required if Other selected'
        },
      };
    }
  },
};
