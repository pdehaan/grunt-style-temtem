/*
 * grunt-style-temtem
 * https://github.com/orangemittoo/grunt-style-temtem
 *
 * Copyright (c) 2013 orangemittoo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    style_temtem: {
      default : {
        files: [
          {
            css : 'test/fixtures/test.scss',
            temp : 'test/fixtures/temp.html',
            result : 'test/fixtures/result.html'
          }          
        ],
        options : {}
      },
      other1 : {
        files: [
          {
            css : 'test/fixtures/test.scss',
            temp : 'test/fixtures/temp.html',
            result : 'test/fixtures/result.html'
          }
          
        ],
        options : {
          preprocessor : 'less'
        }
      }
      
      // custom_options: {
      //   options: {
      //     separator: ': ',
      //     punctuation: ' !!!',
      //   },
      //   files: {
      //     'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123'],
      //   },
      // },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'style_temtem', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
