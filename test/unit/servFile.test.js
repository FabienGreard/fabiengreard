const servFile = require('../../utils/servFile'),
  config = require('../../config/main'),
  request = require('supertest'),
  express = require('express'),
  path = require('path');

describe('servfile', () => {
  let app;
  beforeEach(() => {
    app = express();
  });
  it('Should serv a static folder', done => {
    servFile(app, [{ name: 'public' }]);
    request(app)
      .get(`/style.css`)
      .expect(200)
      .end(err => {
        if (err) throw done(err);
        done();
      });
  });
  it('Should serv a private folder', done => {
    servFile(app, [{ name: 'html', url: '/html' }], {
      baseDir: '../routes/',
      isProtected: true,
      exts: ['html', 'md', 'pug']
    });
    request(app)
      .get(`/html/`)
      .set({
        Authorization:
          'Basic ' +
          new Buffer.from(config.username + ':' + config.password).toString(
            'base64'
          )
      })
      .expect(200)
      .end(err => {
        if (err) throw done(err);
        done();
      });
  });
  it('Should serv a public folder', done => {
    servFile(app, [{ name: 'html', url: '/html' }], {
      baseDir: '../routes/',
      exts: ['html', 'md', 'pug']
    });
    request(app)
      .get(`/html/`)
      .expect(200)
      .end(err => {
        if (err) throw done(err);
        done();
      });
  });
  it('Should serv a markdown file', done => {
    servFile(app, [{ name: 'md', url: '/md' }], {
      baseDir: '../routes/',
      exts: ['html', 'md', 'pug']
    });
    request(app)
      .get(`/md/`)
      .expect(200)
      .end(err => {
        if (err) throw done(err);
        done();
      });
  });
  it('Should serv a pug file', done => {
    app.set('views', [path.join(__dirname, '../../routes')]);
    app.set('view engine', 'pug');

    servFile(app, [{ name: 'pug', url: '/pug' }], {
      baseDir: '../routes/',
      exts: ['html', 'md', 'pug']
    });
    request(app)
      .get(`/pug/`)
      .expect(200)
      .end(err => {
        if (err) throw done(err);
        done();
      });
  });
});
