config = require('../config/main');

module.exports = (req, res, next, force = false) => {
  // redirect http request to https
  (config.protocole === 'https' || force) &&
    !req.secure &&
    res.redirect('https://' + req.headers.host + req.url);

  next();
};
