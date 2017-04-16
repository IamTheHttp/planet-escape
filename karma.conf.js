// Set node environment to testing
process.env.NODE_ENV = 'test';
var webpackCfg = require('reusable-webpack-config/webpack/config/test');

// var preProPath = process.cwd() +'karmaTests/loadtests.js';
// var coverageDir = process.cwd() + 'karmaCoverage';

module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: [ 'Chrome' ],
    files: [
      '__karma__/runner.js'
    ],
    port: 8000,
    captureTimeout: 5000,
    frameworks: [ 'mocha', 'chai' ],
    client: {
      mocha: {}
    },
    singleRun: true,
    reporters: [ 'mocha', 'coverage' ],
    preprocessors: {
      '__karma__/runner.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'karmaCoverage',
      reporters: [
        { type: 'html' },
        { type: 'text' }
      ]
    }
  });
};
