const getDirectories = require('../../utils/getDirectories'),
  request = require('supertest'),
  config = require('../../config/main'),
  fs = require('fs');

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

const delay = secondes =>
  new Promise(resolve => setTimeout(resolve, secondes * 1000));

describe('protected', () => {
  let app;
  beforeAll(async () => {
    for (const path of [{ dir: 'generateHTML', file: 'index.html' }]) {
      await writeDir(`./protected/${path.dir}`);
      await writeFile(`./protected/${path.dir}/${path.file}`, 'generate-auto');
    }

    app = require('../../server.js');
  });
  afterAll(async () => {
    for (const path of [{ dir: 'generateHTML', file: 'index.html' }]) {
      await deleteFile(`./protected/${path.dir}/${path.file}`);
      await deleteDir(`./protected/${path.dir}`);
    }
  });
  it('Should render protected urls without credentials', done => {
    const directories = getDirectories('protected');
    for (const directory of directories) {
      request(app)
        .get(`${directory.url}`)
        .expect(401)
        .end(err => {
          if (err) throw err;
          done();
        });
    }
  });
  it('Should render protected urls with credentials', done => {
    const directories = getDirectories('protected');
    for (const directory of directories) {
      request(app)
        .get(`${directory.url}`)
        .set({
          Authorization:
            'Basic ' +
            new Buffer.from(config.username + ':' + config.password).toString(
              'base64'
            )
        })
        .expect(301)
        .end(err => {
          if (err) throw err;
          done();
        });
    }
  });
});
