module.exports = {
  /*
   * EMPLOYMENT ROUTES
   */
  'GET /en/employment': {
    name: 'employment',
    controller: 'EmploymentController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/employment',
      fr: '/fr/employment'
    }
  },

  'POST /en/employment': {
    name: 'employment.store',
    controller: 'EmploymentController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/employment',
      fr: '/fr/employment'
    }
  }
};
