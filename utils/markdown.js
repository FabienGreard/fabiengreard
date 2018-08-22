const marked = require('marked'),
  fs = require('fs');

module.exports = markdown = (dir, filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(dir + '/' + `${filename}`, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(marked(data).trim());
    });
  });
};
