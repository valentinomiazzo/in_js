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
        update_json: {
            // set some task-level options
            options: {
                src: 'package.json',
                indent: "  "
            },
            // update bower.json with data from package.json
            bower: {
                dest: 'bower.json',     // where to write to
                // the fields to update, as a String Grouping
                fields: {
                    'name'          : null,
                    'version'       : null,
                    'description'   : null,
                    'author'        : null,
                    'main'          : null,
                    'private'       : null,
                    'license'       : null
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
    grunt.registerTask('default', ['update_json', 'yuidoc', 'karma']);

};