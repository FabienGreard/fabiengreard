const checkFileExt = require('../../utils/checkFileExt'),
  path = require('path');

describe('checkFileExt', () => {
  it('Should return true (file exist)', () => {
    expect(checkFileExt(path.join(__dirname, 'checkFileExt.test.js'))).toBe(
      true
    );
  });
  it('Should return false', () => {
    expect(checkFileExt(path.join(__dirname, 'views/not-match.pug'))).toBe(
      false
    );
  });
});
