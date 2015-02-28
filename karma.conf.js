module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      'js/spec/test-main.js', //This is listed first so it is not excluded
      { pattern: 'js/src/**/*.js', included: false},
      { pattern: 'js/spec/**/*.js', included: false },
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // I'm excluding ext folders because they contain 3rd party code.
    preprocessors: {
      'js/src/**/!(ext)/*.js': ['coverage'],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'progress',
      'html',
      'coverage',
      //'nyan'
    ],

    coverageReporter: {
      type : 'html',
      dir : 'build/coverage/'
    },

    htmlReporter: {
      outputDir: 'build/tests',
      templatePath: 'node_modules/karma-html-reporter/jasmine_template.html'
    },

    // web server port
    port: 8888,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome' , 'Firefox', /*'PhantomJS', 'IE'*/],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

  });

};
