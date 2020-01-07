module.exports = {

  /**
   * HEALTH ROUTES
   */
  'GET /en/health': {
    name: 'health',
    controller: 'HealthController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/health',
      fr: '/fr/health'
    }
  },

  'POST /en/health': {
    name: 'health.store',
    controller: 'HealthController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/health',
      fr: '/fr/health'
    }
  },
};
