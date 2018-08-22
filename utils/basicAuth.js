const getDirectories = require('./getDirectories'),
  config = require('../config/main');

module.exports = basicAuth = (req, res, next) => {
  // parse login and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = new Buffer.from(b64auth, 'base64')
    .toString()
    .split(':');

  if (
    !login ||
    !password ||
    login !== config.username ||
    password !== config.password
  ) {
    res.set('WWW-Authenticate', `Basic realm=${req.baseUrl}`);
    let err = new Error('Unauthorized');
    err.status = 401;
    next(err);
  }

  next();
};
