module.exports = {
  rootDir: '../',
  testEnvironment: 'node',
  verbose: true, // report individual test
  bail: true, // enable to stop test when an error occur,
  testMatch: ['**/test/**/*.test.js?(x)'],
  testPathIgnorePatterns: ['node_modules/'],
  collectCoverageFrom: ['!**/**/index.js', 'utils/*.js', 'server.js'],
  coverageThreshold: {
    // coverage strategy
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10
    }
  }
};
