module.exports = {
  conditionName: {
    presence: {
      allowEmpty: false,
      message: '^errors.name_of_condition.length'
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
  conditionOutlookUnknown: function (value, attributes) {
    const conditionOutlook = attributes.conditionOutlook;
    if (conditionOutlook && conditionOutlook === '4') {
      return {
        presence: {
          allowEmpty: false,
          message: '^errors.condition_outlook_unknown'
        }
      }
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
  symptomsOccurUnknown: function (value, attributes) {
    const symptomsOccur = attributes.symptomsOccur;
    if (symptomsOccur && symptomsOccur === '3') {
      return {
        presence: {
          allowEmpty: false,
          message: '^errors.symptoms_occur_unknown_required'
        }
      }
    }
  }
};
