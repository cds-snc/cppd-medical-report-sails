module.exports.routes = {
  /**
   * Practitioner ROUTES
   */
  'GET /en/practitioner': {
    name: 'practitioner',
    controller: 'PractitionerController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/practitioner',
      fr: '/fr/practitioner'
    }
  },

  'POST /en/practitioner': {
    name: 'practitioner.store',
    controller: 'PractitionerController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/practitioner',
      fr: '/fr/practitioner'
    }
  },
};
