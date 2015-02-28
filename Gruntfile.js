module.exports = function(grunt) {

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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-yuidoc');

    // Default task(s).
    grunt.registerTask('default', ['yuidoc']);

};