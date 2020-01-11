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

    fs.readdir(directory, (err, files) => {
      if (!err) {
        _.pull(files, '.gitignore');
        res.view('pages/sessions', {
          files: files
        });
      }
    });
  },

  download: function (req, res) {
    const filename = req.params.session;
    const sessionFile = path.resolve(__dirname, '../../sessions/' + filename);
    
    var SkipperDisk = require('skipper-disk');
    var fileAdapter = SkipperDisk(/* optional opts */);

    // set the filename to the same file as the user uploaded
    res.set('Content-disposition', 'attachment; filename=' + filename);

    // Stream the file down
    fileAdapter.read(sessionFile)
    .on('error', (err) => {
      return res.serverError(err);
    })
    .pipe(res);
  }
};

