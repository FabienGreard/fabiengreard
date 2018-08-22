const winston = require('../../utils/winston');

describe('Winston', () => {
  test('Should log info', done => {
    try {
      winston.info('This is an info');
    } catch (e) {
      if (e) return done(e);
    }
    done();
  });
  test('Should log error', done => {
    try {
      winston.error('This is an error');
    } catch (e) {
      if (e) return done(e);
    }
    done();
  });
  test('Should stream a message', done => {
    try {
      winston.stream.write('this is a stream message');
    } catch (e) {
      if (e) return done(e);
    }
    done();
  });
});
