const getDirectories = require('../../utils/getDirectories'),
  request = require('supertest'),
  app = require('../../server.js');

describe('Public', () => {
  it('Should render public file', done => {
    request(app)
      .get(`/style.css`)
      .expect(200)
      .end(err => {
        if (err) throw done(err);
        done();
      });
  });
});
