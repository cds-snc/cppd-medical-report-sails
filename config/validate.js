/**
 * Sails-Hook-Req-Validate Global Configuration
 * 
 * For more information on the settings in this file, see:
 * https://github.com/JohnKimDev/sails-hook-req-validate/blob/master/readme.md
 **/

module.exports.validate = {
    /***************************************************************************
    * When validation error occurs, the program can send theres.badRequest 
    * response automatically. 
    * 
    * By Default, `sendResponse` is enabled.
    ***************************************************************************/
    sendResponse: false,

    /***************************************************************************
    * After the validation check, the program returns data as object or you 
    * can use a callback. But it can return the data as a PROMISE if you set
    * `usePromise` as true.
    * 
    * By Default, `usePromise` is disabled.
    ***************************************************************************/
    // usePromise: false,

    /***************************************************************************
    * When there are more incoming request parameters than listed in the
    * `req.validate` option, by default, it will return all incoming parameters
    * If you disable `returnAllParams` option, it will filter parameters and only
    * return the parameters that are listed in the `req.validate` validate option
    * 
    * By Default, `returnAllParams` is enabled.
    ***************************************************************************/
    // returnAllParams: true,

    /***************************************************************************
    * Error output format 
    * errMessage : ((string)) short explanation of a reason for the invalidation
    * invalidKeys : ((array))[string] list of invalid parameter key(s)
    * 
    * Output can be any format you want. The return value from `onErrorOutput` 
    * will be passed to the final error return.
    ***************************************************************************/
    // onErrorOutput: function (errMessage, invalidKeys) {
    //   return { message: errMessage, invalid: invalidKeys };
    // },

    /***************************************************************************
    * Required error message output
    * keys : ((string)) or ((array))[string] one or more list of invalid 
    *        parameter key(s)
    * 
    * [output] ((string)) 
    ***************************************************************************/
    // requiredErrorMessage: function(keys) {
    //   keys = keys || [];
    //   let isare = (keys.length > 1) ? 'are' : 'is';
    //   let s = (keys.length > 1) ? 's' : ''
    //   return `The "${keys.join('", "')}" parameter${s} ${isare} required.`;
    // },

    /***************************************************************************
    * req.validate validation format error message output
    * key : ((string)) invalid parameter key
    * 
    * [output] ((string)) 
    ***************************************************************************/
    // formatErrorMessage: function(key) {
    //   return `The "${key}" parameter has an invalid format.`;
    // },

    /***************************************************************************
    * Validation configuration format error message output
    * key : ((string)) invalid parameter key
    * typeMessage: ((string)) types[key].message from `validationTypes.js`
    * https://github.com/JohnKimDev/sails-hook-req-validate/blob/master/lib/validationTypes.js
    * 
    * [output] ((string)) 
    ***************************************************************************/
    // typeErrorMessage: function(key, typeMessage) {
    //   let a = (typeMessage && typeMessage.length) ? /[aeiouAEIOU]/.test(typeMessage.charAt(0)) ? 'an' : 'a' : '';
    //   return `The "${key}" parameter should be ${a} ${typeMessage}.`;
    // },

    /***************************************************************************
    * Incoming request parameter invalid error message output
    * key : ((string)) invalid parameter key
    * typeMessage: ((string)) types[key].message from `validationTypes.js`
    * https://github.com/JohnKimDev/sails-hook-req-validate/blob/master/lib/validationTypes.js
    * 
    * [output] ((string)) 
    ***************************************************************************/
    // inputErrorMessage: function(key, typeMessage) {
    //   let a = (typeMessage && typeMessage.length) ? /[aeiouAEIOU]/.test(typeMessage.charAt(0)) ? 'an' : 'a' : '';
    //   return `The "${key}" parameter has an invalid input type` + (typeMessage ? `, it should be ${a} ${typeMessage}` : '') + '.';
    // },

    /***************************************************************************
    * Incoming request parameter invalid error message output of OR validation
    * example: 'string|number`
    * orKey : ((string)) invalid parameter key
    * orTypeMessages: ((string)) combined types[key].message from `validationTypes.js`
    * https://github.com/JohnKimDev/sails-hook-req-validate/blob/master/lib/validationTypes.js
    * 
    * [output] ((string)) 
    ***************************************************************************/
    // orInputErrorMessage: function(orKey, orTypeMessages) {
    //   return `Invalid input type, it should be one of the following types; ${orTypeMessages}.`;
    // }
};