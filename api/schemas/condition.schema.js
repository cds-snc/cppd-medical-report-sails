module.exports = {
  name_of_condition: {
    presence: {
      allowEmpty: false,
      message: '^errors.name_of_condition.length'
    }
  },
  symptoms_began: {
    presence: {
      allowEmpty: false,
      message: '^errors.symptoms_began.length'
    }
  },
  clinically_impair: {
    presence: {
      allowEmpty: false,
      message: '^errors.clinically_impair'
    }
  },
  condition_outlook: {
    presence: {
      message: '^errors.condition_outlook_required'
    }
  },
  condition_outlook_unknown: function (value, attributes) {
    const condition_outlook = attributes.condition_outlook;
    if (condition_outlook && condition_outlook === '4') {
      return {
        presence: {
          allowEmpty: false,
          message: '^errors.condition_outlook_unknown'
        }
      };
    }
  },
  condition_last: {
    presence: {
      message: '^errors.condition_last_required'
    }
    // also validate options
  },
  symptoms_occur: {
    presence: {
      message: '^errors.symptoms_occur_required'
    }
  },
  symptoms_occur_unknown: function (value, attributes) {
    const symptoms_occur = attributes.symptoms_occur;
    if (symptoms_occur && symptoms_occur === '3') {
      return {
        presence: {
          allowEmpty: false,
          message: '^errors.symptoms_occur_unknown_required'
        }
      };
    }
  }
};
