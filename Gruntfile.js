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
              specs: ["spec/suites/all.js"]
            , vendor: "vendor/jquery/**/*.js"
            , helper: "spec/fixtures/**/*"
          }
        }
      , zepto: {
          src: "lib/**/*.js"
        , options: {
            specs: ["spec/suites/all.js"]
          , vendor: "vendor/zepto/**/*.js"
          , helper: "spec/fixtures/**/*"
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-jasmine')

  grunt.registerTask('test', ['jshint', 'jasmine:jquery'])
  grunt.registerTask('default', ['test'])
};
