const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();
const path = require('path');

exports.dataUri = (file) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);
