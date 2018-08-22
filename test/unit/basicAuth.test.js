const basicAuth = require('../../utils/basicAuth'),
  config = require('../../config/main');

describe('basicAuth', () => {
  let req, res, next;
  beforeEach(() => {
    req = {
      headers: {},
      baseUrl: 'http://localhost/'
    };

    res = {
      locals: {},
      set(key, value) {
        this.locals = { ...this.locals, [key]: value };
      }
    };

    next = jest.fn();
  });

  test('Should set a WWW-Authenticate', () => {
    basicAuth(req, res, next);

    expect(res.locals).toEqual({
      'WWW-Authenticate': 'Basic realm=http://localhost/'
    });
  });

  test('Should return an empty object', () => {
    req.headers = {
      authorization:
        'Basic ' +
        new Buffer.from(config.username + ':' + config.password).toString(
          'base64'
        )
    };

    basicAuth(req, res, next);

    expect(res.locals).toEqual({});
  });
});
