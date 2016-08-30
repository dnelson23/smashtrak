/**
 * `bower`
 *
 * ---------------------------------------------------------------
 *
 * Copy bower installed components into sails asset pipeline
 */

module.exports = function(grunt) {
  grunt.config.set('bower', {
    dev: {
        dest: '.tmp/public',
        js_dest: '.tmp/public/js/dependencies',
        fonts_dest: './tmp/public/styles'
    }
  });

  grunt.loadNpmTasks('grunt-bower');

};