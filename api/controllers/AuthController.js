/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  index: function (req, res) {
    // already logged in
    if (req.session.user && req.session.user !== null) {
      return res.redirect(sails.route('sessions'));
    }

    res.view('pages/login');
  },

  login: async function (req, res) {

    const email = req.body.email;
    const password = req.body.password;

    let user = await User.findOne({
      where: {
        email: email
      }
    });

    if (!user) {
      req.flash('error', 'User not found'); // user doesn't exist
      return res.redirect('back');
    }

    user.checkPassword(password, (err, valid) => {
      if (err) { // some mysterious error
        req.flash('error', 'Error message');
        return res.redirect('back');
      }

      if (!valid) { // wrong password
        req.flash('error', 'Invalid login');
        return res.redirect('back');
      }

      // we're good
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect(sails.route('sessions'));
    });
  },

  logout: function (req, res) {
    req.session.destroy();
    return res.redirect(sails.route('login'));
  }
};

