const errorHandler = require('../../utils/errorHandler');

describe('errorHandler', () => {
  const req = {
    params: {},
    body: {}
  };

  const res = {
    data: null,
    code: null,
    locals: {},
    status(status) {
      this.code = status;
      return this;
    },
    render(payload) {
      this.data = payload;
    }
  };

  const next = jest.fn();

  test('Should handle error', () => {
    errorHandler(new Error(), req, res, next);

    expect(res.code).toBeDefined();
    expect(res.code).toBe(500);

    expect(res.data).toBeDefined();
    expect(res.data).toBe('error');
  });
});
