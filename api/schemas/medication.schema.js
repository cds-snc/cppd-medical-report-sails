module.exports = {
  medicationName: {
    presence: {
      allowEmpty: false,
      message: '^errors.medication_name.length'
    }
  },
  medicationDosage: {
    presence: {
      message: '^errors.medication_dosage.length',
      allowEmpty: false,
    },
  },
  medicationFrequency: {
    presence: {
      message: '^errors.medication_frequency.length',
      allowEmpty: false,
    },
  },
  medicationStartDate: {
    presence: {
      message: '^errors.medication_start_date.length',
      allowEmpty: false,
    },
  },
  medicationTreatedCondition: {
    presence: {
      message: '^errors.medication_treated_condition.is_checked',
      allowEmpty: false,
    },
  },
  medicationResults: {
    presence: {
      message: '^errors.medication_results.length',
      allowEmpty: false,
    },
  },
};
