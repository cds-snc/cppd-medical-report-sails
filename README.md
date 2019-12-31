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

### This App Only

#### Build

1. Navigate into a cloned copy of this repo
1. `docker build -t cdssnc/cppd-medical-report-sails .`

#### Run

1. `docker run -it --rm -p 1337:1337 cdssnc/cppd-medical-report-sails`

## Dev Container + Database (Docker Compose)

This maps your local files into a Docker container and spins up a PostgreSQL database. This app runs on port `1337` and the database at port `5432` and username `postgres`, both are accessible at `localhost`.

### Run

1. Launch the application `docker compose up`
1. Setup the database: `npm run db:init`

When you want to stop both, you can hit `CTRL` + `D` in the terminal that launched it.

## How to Add a New Route with a View and a Schema

1. Add a new view
    1. Copy `views/pages/PersonalController.js` and change the name appropriately
    1. Remove everything inside the `content` block
1. Add a new schema
    1. Copy `api/schemas/personal.schema.js` and change the name appropriately
    1. Remove all fields, but keep the `module.exports`
1. Add a new controller
    1. Copy `api/controllers/PersonalController.js` and change the name appropriately
    1. For the `index` function, remove business logic, but keep `res.view` and point it to the new view
    1. For the `store` function, remove business logic, but keep the validation and redirect parts. For the validation part, redirect it to the new schema
1. Add a new route
    1. Go to `/config/routes.js`
    1. Copy the `GET` and `POST` from Personal routes
    1. Change the values to correspond to your newly created files
1. In your newly created view, add `<p>Hello Canada</p>` to the `content` block
1. Start the server (`npm run dev`) and see if you can get to your new route's index