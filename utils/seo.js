const getDirectories = require('./getDirectories'),
  config = require('../config/main'),
  path = require('path'),
  fs = require('fs');

const writeFile = (file, filename) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, `../public/${filename}`), file, err => {
      if (err) reject(err);
      else resolve(`${filename} has been saved`);
    });
  });
};

const genRobots = async (dir, filename) => {
  let file = `User-agent: * \nAllow: /\n`;
  for (const directory of getDirectories(dir)) {
    file += `Disallow: ${directory.url}\n`;
  }

  return await writeFile(file, filename);
};

const genSitemap = async (dir, filename) => {
  const protocole = config.protocole;
  let file =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `<url>\n` +
    `<loc>${protocole}://${config.host}/</loc>\n` +
    `<priority>1.00</priority>\n` +
    `</url>\n`;

  for (const directory of getDirectories(dir)) {
    file +=
      `<url>\n` +
      `<loc>${protocole}://${config.host}${directory.url}</loc>\n` +
      `<priority>0.80</priority>\n` +
      `</url>\n`;
  }

  file += `</urlset> `;

  return await writeFile(file, filename);
};

module.exports = { genSitemap, genRobots };
