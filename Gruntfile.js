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
        express: {
            options: {
                port: 3000,
                debug: true
            },
            server: {
                options: {
                    script: 'app.js'
                }
            }
        },
//		connect: {
//			www: {
//				options: {
////					keepalive: true,
////					base: '',
//					port: 3000
//				}
//			}
//		},
		ghost: {
			test: {
				files: [{
					src: ['tests/casper/*-test.js']
				}]
			},
			options: {
				args: {
					baseUrl: 'http://localhost:' +
						'<%= express.options.port %>/' + 'ppb/configure'
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
    grunt.loadNpmTasks('grunt-express-server');

	grunt.registerTask('test', ['express', 'ghost']);
	grunt.registerTask('default', ['connect']);
};
