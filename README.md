DO NOT MERGE

# sails-starter-2

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Fri Dec 06 2019 10:34:22 GMT-0500 (Eastern Standard Time) using Sails v1.2.3.

<!-- Internally, Sails used [`sails-generate@1.16.13`](https://github.com/balderdashy/sails-generate/tree/v1.16.13/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->


<!-- TODO CLEANUP README LATER, BUT INCLUDE THE BELOW SOMEWHERE -->
## Docker

These instructions are optimized for development at the moment, rather than production runs.

### Build

1. Navigate into a cloned copy of this repo
1. `docker build -t cdssnc/cppd-medical-report-sails .`

### Run

1. `docker run -it --rm -p 1337:1337 cdssnc/cppd-medical-report-sails`
