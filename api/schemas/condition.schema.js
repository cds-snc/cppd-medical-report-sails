module.exports = {
  conditionName: {
    presence: {
      allowEmpty: false,
      message: '^errors.name_of_condition.length'
    }
  },
  icdCode: {
    presence: {
      allowEmpty: false,
      message: '^errors.icd_code_required'
    }
  },
  symptomsBegan: {
    presence: {
      allowEmpty: false,
      message: '^errors.symptoms_began.length'
    }
  },
  clinicallyImpair: {
    presence: {
      allowEmpty: false,
      message: '^errors.clinically_impair'
    }
  },
  conditionOutlook: {
    presence: {
      message: '^errors.condition_outlook_required'
    }
  },
  conditionLast: {
    presence: {
      message: '^errors.condition_last_required'
    }
    // also validate options
  },
  symptomsOccur: {
    presence: {
      message: '^errors.symptoms_occur_required'
    }
  },
};
