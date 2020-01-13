module.exports.routes = {
  /**
   * EXPEDITED ROUTES
   */
  'GET /en/expedited': {
    name: 'expedited',
    controller: 'ExpeditedController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/expedited',
      fr: '/fr/expedited'
    }
  },

  'POST /en/expedited': {
    name: 'expedited.store',
    controller: 'ExpeditedController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/expedited',
      fr: '/fr/expedited'
    }
  },

};
