const checkFileExt = require('../../utils/checkFileExt'),
  path = require('path');

describe('checkFileExt', () => {
  test('Should return true (file exist)', () => {
    expect(checkFileExt(path.join(__dirname, 'checkFileExt.test.js'))).toBe(
      true
    );
  });
  test('Should return false', () => {
    expect(checkFileExt(path.join(__dirname, 'views/not-match.pug'))).toBe(
      false
    );
  });
});
