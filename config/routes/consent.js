module.exports.routes = {
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
  'GET /en/show_consent': {
    name: 'consent.show',
    controller: 'ConsentController',
    action: 'show',
    lang: 'en',
    i18n: {
      en: '/en/show_consent',
      fr: '/fr/show_consent'
    }
  },
  'GET /en/no_consent': {
    name: 'consent.no',
    controller: 'ConsentController',
    action: 'noConsent',
    lang: 'en',
    i18n: {
      en: '/en/no_consent',
      fr: '/fr/no_consent'
    }
  },
};
