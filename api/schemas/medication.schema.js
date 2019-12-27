module.exports = {
  medication_name: {
    presence: {
      allowEmpty: false,
      message: '^errors.medication_name.length'
    }
  },
  medication_dosage: {
    presence: {
      message: '^errors.medication_dosage.length',
      allowEmpty: false,
    },
  },
  medication_frequency: {
    presence: {
      message: '^errors.medication_frequency.length',
      allowEmpty: false,
    },
  },
  medication_start_date: {
    presence: {
      message: '^errors.medication_start_date.length',
      allowEmpty: false,
    },
  },
  medication_end_date: {
    presence: {
      message: '^errors.medication_end_date.length',
      allowEmpty: false,
    },
  },
  // CHECK THIS VALIDATION
  medication_treated_condition: {
    presence: {
      message: '^errors.medication_treated_condition.is_checked',
      allowEmpty: false,
    },
  },
  medication_results: {
    presence: {
      message: '^errors.medication_results.length',
      allowEmpty: false,
    },
  },
}