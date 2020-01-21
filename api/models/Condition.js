'use strict';

const validate = require('validate.js');

module.exports = {
  attributes: {
    conditionName: Sequelize.STRING,
    icdCode: Sequelize.STRING,
    symptomsBegan: Sequelize.STRING,
    clinicallyImpair: Sequelize.STRING,
    conditionOutlook: Sequelize.INTEGER, // fk to support
    conditionOutlookUnknown: Sequelize.TEXT,
    conditionLast: Sequelize.INTEGER, // fk to support
    symptomsOccur: Sequelize.INTEGER,
    symptomsOccurUnknown: Sequelize.TEXT,
  },
  associations: function () {
    Condition.belongsTo(MedicalReport);
    Condition.belongsToMany(Treatment, {
      through: 'ConditionTreatments',
    });
    Condition.belongsToMany(Medication, {
      through: 'ConditionMedications',
    });
    Condition.belongsToMany(Document, {
      through: 'ConditionDocuments',
    });
  },
  options: {
    tableName: 'Conditions',
    instanceMethods: {
      checkValid: function () {
        return validate(this, require('../schemas/condition.schema'));
      }
    },
    getterMethods: {
      isValid: function () {
        return !this.checkValid();
      }
    },
  }
};
