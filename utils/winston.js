const winston = require('winston'),
  path = require('path');

const logger = winston.createLogger({
  format: winston.format.printf(
    info => `${info.level} - ${info.message.slice(0, -1)}`
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/combined.log'),
      level: 'info'
    })
  ]
});

logger.add(new winston.transports.Console({ level: 'error' }));

logger.stream = {
  write: message => {
    logger.info(message);
  }
};
module.exports = logger;
