const getDirectories = require("./getDirectories"),
  getSocials = require("./getSocials"),
  seo = require("./seo"),
  errorHandler = require("./errorHandler"),
  markdown = require("./markdown"),
  basicAuth = require("./basicAuth"),
  servFile = require("./servFile"),
  checkFileExt = require("./checkFileExt"),
  forceHttps = require("./forceHttps"),
  winston = require("./winston"),
  build = require("./build");

module.exports = {
  getDirectories,
  getSocials,
  seo,
  errorHandler,
  basicAuth,
  markdown,
  checkFileExt,
  servFile,
  forceHttps,
  winston,
  build
};
