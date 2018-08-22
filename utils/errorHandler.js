const winston = require('./winston');

module.exports = errorHandler = (err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' && err;

  // render the error page
  res.status(err.status || 500);
  //logger error
  winston.error(
    `${err.status || 500} - ${err.message} - ` +
      `${req.originalUrl} - ${req.method} - ${req.ip}`
  );
  res.render('error');
};
