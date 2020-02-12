/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

// const defaultPolicies = ['localize', 'route', 'flash'];
const defaultPolicies = ['localize', 'route', 'flash', 'reportExists'];

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // '*': true,
  '*': defaultPolicies,

  SessionsController: {
    '*': ['localize', 'route', 'flash', 'isAuthenticated'],
  },

  StartController: {
    '*': ['localize', 'route', 'flash'],
  },

  PersonalController: {
    '*': ['localize', 'route', 'flash'],
  },

  ConsentController: {
    'index': ['localize', 'route', 'flash'],
    'store': ['localize', 'route', 'flash'],
  },

  MedicalProfessionalController: {
    '*': ['localize', 'route', 'flash']
  }
};
