'use strict';

const stopWorking = require('../utils/support/stopWorking');
const returnToWork = require('../utils/support/returnToWork');
const returnToWorkWhen = require('../utils/support/returnToWorkWhen');
const typeOfWork = require('../utils/support/typeOfWork');
const practitionerType = require('../utils/support/practitionerType');

const moment = require('moment');

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
    fullNameLastFirst: {
      type: Sequelize.VIRTUAL,
      get() {
        return this.lastName + ', ' + this.firstName;
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
    consent: {
      type: Sequelize.BOOLEAN,
      get() {
        if (this.getDataValue('consent') === null) {
          return null;
        }

        if (this.getDataValue('consent')) {
          return 'yes';
        }
        return 'no';
      }
    },
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
    patientDocuments: Sequelize.BOOLEAN,
    practitionerType: Sequelize.INTEGER, // fk to support
    practitionerTypeText: {
      type: Sequelize.VIRTUAL,
      get() {
        if (this.practitionerType !== null) {
          return sails.__(practitionerType[this.practitionerType]);
        }
      }
    },
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
    practitionerSubmittedAt: {
      type: Sequelize.DATE,
      get() {
        if (this.getDataValue('practitionerSubmittedAt')) {
          return moment(this.getDataValue('practitionerSubmittedAt')).format('MMM D, YYYY H:mmA');
        }
        return null;
      }
    },
    lastAccessedAt: {
      type: Sequelize.DATE,
      get() {
        if (this.getDataValue('lastAccessedAt')) {
          return moment(this.getDataValue('lastAccessedAt')).format('MMM D, YYYY H:mmA');
        }
        return sails.__('New');
      }
    }
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
