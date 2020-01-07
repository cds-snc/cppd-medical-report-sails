module.exports = {
  /**
   * CONDITIONS ROUTES
   */
  'GET /en/conditions': {
    name: 'conditions',
    controller: 'ConditionsController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/conditions',
      fr: '/fr/conditions'
    }
  },

  'GET /en/conditions/add': {
    name: 'conditions.add',
    controller: 'AddConditionController',
    action: 'create',
    lang: 'en',
    i18n: {
      en: '/en/conditions/add',
      fr: '/fr/conditions/ajouter'
    }
  },

  'POST /en/conditions/add': {
    name: 'conditions.store',
    controller: 'AddConditionController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/conditions/add',
      fr: '/fr/conditions/ajouter'
    }
  },

  'GET /en/conditions/:id/edit': {
    name: 'conditions.edit',
    controller: 'EditConditionController',
    action: 'edit',
    lang: 'en',
    i18n: {
      en: '/en/conditions/:id/edit',
      fr: '/fr/conditions/:id/modifier'
    }
  },

  'POST /en/conditions/:id/edit': {
    name: 'conditions.update',
    controller: 'EditConditionController',
    action: 'update',
    lang: 'en',
    i18n: {
      en: '/en/conditions/:id/edit',
      fr: '/fr/conditions/:id/modifier'
    }
  },

  'POST /en/conditions/:id/delete': {
    name: 'conditions.delete',
    controller: 'DeleteConditionController',
    action: 'delete',
    lang: 'en',
    i18n: {
      en: '/en/conditions/:id/delete',
      fr: '/fr/conditions/:id/delete'
    }
  },
};
