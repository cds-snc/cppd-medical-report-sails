'use strict';
/*

CREATE TABLE public."Medications" (
    id integer NOT NULL,
    "medicationName" character varying(255),
    "medicationDosage" character varying(255),
    "medicationFrequency" character varying(255),
    "medicationStartDate" character varying(255),
    "medicationEndDate" character varying(255),
    "medicationResults" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "MedicalReportId" integer
);
*/
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Medications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      medicationName: {
        type: Sequelize.STRING
      },
      medicationDosage: {
        type: Sequelize.STRING
      },
      medicationFrequency: {
        type: Sequelize.STRING
      },
      medicationStartDate: {
        type: Sequelize.STRING
      },
      medicationEndDate: {
        type: Sequelize.STRING
      },
      medicationResults: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
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
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Medications');
  }
};
