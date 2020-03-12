module.exports = async function (req, res, next) {
  if (!req.session.loggedIn) {
    return res.redirect(sails.route('login'));
  }

  if (!req.session.user.isAdmin) {
    return res.redirect(sails.route('reports'));
  }

  return next();
};
