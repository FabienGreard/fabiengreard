const getDirectories = require('./getDirectories'),
  seo = require('./seo'),
  errorHandler = require('./errorHandler'),
  markdown = require('./markdown'),
  basicAuth = require('./basicAuth'),
  servFile = require('./servFile'),
  checkFileExt = require('./checkFileExt');
winston = require('./winston');

module.exports = {
  getDirectories,
  seo,
  errorHandler,
  basicAuth,
  markdown,
  checkFileExt,
  servFile,
  winston
};
