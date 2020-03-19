module.exports = {
  relationshipStarted: {
    presence: {
      allowEmpty: false,
      message: '^errors.relationship.relationship_started'
    }
  },
  firstTreatmentDate: {
    presence: {
      allowEmpty: false,
      message: '^errors.relationship.first_treatment_date'
    },
  },
  visitNumber: {
    presence: {
      allowEmpty: false,
      message: '^errors.relationship.visit_number'
    },
    numericality: true,
  },
  lastVisitDate: {
    presence: {
      allowEmpty: false,
      message: '^errors.relationship.last_visit_date'
    },
  },
  stopWorking: {
    presence: {
      allowEmpty: false,
      message: '^errors.relationship.stop_working'
    }
  },
  stopWorkingWhen: function (value, attributes) {
    if (attributes.stopWorking === '1') {
      return {
        presence: {
          allowEmpty: false,
          message: '^errors.relationship.stop_working_when'
        }
      };
    }
  }
};
