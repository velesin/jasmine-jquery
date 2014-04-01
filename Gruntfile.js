/* jshint node: true */

module.exports = function(grunt) {
  "use strict";

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks("grunt-contrib-concat");

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: "/*!\n<%= pkg.name %>\n" +
          "version: <%= pkg.version %>\n" +
          "build date: <%= grunt.template.today(\"yyyy-mm-dd\") %>\n\n" +
          "description: <%= pkg.description %>\n" +
          "git: <%= pkg.repository.url %>\n" +
          "home: <%= pkg.homepage %>\n" +
          "author: <%= pkg.author.name %>\n" +
          "  email: <%= pkg.author.email %>\n" +
          "\n\n",
        separator: "; \n",
      },
      dist: {
        src: ["lib/*.js"],
        dest: "dist/<%= pkg.name %>.js",
      }
    },
    jshint: {
      all: [
        "Gruntfile.js", "lib/**/*.js", "spec/**/*.js"
      ],
      options: {
        jshintrc: '.jshintrc'
      },
    },
    jasmine: {
      src: "lib/**/*.js",
      options: {
        specs: "spec/**/*.js",
        vendor: "vendor/**/*.js",
        version: '2.0.0'
      }
    }
  });

  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('default', ['concat:dist', 'test']);

};