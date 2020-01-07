
module.exports = {
  /**
   * PERSONAL ROUTES
   */
  'GET /en/personal': {
    name: 'personal',
    controller: 'PersonalController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/personal',
      fr: '/fr/personnel'
    }
  },

  'POST /en/personal': {
    name: 'personal.store',
    controller: 'PersonalController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/personal',
      fr: '/fr/personnel'
    }
  }
};
