/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  index: function (req, res) {
    // already authenticated, come on in!
    if (req.session.user && req.session.user !== null) {
      return res.redirect(sails.route('sessions'));
    }

    res.view('pages/login');
  },

  login: async function (req, res) {

    let valid = req.validate(req, res, {
      email: {
        presence: {
          allowEmpty: false,
          message: '^Email is required'
        },
      },
      password: {
        presence: {
          allowEmpty: false,
          message: '^Password is required'
        },
      }
    });

    if (valid) {
      const email = req.body.email;
      const password = req.body.password;

      /**
      * We check that the user exists first because
      * password comparisons are expensive
      */
      let user = await User.findOne({
        where: {
          email: email
        }
      });

      if (!user) {
        req.flash('error', 'Invalid login'); // user doesn't exist
        return res.redirect('back');
      }

      // ok we have a user, check the password
      user.checkPassword(password, (err, valid) => {
        if (err) { // some mysterious error
          req.flash('error', err);
          return res.redirect('back');
        }

        if (!valid) { // wrong password
          req.flash('error', 'Invalid login');
          return res.redirect('back');
        }

        // we're good set session vars and redirect
        req.session.loggedIn = true;
        req.session.user = user;

        if (user.isAdmin) {
          return res.redirect(sails.route('users'));
        }

        return res.redirect(sails.route('sessions'));
      });
    }
  },

  logout: function (req, res) {
    req.session.destroy();
    return res.redirect(sails.route('login'));
  }
};

