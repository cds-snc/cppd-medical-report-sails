module.exports.routes = {
  'GET /en/login': {
    name: 'login',
    controller: 'AuthController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/login',
      fr: '/fr/login'
    }
  },

  'POST /en/login': {
    name: 'login.post',
    controller: 'AuthController',
    action: 'login',
    lang: 'en',
    i18n: {
      en: '/en/login',
      fr: '/fr/login'
    }
  },

};
