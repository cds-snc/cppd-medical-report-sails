const validate = require('validate.js');

/**
 * validate hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */


/*
  We need to flatten the array object from Validate.js
  ie,
  [ 
    { 
      social:
      [ 
        'Social must be numeric',
        'Social needs to have 9 digits or more' 
      ],
      first_name: 
      [ 
        'First name can\'t be blank' 
      ],
      last_name: 
      [ 
        'Last name can\'t be blank' 
      ] 
    } 
  ]
  to
  {
    social: { param: 'social', msg: 'Must be numeric', ... },
    social: { param: 'social', msg: 'needs to have 9 digits or more', ... },
    first_name: { param: 'first_name', msg: 'Cannot be empty', ... },
    last_name: { param: 'last_name', msg: 'Cannot be empty', ... },
  }
*/ 
const formatErrorObject = (errors = []) => {

}


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
