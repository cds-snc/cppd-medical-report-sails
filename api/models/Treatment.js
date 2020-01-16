'use strict';

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
      through: 'ConditionTreatment',
    });
  },
  options: {
    tableName: 'Treatments'
  }
};
