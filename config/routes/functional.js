module.exports = {
  'GET /en/functional': {
    name: 'functional',
    controller: 'FunctionalController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/functional',
      fr: '/fr/fonctionnelle'
    }
  },
  'POST /en/functional': {
    name: 'functional.store',
    controller: 'FunctionalController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/functional',
      fr: '/fr/fonctionnelle'
    }
  },
};
