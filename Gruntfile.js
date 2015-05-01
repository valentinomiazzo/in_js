module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: 'js/src/',
                    //themedir: 'path/to/custom/theme/',
                    outdir: 'build/docs/'
                }
            }
        },
        karma: {
            unit: {
                configFile: "karma.conf.js",
                singleRun: true,
                browsers: ['PhantomJS']
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['yuidoc', 'karma']);

};