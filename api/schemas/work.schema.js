module.exports = {
  plannedTreatments: {
    presence: {
      allowEmpty: false,
      message: '^errors.functional.plannedTreatments.length'
    },
  },
  returnToWork: {
    presence: {
      allowEmpty: false,
      message: '^errors.work.return_to_work'
    }
  },
  returnToWorkWhen: function (value, attributes) {
    if (attributes.returnToWork && attributes.returnToWork === '1') {
      return {
        presence: {
          allowEmpty: false,
          message: '^errors.work.return_to_work_timeframe'
        }
      };
    }
  },
  typeOfWork: function (value, attributes) {
    if (attributes.returnToWork && attributes.returnToWork === '1') {
      return {
        presence: {
          allowEmpty: false,
          message: '^errors.work.return_to_work_type'
        }
      };
    }
  }
};
