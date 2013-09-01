/* jshint node: true */

module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json')

    , jshint: {
        all: [
            "Gruntfile.js"
          , "lib/**/*.js"
          , "spec/**/*.js"
        ]
      , options: {
          jshintrc: '.jshintrc'
        },
      }
    , jasmine: {
        jquery: {
            src: "lib/**/*.js"
          , options: {
              specs: "spec/**/*.js"
            , vendor: "vendor/jquery/*.js"
          }
        }
      , zepto: {
          src: "lib/**/*.js"
        , options: {
            specs: "spec/**/*.js"
          , vendor: "vendor/zepto/*.js"
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-jasmine')

  grunt.registerTask('test', ['jshint', 'jasmine:jquery'])
  grunt.registerTask('default', ['test'])
};
