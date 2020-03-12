// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
require('./commands');

const { A11yReporter } = require ('@cdssnc/a11y-tracker-client');

// default to not reporting
A11yReporter.configure({
  trackerURI: undefined,
  revision: '<local>',
  project: 'cppd-medical-report-sails',
});

// if we're in CI and on the master branch, do the actual reporting
if (Cypress.env['testing'] && Cypress.env['GITHUB_REF'] === 'refs/heads/master') {
  A11yReporter.configure({
    trackerURI: Cypress.env('A11Y_TRACKER_URI') || 'https://a11y-tracker.herokuapp.com/',
    revision: Cypress.env('GITHUB_GIT_HASH'),
    key: Cypress.env('A11Y_TRACKER_KEY'),
    project: 'cppd-medical-report-sails',
  });
}

A11yReporter.setupCypress();

// Alternatively you can use CommonJS syntax:
// require('./commands')
