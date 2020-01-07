module.exports = {

  /**
   * CONFIRMATION ROUTES
   */
  'GET /en/confirmation': {
    name: 'confirmation',
    controller: 'ConfirmationController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/confirmation',
      fr: '/fr/confirmation'
    }
  },

  'POST /en/confirmation': {
    name: 'confirmation.store',
    controller: 'ConfirmationController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/confirmation',
      fr: '/fr/confirmation'
    }
  },
};
