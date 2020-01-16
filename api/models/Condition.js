'use strict';

module.exports = {
  attributes: {
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
  },
  options: {
    tableName: 'Conditions'
  }
};
