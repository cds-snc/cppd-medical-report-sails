module.exports = {
  treatment_type: {
    presence: {
      allowEmpty: false,
      message: '^errors.treatment_type.length'
    },
  },
  treatment_frequency: {
    presence: {
      message: '^errors.treatment_frequency.length',
      allowEmpty: false,
    },
  },
  treatment_start_date: {
    presence: {
      message: '^errors.treatment_start_date.length',
      allowEmpty: false,
    },
  },
  treatment_end_date: {
    presence: {
      message: '^errors.treatment_end_date.length',
      allowEmpty: false,
    },
  },
  // DOUBLE CHECK THIS VALIDATION RULE
  treatment_treated_condition: {
    presence: {
      message: '^errors.treatment_treated_condition.is_checked',
      allowEmpty: false
    }
  },
  treatment_results: {
    presence: {
      message: '^errors.treatment_results.length',
      allowEmpty: false
    },
  },
}
