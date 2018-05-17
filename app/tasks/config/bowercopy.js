/**
 * `bowercopy`
 *
 * ---------------------------------------------------------------
 *
 * Copy bower installed components into sails asset pipeline
 */

module.exports = function(grunt) {
  grunt.config.set('bowercopy', {
  	dev: {
     	options: {
     		destPrefix: '.tmp/public'
     	},
     	files: {
     		'js/dependencies/bootstrap/bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js',
     		'js/dependencies/jquery/jquery.min.js': 'jquery/dist/jquery.min.js',
     		'styles/vendor/bootstrap/bootstrap.min.css' : 'bootstrap/dist/css/bootstrap.min.css',
     		'styles/vendor/fonts' : 'bootstrap/dist/fonts'
    	}
    }
  });

  grunt.loadNpmTasks('grunt-bowercopy');

};