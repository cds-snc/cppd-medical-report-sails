/**
 * `tasks/register/compileAssets.js`
 *
 * ---------------------------------------------------------------
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/tasks/register/compile-assets.js
 *
 */
module.exports = function(grunt) {
  grunt.registerTask('compileAssets', [
    'clean:dev',
    'sass:dev',
    'copy:dev',
  ]);
};
