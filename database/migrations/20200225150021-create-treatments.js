'use strict';

/*
CREATE TABLE public."Treatments" (
    id integer NOT NULL,
    "treatmentType" character varying(255),
    "treatmentFrequency" character varying(255),
    "treatmentStartDate" character varying(255),
    "treatmentEndDate" character varying(255),
    "treatmentResults" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "MedicalReportId" integer
);
 */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Treatments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      treatmentType: {
        type: Sequelize.STRING
      },
      treatmentFrequency: {
        type: Sequelize.STRING
      },
      treatmentStartDate: {
        type: Sequelize.STRING
      },
      treatmentEndDate: {
        type: Sequelize.STRING
      },
      treatmentResults: {
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
    return queryInterface.dropTable('Treatments');
  }
};
