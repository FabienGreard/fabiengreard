const getDirectories = require('../../utils/getDirectories'),
  request = require('supertest'),
  app = require('../../server.js');

describe('Routes', () => {
  it('Should render routes urls', done => {
    const directories = getDirectories('routes');
    for (const directory of directories) {
      request(app)
        .get(`${directory.url}`)
        .expect(301)
        .end(err => {
          if (err) throw done(err);
          done();
        });
    }
  });
});
