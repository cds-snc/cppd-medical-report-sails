'use strict';

const validate = require('validate.js');
const conditionOutlook = require('../utils/support/conditionOutlook');
const symptomsOccur = require('../utils/support/symptomsOccur');

module.exports = {
  attributes: {
    conditionName: Sequelize.STRING,
    icdCode: Sequelize.STRING,
    symptomsBegan: Sequelize.STRING,
    clinicallyImpair: Sequelize.STRING,
    conditionOutlook: Sequelize.INTEGER, // fk to support
    conditionOutlookUnknown: Sequelize.TEXT,
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
        return !validate(this, require('../schemas/condition.schema'));
      },
      conditionOutlookText: function () {
        if (this.conditionOutlook !== null) {
          return conditionOutlook[this.conditionOutlook];
        }
      },
      symptomsOccurText: function () {
        if (this.symptomsOccur !== null) {
          return symptomsOccur[this.symptomsOccur];
        }
      }
    },
  }
};
