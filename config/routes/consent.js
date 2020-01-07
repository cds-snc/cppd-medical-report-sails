module.exports = {
  /**
   * CONSENT ROUTES
   */
  'GET /en/consent': {
    name: 'consent',
    controller: 'ConsentController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/consent',
      fr: '/fr/consent'
    }
  },

  'POST /en/consent': {
    name: 'consent.store',
    controller: 'ConsentController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/consent',
      fr: '/fr/consent'
    }
  },
};
