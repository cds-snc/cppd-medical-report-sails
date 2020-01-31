/**
 * StartController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function (req, res) {
    /**
     * If there is an applicationCode in the session, clear it
     */
    if (req.session.applicationCode) {
      req.session.applicationCode = null;
    }
    res.view('pages/start');
  }
};
