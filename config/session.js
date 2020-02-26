/**
 * Session Configuration
 * (sails.config.session)
 *
 * Use the settings below to configure session integration in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/session
 */

const featureFlags = require('../api/utils/FeatureFlags');
function generateTls()  {
  if (featureFlags.isEnabled('FEATURE_REDIS_SSL')) {
    return { };
  }
  return undefined;
}

module.exports.session = {

  /***************************************************************************
  *                                                                          *
  * Session secret is automatically generated when your new app is created   *
  * Replace at your own risk in production-- you will invalidate the cookies *
  * of your users, forcing them to log in again.                             *
  *                                                                          *
  ***************************************************************************/
  secret: '75ecc460b1d5d821b1549f98641fac3d',

  /**
   * Set the Sesssion Adapter using the env variable (defaults to null|memory)
   */
  adapter: process.env.SESSION_ADAPTER || null,

  url: process.env.REDIS_URL || process.env.SESSION_ADAPTER_URL || 'redis://localhost:6379',
  
  /**
     * @todo remove the feature flags and move the tls options into production.js
     */
  tls: generateTls(),
  //increase timeout for Azure Cache for Redis
  // eslint-disable-next-line camelcase
  connect_timeout: 20000,
  /***************************************************************************
  *                                                                          *
  * Customize when built-in session support will be skipped.                 *
  *                                                                          *
  * (Useful for performance tuning; particularly to avoid wasting cycles on  *
  * session management when responding to simple requests for static assets, *
  * like images or stylesheets.)                                             *
  *                                                                          *
  * https://sailsjs.com/config/session                                       *
  *                                                                          *
  ***************************************************************************/
  // isSessionDisabled: function (req){
  //   return !!req.path.match(req._sails.LOOKS_LIKE_ASSET_RX);
  // },

};
