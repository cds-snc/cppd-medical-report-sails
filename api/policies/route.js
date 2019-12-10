module.exports = function (req, res, next) {
    const locales = sails.config.i18n.locales;

    sails.route = (routeName, params = {}) => {
        let lang = req.getLocale();

        // use optional lang param if passed
        if (_.has(params, 'lang')) {
            lang = params.lang;
        }

        // get i18n routes
        const routes = sails.router.namedRoutes[routeName]

        if (!routes) {
            throw new Error('No named route : ' + routeName + '\n Maybe you missed the name property?')
        }

        // get localized route
        let route = routes[lang]

        if (!route) {
            throw new Error('No named route : ' + routeName + '\n in that language. Maybe you mistyped the lang property?')
        }

        // map any passed-in params to placeholders in the route path
        if (!_.isEmpty(params)) {
            Object.keys(params).forEach((key, index) => {
                route = route.replace(':' + key, params[key])
            })
        }

        return route
    }

    res.locals.route = sails.route
    next();
};
