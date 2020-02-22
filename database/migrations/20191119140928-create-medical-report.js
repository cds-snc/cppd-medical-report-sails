'use strict';
/*

CREATE TABLE public."MedicalReports" (
    id integer NOT NULL,
    "applicationCode" character varying(255),
    "socialInsuranceNumber" character varying(255),
    "firstName" character varying(255),
    "middleName" character varying(255),
    "lastName" character varying(255),
    "birthLastName" character varying(255),
    birthdate date,
    address character varying(255),
    city character varying(255),
    province character varying(255),
    country character varying(255),
    postal character varying(255),
    email character varying(255),
    telephone character varying(255),
    "alternateTelephone" character varying(255),
    "contactTime" character varying(255),
    consent boolean,
    "consentEducation" boolean,
    "consentAccountant" boolean,
    "consentFinancial" boolean,
    "consentVolunteer" boolean,
    "consentEmployees" boolean,
    "signatureDraw" text,
    "signatureType" character varying(255),
    "relationshipStarted" character varying(255),
    "firstTreatmentDate" character varying(255),
    "visitNumber" integer,
    "lastVisitDate" character varying(255),
    "conditionType" character varying(255),
    diagnosis text,
    "icdCode" character varying(255),
    "onsetDate" character varying(255),
    limitations text,
    "plannedTreatments" text,
    height character varying(255),
    weight character varying(255),
    "stopWorking" integer,
    "stopWorkingWhen" character varying(255),
    "returnToWork" integer,
    "returnToWorkWhen" integer,
    "typeOfWork" integer,
    "workDetails" text,
    "patientMedications" boolean,
    "patientTreatments" boolean,
    "practitionerType" integer,
    "practitionerTypeOtherSpecify" character varying(255),
    "practitionerFirstName" character varying(255),
    "practitionerLastName" character varying(255),
    "practitionerAddress" character varying(255),
    "practitionerCity" character varying(255),
    "practitionerProvince" character varying(255),
    "practitionerCountry" character varying(255),
    "practitionerPostal" character varying(255),
    "practitionerEmail" character varying(255),
    "practitionerPhone" character varying(255),
    "practitionerSignatureDraw" text,
    "practitionerSignatureType" character varying(255),
    "billingIdType" character varying(255),
    "billingId" character varying(255),
    "applicantSubmittedAt" timestamp with time zone,
    "practitionerSubmittedAt" timestamp with time zone,
*/
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MedicalReports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      applicationCode: {
        type: Sequelize.STRING
      },
      socialInsuranceNumber: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      middleName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      birthLastName: {
        type: Sequelize.STRING
      },
      birthDate: {
        type: Sequelize.DATEONLY
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      postal: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.STRING
      },
      alternateTelephone: {
        type: Sequelize.STRING
      },
      contactTime: {
        type: Sequelize.STRING
      },
      consent: {
        type: Sequelize.BOOLEAN
      },
      consentEducation: {
        type: Sequelize.BOOLEAN
      },
      consentAccountant: {
        type: Sequelize.BOOLEAN
      },
      consentFinancial: {
        type: Sequelize.BOOLEAN
      },
      consentVolunteer: {
        type: Sequelize.BOOLEAN
      },
      consentEmployees: {
        type: Sequelize.BOOLEAN
      },
      signatureDraw: {
        type: Sequelize.TEXT
      },
      signatureType: {
        type: Sequelize.STRING
      },
      relationshipStarted: {
        type: Sequelize.STRING
      },
      firstTreatmentDate: {
        type: Sequelize.STRING
      },
      visitNumber: {
        type: Sequelize.INTEGER
      },
      lastVisitDate: {
        type: Sequelize.STRING
      },
      conditionType: {
        type: Sequelize.STRING
      },
      diagnosis: {
        type: Sequelize.TEXT
      },
      icdCode: {
        type: Sequelize.STRING
      },
      onsetDate: {
        type: Sequelize.STRING
      },
      limitations: {
        type: Sequelize.TEXT
      },
      plannedTreatments: {
        type: Sequelize.TEXT
      },
      height: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      stopWorking: {
        type: Sequelize.INTEGER
      },
      stopWorkingWhen: {
        type: Sequelize.STRING
      },
      returnToWork: {
        type: Sequelize.INTEGER
      },
      returnToWorkWhen: {
        type: Sequelize.INTEGER
      },
      typeOfWork: {
        type: Sequelize.INTEGER
      },
      workDetails: {
        type: Sequelize.TEXT
      },
      patientMedications: {
        type: Sequelize.BOOLEAN
      },
      patientTreatments: {
        type: Sequelize.BOOLEAN
      },
      practitionerType: {
        type: Sequelize.INTEGER
      },
      practitionerTypeOtherSpecify: {
        type: Sequelize.STRING
      },
      practitionerFirstName: {
        type: Sequelize.STRING
      },
      practitionerLastName: {
        type: Sequelize.STRING
      },
      practitionerAddress: {
        type: Sequelize.STRING
      },
      practitionerCity: {
        type: Sequelize.STRING
      },
      practitionerProvince: {
        type: Sequelize.STRING
      },
      practitionerCountry: {
        type: Sequelize.STRING
      },
      practitionerPostal: {
        type: Sequelize.STRING
      },
      practitionerEmail: {
        type: Sequelize.STRING
      },
      practitionerPhone: {
        type: Sequelize.STRING
      },
      practitionerSignatureDraw: {
        type: Sequelize.text
      },
      practitionerSignatureType: {
        type: Sequelize.STRING
      },
      billingIdType: {
        type: Sequelize.STRING
      },
      billingId: {
        type: Sequelize.STRING
      },
      applicantSubmittedAt: {
        type: Sequelize.DATE
      },
      practitionerSubmittedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('MedicalReports');
  }
};
