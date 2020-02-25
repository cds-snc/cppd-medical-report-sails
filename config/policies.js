/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

const featureFlags = require('../api/utils/FeatureFlags');

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // '*': true,
  '*': ['localize', 'route', 'flash', 'reportExists'],

  SessionsController: {
    '*': featureFlags.isEnabled('FEATURE_AUTH') ? ['localize', 'route', 'flash', 'isAuthenticated'] : ['localize', 'route', 'flash'],
  },

  StartController: {
    '*': ['localize', 'route', 'flash'],
  },

  PersonalController: {
    '*': ['localize', 'route', 'flash'],
  },

  MedicalProfessionalController: {
    '*': ['localize', 'route', 'flash']
  },

  AuthController: {
    '*': ['localize', 'route', 'flash']
  }
};
