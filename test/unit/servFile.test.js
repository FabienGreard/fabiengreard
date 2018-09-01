const servFile = require('../../utils/servFile'),
  config = require('../../config/main'),
  request = require('supertest'),
  express = require('express'),
  fs = require('fs'),
  path = require('path');

const writeFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) reject(err);
      else resolve(path);
    });
  });
};

const deleteFile = path => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, err => {
      if (err) reject(err);
      else resolve(path);
    });
  });
};

const writeDir = path => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, err => {
      if (err) reject(err);
      else resolve(path);
    });
  });
};

const deleteDir = path => {
  return new Promise((resolve, reject) => {
    fs.rmdir(path, err => {
      if (err) reject(err);
      else resolve(path);
    });
  });
};

describe('servfile', () => {
  let app;
  beforeEach(() => {
    app = express();
  });
  beforeAll(async () => {
    if (!fs.existsSync(`./routes`)) await writeDir(`./routes`);
    for (const path of [
      { dir: 'generateHTML', file: 'index.html' },
      { dir: 'generateMD', file: 'index.md' },
      { dir: 'generatePUG', file: 'index.pug' }
    ]) {
      await writeDir(`./routes/${path.dir}`);
      await writeFile(`./routes/${path.dir}/${path.file}`, 'generate-auto');
    }
  });
  afterAll(async () => {
    for (const path of [
      { dir: 'generateHTML', file: 'index.html' },
      { dir: 'generateMD', file: 'index.md' },
      { dir: 'generatePUG', file: 'index.pug' }
    ]) {
      await deleteFile(`./routes/${path.dir}/${path.file}`);
      await deleteDir(`./routes/${path.dir}`);
    }
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
    servFile(app, [{ name: 'generateHTML', url: '/html' }], {
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
    servFile(app, [{ name: 'generateHTML', url: '/html' }], {
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
    servFile(app, [{ name: 'generateMD', url: '/md' }], {
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

    servFile(app, [{ name: 'generatePUG', url: '/pug' }], {
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
