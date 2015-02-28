/*jslint browser: true, bitwise: true, nomen: true, todo: true, vars: true, indent: 4 */
/*global require */
(function() {
    'use strict';

    var allTestFiles = [];
    var TEST_REGEXP = /^.+\/spec\/(?!test-main).+\.js$/i;

    var pathToModule = function(path) {
        return path.replace(/^\/base\/js\//, '').replace(/\.js$/, '');
    };

    Object.keys(window.__karma__.files).forEach(function(file) {
        if (TEST_REGEXP.test(file)) {
            // Normalize paths to RequireJS module names.
            allTestFiles.push(pathToModule(file));
        }
    });

    require.config({
        // Karma serves files under /base, which is the basePath from your config file
        baseUrl: 'base/js/src',

        paths: {
            spec: '../spec'
        },

        // dynamically load all test files
        deps: allTestFiles,
        /*deps: [
            "spec/common/In"
        ],*/

        // we have to kickoff jasmine, as it is asynchronous
        callback: window.__karma__.start
    });
})();