streamFileFromLocal = (document, res) => {
  const filePath = path.join(process.cwd(), '.tmp/uploads', document.fileName);

  if (!fs.existsSync(filePath)) {
    return res.notFound();
  }

  const SkipperDisk = require('skipper-disk');
  const fileAdapter = SkipperDisk();

  fileAdapter.read(filePath).pipe(res);
};

streamFileFromAz = (document, res) => {
  const SkipperAzure = require('skipper-azure');

  const fileAdapter = SkipperAzure({
    container: process.env.AZURE_STORAGE_CONTAINER
  });

  fileAdapter.read(document.fileName, (d, data) => {
    res.set('Content-disposition', 'attachment; filename=' + document.originalFileName);
    res.write(data, 'binary');
    res.end();
  });
};

module.exports = {
  streamFileFromAz,
  streamFileFromLocal
};
