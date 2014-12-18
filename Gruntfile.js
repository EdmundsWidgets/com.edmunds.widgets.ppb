'use strict';
module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			files: [
				'Gruntfile.js',
				'package.json',
				'source/**/*.js',
				'<%= nodeunit.tests %>'
			]
		},
		nodeunit: {
			tests: ['tests/casper/*-test.js']
		},
		connect: {
			www: {
				options: {
					// keepalive: true,
					base: 'source',
					port: 4545
				}
			}
		},
		ghost: {
			test: {
				files: [{
					src: ['tests/casper/*-test.js']
				}]
			},
			options: {
				args: {
					baseUrl: 'http://localhost:' +
						'<%= connect.www.options.port %>/'
				},
				direct: false,
				logLevel: 'error',
				printCommand: false,
				printFilePaths: true
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-ghost');

	grunt.registerTask('test', ['connect', 'ghost']);
	grunt.registerTask('default', ['connect']);
};
