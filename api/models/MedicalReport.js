'use strict';

module.exports = {
  attributes: {
    applicationCode: { type: Sequelize.STRING, unique: true },
    socialInsuranceNumber: Sequelize.STRING,
    preferredTitle: Sequelize.STRING,
    firstName: Sequelize.STRING,
    middleName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    birthLastName: Sequelize.STRING,
    birthdate: Sequelize.DATEONLY,
    address: Sequelize.STRING,
    telephone: Sequelize.STRING,
    alternateTelephone: Sequelize.STRING,
    contactTime: Sequelize.STRING,
    consent: Sequelize.BOOLEAN, // Overall, for Service Canada, medical professionals, and other gov
    consentEducation: Sequelize.BOOLEAN, // Educational institutions or other vocational agencies
    consentAccountant: Sequelize.BOOLEAN, // Accountant or bookkeeper for information on self-employment
    consentFinancial: Sequelize.BOOLEAN, // Financial institutions (for address updates only)
    consentVolunteer: Sequelize.BOOLEAN, // Volunteer organizations
    consentEmployees: Sequelize.BOOLEAN, // Employees (for cases of self-employed persons)
    signatureMode: Sequelize.STRING, // 'draw' or 'type'
    signatureDraw: Sequelize.TEXT, // SVG data
    signatureType: Sequelize.STRING, // Full name
    relationshipStarted: Sequelize.STRING, 
    firstTreatmentDate: Sequelize.STRING, 
    visitNumber: Sequelize.INTEGER,
    lastVisitDate: Sequelize.STRING,
    conditionType: Sequelize.STRING,
    diagnosis: Sequelize.TEXT,
    icdCode: Sequelize.STRING,
    onsetDate: Sequelize.STRING,
    limitations: Sequelize.TEXT,
    plannedTreatments: Sequelize.TEXT,
    height: Sequelize.STRING,
    weight: Sequelize.STRING,
    stopWorking: Sequelize.INTEGER, // fk to support
    stopWorkingWhen: Sequelize.STRING,
    returnToWork: Sequelize.INTEGER, // fk to support
    returnToWorkWhen: Sequelize.INTEGER, // fk to support
    typeOfWork: Sequelize.INTEGER, // fk to support
    workDetails: Sequelize.TEXT,
    overallHealth: Sequelize.TEXT,
    patientMedications: Sequelize.BOOLEAN,
    patientTreatments: Sequelize.BOOLEAN,
    practitionerType: Sequelize.INTEGER, // fk to support
    otherSpecify: Sequelize.STRING,
    name: Sequelize.STRING,
    date: Sequelize.DATEONLY,
    physicianAddress: Sequelize.TEXT,
    billingIdType: Sequelize.STRING,
    billingId: Sequelize.STRING,
  },
  associations: function () {
    MedicalReport.hasMany(Condition, {
      as: 'Conditions'
    });
    MedicalReport.hasMany(Medication, {
      as: 'Medications'
    });
    MedicalReport.hasMany(Document, {
      as: 'Documents'
    });
    MedicalReport.hasMany(Treatment, {
      as: 'Treatments'
    });
  },
  options: {
    tableName: 'MedicalReports',
    getterMethods: {
      fullName: function () {
        return this.firstName + ' ' + this.lastName;
      }
    },
  }
};
