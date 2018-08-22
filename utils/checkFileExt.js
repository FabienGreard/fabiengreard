const fs = require('fs');

module.exports = checkFileExt = file => {
  try {
    fs.accessSync(file);
    return true;
  } catch (e) {
    return false;
  }
};
