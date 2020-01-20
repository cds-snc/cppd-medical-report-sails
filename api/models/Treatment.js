'use strict';

const validate = require('validate.js');

module.exports = {
  attributes: {
    treatmentType: Sequelize.STRING,
    treatmentFrequency: Sequelize.STRING,
    treatmentStartDate: Sequelize.STRING,
    treatmentEndDate: Sequelize.STRING,
    treatmentResults: Sequelize.TEXT
  },
  associations: function() {
    Treatment.belongsToMany(Condition, {
      through: 'ConditionTreatments',
    });
  },
  options: {
    tableName: 'Treatments',
    instanceMethods: {
      checkValid: function() {
        return validate(this, require('../schemas/treatment.schema'));
      }
    },
    getterMethods: {
      isValid: function () {
        return !this.checkValid();
      }
    },
  }
};
