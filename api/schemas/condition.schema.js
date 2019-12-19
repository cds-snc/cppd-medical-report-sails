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
  condition_outlook_unknown: {
    // conditional
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
  symptoms_occur_unknown: {
    // conditional
  }
}