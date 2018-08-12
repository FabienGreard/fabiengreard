const request = require('supertest'),
  app = require('../../server.js');

describe('integration', () => {
  it('Should render index', done => {
    request(app)
      .get(`/`)
      .expect(200)
      .end(err => {
        if (err) throw err;
        done();
      });
  });
  it('Should throw a 404', done => {
    request(app)
      .get(`/not-found`)
      .expect(404)
      .end(err => {
        if (err) throw err;
        done();
      });
  });
});
