module.exports = {
  'GET /en/medical-professional': {
    name: 'medical-professional',
    controller: 'MedicalProfessionalController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/medical-professional',
      fr: '/fr/medical-professional'
    }
  },
  'POST /en/medical-professional': {
    name: 'medical-professional.store',
    controller: 'MedicalProfessionalController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/medical-professional',
      fr: '/fr/medical-professional'
    }
  },
  'GET /en/doctor': { // convenience duplicate of medical-profession
    name: 'doctor',
    controller: 'MedicalProfessionalController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/doctor',
      fr: '/fr/doctor'
    }
  },
  'POST /en/doctor': { // convenience duplicate of medical-profession
    name: 'doctor.store',
    controller: 'MedicalProfessionalController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/doctor',
      fr: '/fr/doctor'
    }
  }
};
