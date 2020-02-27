'use strict';
/*
CREATE TABLE public."Conditions" (
    id integer NOT NULL,
    "conditionName" character varying(255),
    "icdCode" character varying(255),
    "symptomsBegan" character varying(255),
    "clinicallyImpair" character varying(255),
    "conditionOutlook" integer,
    "conditionOutlookUnknown" text,
    "conditionLast" integer,
    "symptomsOccur" integer,
    "symptomsOccurUnknown" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "MedicalReportId" integer
)
*/
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Conditions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      conditionName: {
        type: Sequelize.STRING
      },
      icdCode: {
        type: Sequelize.STRING
      },
      symptomsBegan: {
        type: Sequelize.STRING
      },
      clinicallyImpair: {
        type: Sequelize.STRING
      },
      conditionOutlook: {
        type: Sequelize.INTEGER
      },
      conditionOutlookUnknown: {
        type: Sequelize.TEXT
      },
      conditionLast: {
        type: Sequelize.INTEGER
      },
      symptomsOccur: {
        type: Sequelize.INTEGER
      },
      symptomsOccurUnknown: {
        type: Sequelize.TEXT
      },
      MedicalReportId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'MedicalReports'
          },
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Conditions');
  }
};
