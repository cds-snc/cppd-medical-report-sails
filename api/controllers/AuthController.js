/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');

module.exports = {

  index: function (req, res) {
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
    console.log(user);

    if (user) {
      user.checkPassword(password, (err, valid) => {
        if (err) { return res.send({ message: 'nope' }); }

        if (!valid) {
          return res.json(401, { err: 'Unauthorized' });
        }

        return res.redirect(sails.route('sessions'));
      });
    } else {
      return res.json(401, { err: 'Unauthorized' });
    }



    // passport.authenticate('local', { failureRedirect: '/en/login' });

    /* passport.authenticate('local', (err, user, info) => {
      if ((err) || (!user)) {
        console.log(err);
        console.log(info);
        return res.send({ message: info.message, user });
      }
      console.log("got here");
      console.log(user);

      req.logIn(user, (err) => {
        if (err) { res.send(err); }
        return res.redirect('/en/sessions');
      });
    })(req, res); */

    // res.send({ message: 'noop?' });

    // res.redirect('/en/sessions');

    /* passport.authenticate('local', (err, user, info) => {
      if ((err) || (!user)) {
        return res.send({
          message: info.message,
          user
        });
      }
      console.log(user);
      console.log(info);
    }); */
  },

  logout: function (req, res) {

  }
};

