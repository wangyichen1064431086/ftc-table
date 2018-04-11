// Karma configuration
// Generated on Wed Mar 07 2018 18:18:45 GMT+0800 (中国标准时间)
//测试相关包:karma,karma-mocha,karma-webpack,webpack,babel-core,babel-loader,babel-preset-es2015,expect.js
const webpackConfig = require('./webpack.conf.test.js');
module.exports = function(config) {
  let configuration = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
       'test/test.js',
      //{pattern: 'src/js/**/*.js', included: false}
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors:{
      ['test/test.js']:['webpack']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,//如果为false,那么测试将会一直挂起

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    webpackMiddleware: {
      noInfo: true
    },
    webpackServer: {
      noInfo: true
    },
   
    webpack:webpackConfig
  };

  if(process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
    configuration.singleRun = false;
  }
  config.set(configuration);

}
