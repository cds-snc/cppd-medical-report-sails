'use strict';
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
      birthdate: {
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
      patientDocuments: {
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
        type: Sequelize.TEXT
      },
      practitionerSignatureType: {
        type: Sequelize.STRING
      },
      practitionerIpAddress: {
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
      lastAccessedAt: {
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
