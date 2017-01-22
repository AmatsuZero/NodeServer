/**
 * Created by 振华 on 2017/1/22.
 */
modules.exports = function (grunt) {
  //load plugins
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec',
    ].forEach(function (task) {
        grunt.loadNpmTasks(task);
    });

    //Config plugins
    grunt.initConfig({
        cafemocha:{
            all:{src:'qa/tests-*.js', options:{ui:'tdd'},}
        },
        jshint:{
            app:['index.js','public/js/**/*.js',
                    'lib/**/*.js'],
            qa: ['Gruntfile.js','public/qa/**/*.js','qa/**/*.js'],
        },
        exec:{
            linkchecker:
                {cmd:'linkchecker http://localhost:3000'}
        },
    });

    //register
    grunt.registerTask('default',['cafemocha','jshint','exec']);
};