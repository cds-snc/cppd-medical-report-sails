const validate = require('./validator');

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
        let errors = validate(req.body, validations);

        /**
         * if there are validation errors, flash them along
         * with the data to the session and redirect back
         */
        if (errors) {
          req.flash('errors', errors);
          req.flash('data', req.body);
          return res.redirect('back');
        }
        return true;
      };

      /**
       * Bind the validate method to the req object so it's
       * available in our Controllers.
       */
      sails.on('router:before', () => {
        sails.router.bind('all /*', (req, res, next) => {
          req.validate = sails.validate;

          return next();
        });
      });
      return done();
    }
  };
};
