let _ = require('@sailshq/lodash')
let detectVerb = require('./lib/detect-verb')

/*
 * This code/concept was adapted from: https://github.com/Melchyore/sails-hook-route
 * The route helper code from that original implementation has been moved out to the 
 * route.js policy/middleware.
 */

module.exports = sails => {
    return {
        configure() {
            let routes = sails.config.routes
            let router = sails.router
            router.namedRoutes = {}
            sails.log.info('Configuring i18n Routes');

            _.forIn(routes, (options, route) => {
                if (_.isObject(options) && _.has(options, 'name')) {
                    let name = options.name
                    let verb = detectVerb(route.toLowerCase()).verb
                    let url = detectVerb(route.toLowerCase()).path
                    let i18nRoutes = options.i18n
                    let defaultLang = options.lang

                    // pull out the i18n routes and add to global routes object
                    _.forIn(i18nRoutes, (path, lang) => {
                        let i18nRoute = {}
                        // no need to add the default(base) route
                        if (lang !== defaultLang) {
                            i18nRoute[verb.toUpperCase() + ' ' + path] = {
                                name: options.name,
                                controller: options.controller,
                                action: options.action,
                                lang: lang,
                                i18n: i18nRoutes
                            }
                            _.assign(sails.config.routes, i18nRoute)
                        }
                    })

                    // create a name-indexed list of routes for easy lookup
                    // namedRoutes only contains the base set of routes to avoid
                    // name collisions (ie, exclude the i18n extended routes above)
                    if (!_.has(router.namedRoutes, name)) {
                        router.namedRoutes[options.name] = i18nRoutes
                    }
                }
            })
        },

        // probably don't need this anymore
        initialize(done) {
            sails.log.info("Initializing custom hook (`routes`)")

            sails.route = (routeName, params = {}) => {
                let lang = sails.hooks.i18n.getLocale();

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

            sails.on('router:before', () => {
                sails.router.bind('all /*', (req, res, next) => {
                    res.locals.route = sails.route

                    return next()
                })
            })

            return done()
        }
    }
}