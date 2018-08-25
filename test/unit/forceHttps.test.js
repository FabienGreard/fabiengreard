const forceHttps = require('../../utils/forceHttps');

describe('forceHttps', () => {
  const req = {
    url: '',
    secure: false,
    headers: {
      host: ''
    }
  };

  const res = {
    urlRedirect: '',
    redirect(url) {
      this.urlRedirect = url;
    }
  };

  const next = jest.fn();

  it('Should redirect to https', () => {
    forceHttps(req, res, next, true);

    expect(res.urlRedirect).toBeDefined();
    expect(res.urlRedirect).toEqual('https://');
  });
});
