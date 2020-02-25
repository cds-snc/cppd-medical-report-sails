const path = require('path');
const fs = require('fs');
const features = require('./FeatureFlags');

const SkipperDisk = require('skipper-disk');
const SkipperAzure = require('skipper-azure');

streamFile = (document, res) => {
  if (features.isEnabled('FEATURE_AZ_STORAGE')) {
    streamFileFromAz(document, res);
  } else {
    streamFileFromLocal(document, res);
  }
};

deleteFile = (document) => {
  if (features.isEnabled('FEATURE_AZ_STORAGE')) {
    deleteFileFromAz(document);
  } else {
    deleteFileFromLocal(document);
  }
};

streamFileFromLocal = (document, res) => {
  const localFileAdapter = SkipperDisk();

  const filePath = path.join(process.cwd(), '.tmp/uploads', document.fileName);

  if (!fs.existsSync(filePath)) {
    return res.notFound();
  }

  localFileAdapter.read(filePath, (err, data) => {
    if (err) { console.log(err); }
    res.set('Content-disposition', 'attachment; filename=' + document.originalFileName);
    res.write(data, 'binary');
    res.end();
  });
};

streamFileFromAz = (document, res) => {
  const azFileAdapter = SkipperAzure({
    container: process.env.AZURE_STORAGE_CONTAINER
  });

  azFileAdapter.read(document.fileName, (err, data) => {
    if (err) { console.log(err); }
    res.set('Content-disposition', 'attachment; filename=' + document.originalFileName);
    res.write(data, 'binary');
    res.end();
  });
};

deleteFileFromLocal = async (document) => {
  const filePath = path.join(process.cwd(), '.tmp/uploads', document.fileName);

  // can maybe swap this out for localFileAdapter.rm()
  fs.unlink(filePath, async (err) => {
    if (err) { return console.log(err); }
    return;
  });
};

deleteFileFromAz = (document) => {
  const azFileAdapter = SkipperAzure({
    container: process.env.AZURE_STORAGE_CONTAINER
  });

  azFileAdapter.rm(document.fileName, (err) => {
    if (err) { console.log(err); }
    return;
  });
};

module.exports = {
  deleteFile,
  streamFile,
};
