/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': '/en/start', // redirect to start

  'GET /en/start': {
    name: 'start',
    controller: 'StartController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/start',
      fr: '/fr/debut'
    }
  },

  'GET /en/personal': {
    name: 'personal',
    controller: 'PersonalController',
    action: 'index',
    lang: 'en',
    i18n: {
      en: '/en/personal',
      fr: '/fr/personnel'
    }
  },

  'POST /en/personal': {
    name: 'personal.store',
    controller: 'PersonalController',
    action: 'store',
    lang: 'en',
    i18n: {
      en: '/en/personal',
      fr: '/fr/personnel'
    }
  },

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
    action: 'index',
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

  'POST /en/conditions/:id/delete': {
    name: 'conditions.delete',
    controller: 'DeleteConditionController',
    action: 'destroy',
    lang: 'en',
    i18n: {
      en: '/en/conditions/:id/delete',
      fr: '/fr/conditions/:id/delete'
    }
  },

  // example route with params
  'GET /en/product/:id': {
    name: 'getProduct',
    controller: 'ProductController',
    action: 'show',
    lang: 'en',
    i18n: {
      en: '/en/product/:id',
      fr: '/fr/produit/:id'
    }
  }

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
