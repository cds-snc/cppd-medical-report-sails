'use strict';

const stopWorking = require('../utils/support/stopWorking');
const returnToWork = require('../utils/support/returnToWork');
const returnToWorkWhen = require('../utils/support/returnToWorkWhen');
const typeOfWork = require('../utils/support/typeOfWork');

module.exports = {
  attributes: {
    applicationCode: { type: Sequelize.STRING, unique: true },
    socialInsuranceNumber: Sequelize.STRING,
    firstName: Sequelize.STRING,
    middleName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    fullName: {
      type: Sequelize.VIRTUAL,
      get() {
        return this.firstName + ' ' + this.lastName;
      }
    },
    birthLastName: Sequelize.STRING,
    birthdate: Sequelize.DATEONLY,
    address: Sequelize.STRING,
    city: Sequelize.STRING,
    province: Sequelize.STRING,
    country: Sequelize.STRING,
    postal: Sequelize.STRING,
    email: Sequelize.STRING,
    telephone: Sequelize.STRING,
    alternateTelephone: Sequelize.STRING,
    contactTime: Sequelize.STRING,
    consent: Sequelize.BOOLEAN, // Overall, for Service Canada, medical professionals, and other gov
    consentEducation: Sequelize.BOOLEAN, // Educational institutions or other vocational agencies
    consentAccountant: Sequelize.BOOLEAN, // Accountant or bookkeeper for information on self-employment
    consentFinancial: Sequelize.BOOLEAN, // Financial institutions (for address updates only)
    consentVolunteer: Sequelize.BOOLEAN, // Volunteer organizations
    consentEmployees: Sequelize.BOOLEAN, // Employees (for cases of self-employed persons)
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
    stopWorkingText: {
      type: Sequelize.VIRTUAL,
      get() {
        if (this.stopWorking !== null) {
          return sails.__(stopWorking[this.stopWorking]);
        }
      }
    },
    stopWorkingWhen: Sequelize.STRING,
    returnToWork: Sequelize.INTEGER, // fk to support
    returnToWorkText: {
      type: Sequelize.VIRTUAL,
      get() {
        if (this.returnToWork !== null) {
          return sails.__(returnToWork[this.returnToWork]);
        }
      }
    },
    returnToWorkWhen: Sequelize.INTEGER, // fk to support
    returnToWorkWhenText: {
      type: Sequelize.VIRTUAL,
      get() {
        if (this.returnToWorkWhen !== null) {
          return sails.__(returnToWorkWhen[this.returnToWorkWhen]);
        }
      }
    },
    typeOfWork: Sequelize.INTEGER, // fk to support
    typeOfWorkText: {
      type: Sequelize.VIRTUAL,
      get() {
        if (this.typeOfWork !== null) {
          return sails.__(typeOfWork[this.typeOfWork]);
        }
      }
    },
    workDetails: Sequelize.TEXT,
    patientMedications: Sequelize.BOOLEAN,
    patientTreatments: Sequelize.BOOLEAN,
    practitionerType: Sequelize.STRING, // Type of HCP (ccfp, rn, np, other)
    practitionerTypeOtherSpecify: Sequelize.STRING,
    practitionerFirstName: Sequelize.STRING,
    practitionerLastName: Sequelize.STRING,
    practitionerFullName: {
      type: Sequelize.VIRTUAL,
      get() {
        return this.practitionerFirstName + ' ' + this.practitionerLastName;
      }
    },
    practitionerAddress: Sequelize.STRING,
    practitionerFullAddress: {
      type: Sequelize.VIRTUAL,
      get() {
        return `${this.practitionerAddress}, ${this.practitionerCity}, ${this.practitionerProvince}, ${this.practitionerPostal}, ${this.practitionerCountry}`;
      }
    },
    practitionerCity: Sequelize.STRING,
    practitionerProvince: Sequelize.STRING,
    practitionerCountry: Sequelize.STRING,
    practitionerPostal: Sequelize.STRING,
    practitionerEmail: Sequelize.STRING,
    practitionerPhone: Sequelize.STRING,
    practitionerSignatureDraw: Sequelize.TEXT, // SVG data
    practitionerSignatureType: Sequelize.STRING, // Full name
    billingIdType: Sequelize.STRING,
    billingId: Sequelize.STRING,
    applicantSubmittedAt: Sequelize.DATE,
    practitionerSubmittedAt: Sequelize.DATE,
    practitionerTimezoneOffset: Sequelize.INTEGER, // Hours offset from GMT
    practitionerIpAddress: Sequelize.STRING // IP address of the HCP
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
  }
};
