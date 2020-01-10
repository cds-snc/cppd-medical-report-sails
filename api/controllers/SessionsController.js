/**
 * SessionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fs = require('fs');
const path = require('path');

module.exports = {
  index: function (req, res) {

    let directory = path.resolve(__dirname, '../../sessions');
    console.log(directory);

    fs.readdir(directory, (err, files) => {
      if (!err) {
        console.log(files);
        res.view('pages/sessions', {
          files: files
        });
      }
    });
  },

  download: function (req, res) {

  }
};

