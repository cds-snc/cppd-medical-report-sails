const webpack = require("webpack");
const { once } = require("lodash");

/**
 * webpack hook
 *
 * If production, build once, then trigger `done`.
 * If dev, build once, trigger `done`, then watch for changes to trigger rebuild.
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineWebpackHook(sails) {
  if (!sails.config.webpack) {
    sails.log.warn("sails-hook-webpack: No Webpack options have been defined.");
    return {};
  }

  if (!sails.config.webpack.config) {
    sails.log.warn(
      "sails-hook-webpack: Configure your config/webpack.js file."
    );
    return {};
  }

  return {
    /**
     * Runs when this Sails app loads/lifts.
     */
    initialize: async function(done) {
      sails.log.info("Initializing custom hook (`webpack`)");

      // TODO: don't run if its is a `sails run foofoofoo`?
      // TODO: don't watch for rebuilds if we're in test environment?
      const isSailsScriptEnv = () => global.isSailsScriptEnv;
      const isTestEnv = () => sails.config.port !== 1337;

      if (isSailsScriptEnv()) return void done();

      const compiler = webpack(sails.config.webpack.config);

      // on first compilation (due to either run or watch) if it fails,
      // it should throw, else it should call `done`
      const triggerDoneOnce = once((err, stats) => {
        if (err || stats.hasErrors()) {
          throw new Error("sails-hook-webpack failed");
        } else {
          return done();
        }
      });

      const compileCallback = (...args) => {
        logCompileInfo(...args);
        triggerDoneOnce(...args);
      };

      if (sails.config.environment === "production" || isTestEnv()) {
        compiler.run(compileCallback);
      } else {
        sails.log.info("sails-hook-webpack: Watching for changes...");
        compiler.watch(
          sails.config.webpack.config.watchOptions,
          compileCallback
        );
      }
    }
  };
};

function logCompileInfo(err, stats) {
  if (err) {
    sails.log.error("sails-hook-webpack: Build error: \n\n", err);
  }
  sails.log[stats.hasErrors() ? "error" : "info"](
    `sails-hook-webpack:\n${stats.toString({ colors: true, chunks: true })}`
  );
}
