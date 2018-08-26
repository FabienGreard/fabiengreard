const markdown = require('../../utils/markdown'),
  fs = require('fs'),
  path = require('path');

describe('markdown', () => {
  const writeFile = (filename, file) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, `${filename}`), file, err => {
        if (err) reject(err);
        else resolve(`${filename} has been saved`);
      });
    });
  };

  const deleteFile = filename => {
    return new Promise((resolve, reject) => {
      fs.unlink(path.join(__dirname, `${filename}`), err => {
        if (err) reject(err);
        else resolve(`${filename} has been deleted`);
      });
    });
  };

  const checkFileExt = filename => {
    try {
      fs.accessSync(path.join(__dirname, `${filename}`));
      return true;
    } catch (e) {
      return false;
    }
  };

  afterEach(() => {
    if (checkFileExt('index.md')) {
      deleteFile('index.md');
    }
  });

  it('Should render markdown', async () => {
    await writeFile('index.md', '***markdown***');
    expect(await markdown(__dirname, 'index.md')).toBe(
      '<p><strong><em>markdown</em></strong></p>'
    );
  });
  it('Should return an error', async () => {
    try {
      await markdown(__dirname, 'do-not-exist.md');
    } catch (e) {
      expect(e.code).toEqual('ENOENT');
    }
  });
});
