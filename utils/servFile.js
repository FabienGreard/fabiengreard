const express = require('express'),
  path = require('path'),
  markdown = require('./markdown'),
  basicAuth = require('./basicAuth'),
  checkFileExt = require('./checkFileExt');

module.exports = servFile = (app, directories, options = {}) => {
  const { exts = null, isProtected = false, baseDir = '../' } = options;
  const _baseDir = `/${baseDir}`;
  for (const directory of directories) {
    const useUrl =
      `${directory.url}` !== 'undefined' ? `${directory.url}` : '/';

    if (isProtected) {
      //protected directory
      app.use(`${useUrl}`, [
        basicAuth,
        express.static(path.join(__dirname, `${_baseDir}${directory.name}`))
      ]);
    } else {
      //public directory
      app.use(
        `${useUrl}`,
        express.static(path.join(__dirname, `${_baseDir}${directory.name}`))
      );
    }

    if (exts) {
      for (const ext of exts) {
        //check if file extension matched
        const isExt = checkFileExt(
          path.join(__dirname, `${_baseDir}${directory.name}/index.${ext}`)
        );
        if (isExt) {
          //Check if it is a markdown or pug file
          app.get(`${directory.url}`, async (req, res, next) => {
            ext === 'md'
              ? res.send(
                  await markdown(
                    path.join(__dirname, `${_baseDir}/${req.url}`),
                    'index.md'
                  )
                )
              : res
                  .location(`${directory.url}`)
                  .render(`${directory.name}/index`);
          });
        }
      }
    }
  }
};
