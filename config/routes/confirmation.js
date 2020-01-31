module.exports.routes = {
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
};
