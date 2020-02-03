module.exports.routes = {
  /**
   * INVITE CODE ROUTES
   */
  'GET /en/invite': {
    name: 'invite',
    controller: 'InviteController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/invite',
      fr: '/fr/invite'
    }
  },
};
