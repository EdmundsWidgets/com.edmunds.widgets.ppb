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
		},
        compress: {
            main: {
                options: {
                    archive : "edmunds.widgets.ppb.zip.zip",
                    mode: 'zip'
                },
                files: [
                    {
                        expand: true,
                        src: ['**']
                    }
                ]
            }
        }
	});
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-ghost');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.registerTask('test', ['express', 'ghost', 'compress']);
	grunt.registerTask('default', ['connect']);
};
