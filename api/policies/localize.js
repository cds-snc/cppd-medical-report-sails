module.exports = function (req, res, next) {
  const locales = sails.config.i18n.locales
  if (req.options.lang) {
    if (locales.includes(req.options.lang)) {
      req.setLocale(req.options.lang);
      return next();
    }
  }
  next();
};
