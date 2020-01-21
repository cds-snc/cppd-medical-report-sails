'use strict';

const validate = require('validate.js');

module.exports = {
  attributes: {
    originalFileName: Sequelize.STRING,
    fileName: Sequelize.STRING,
  },
  associations: function () {
    Document.belongsTo(MedicalReport);
    Document.belongsToMany(Condition, {
      through: 'ConditionDocuments',
    });
  },
  options: {
    tableName: 'Documents',
    instanceMethods: {
      checkValid: function () {
        return validate(this, require('../schemas/documents.schema'));
      }
    },
    getterMethods: {
      isValid: function () {
        return !this.checkValid();
      }
    },
  }
};
