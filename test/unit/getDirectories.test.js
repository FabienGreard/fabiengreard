const getDirectories = require('../../utils/getDirectories'),
  path = require('path');

describe('getDirectories', () => {
  it('Should return an array of directory', () => {
    const directories = getDirectories('public')[Symbol.iterator]();
    expect(directories.next().done).toBe(false);
  });
  it('Should not find any directory', () => {
    const directories = getDirectories('this-should-never-match')[
      Symbol.iterator
    ]();
    expect(directories.next()).toEqual({ done: true });
  });
});
