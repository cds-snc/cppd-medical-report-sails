'use strict';

const validate = require('validate.js');

module.exports = {
  attributes: {
    medicationName: Sequelize.STRING,
    medicationDosage: Sequelize.STRING,
    medicationFrequency: Sequelize.STRING,
    medicationStartDate: Sequelize.STRING,
    medicationEndDate: Sequelize.STRING,
    medicationResults: Sequelize.TEXT
  },
  associations: function() {
    Medication.belongsToMany(Condition, {
      through: 'ConditionMedications',
    });
  },
  options: {
    tableName: 'Medications',
    instanceMethods: {
      checkValid: function() {
        return validate(this, require('../schemas/medication.schema'));
      }
    },
    getterMethods: {
      isValid: function () {
        return !this.checkValid();
      }
    },
  }
};
