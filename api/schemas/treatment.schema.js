module.exports = {
  treatmentType: {
    presence: {
      allowEmpty: false,
      message: '^errors.treatment_type.length'
    },
  },
  treatmentFrequency: {
    presence: {
      message: '^errors.treatment_frequency.length',
      allowEmpty: false,
    },
  },
  treatmentStartDate: {
    presence: {
      message: '^errors.treatment_start_date.length',
      allowEmpty: false,
    },
  },
  selectedConditions: {
    presence: {
      message: '^errors.treatment_treated_condition.is_checked',
      allowEmpty: false
    }
  },
  treatmentResults: {
    presence: {
      message: '^errors.treatment_results.length',
      allowEmpty: false
    },
  },
};
