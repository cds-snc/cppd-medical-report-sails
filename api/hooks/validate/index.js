const validate = require('validate.js');

/**
 * validate hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineValidateHook(sails) {

  return {

    /**
     * Runs when this Sails app loads/lifts.
     */
    initialize: async function (done) {

      sails.log.info('Initializing custom hook (`validate`)');

      sails.validate = (req, res, validations) => {
        const result = validate(req.body, validations);

        // if there are validation errors, flash them along with the data to the session and redirect back
        if (result) {
          req.addFlash('errors', result);
          req.addFlash('_old_input', req.body);
          return res.redirect('back');
        }
        return true;
      }

      sails.on('router:before', () => {
        sails.router.bind('all /*', (req, res, next) => {
          req.validate = sails.validate

          return next()
        })
      })
      return done()
    }
  };
};
