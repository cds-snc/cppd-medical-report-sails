module.exports = async function (req, res, next) {
  if (!req.session.loggedIn) {
    return res.redirect(sails.route('login'));
  }

  return next();
};
