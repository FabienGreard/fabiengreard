const getDirectories = require('../../utils/getDirectories'),
  path = require('path');

describe('getDirectories', () => {
  test('Should return an array of directory', () => {
    const directories = getDirectories('public')[Symbol.iterator]();
    expect(directories.next().done).toBe(false);
  });
  test('Should not find any directory', () => {
    const directories = getDirectories('this-should-never-match')[
      Symbol.iterator
    ]();
    expect(directories.next()).toEqual({ done: true });
  });
});
