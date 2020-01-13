module.exports.routes = {
  /**
   * WORK ROUTES
   */
  'GET /en/work': {
    name: 'work',
    controller: 'FutureWorkCapacityController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/work',
      fr: '/fr/work'
    }
  },

  'POST /en/work': {
    name: 'work.store',
    controller: 'FutureWorkCapacityController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/work',
      fr: '/fr/work'
    }
  },
}