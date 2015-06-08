/*jshint node: true, camelcase: false */

module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-blanket-mocha');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			files: ['lib/**/*', 'test/**/*'],
			tasks: ['test']
		},
		connect: {
			test: {
				options: {
					hostname: '0.0.0.0',
					port: 9876,
					base: ['.']
				}
			}
		},
		mocha: {
			test: {
				options: {
					urls: ['http://localhost:9876/test/'],
					reporter: 'XUnit',
					threshold: 90
				},
				dest: 'xunit.xml'
			}
		},
		blanket_mocha: {
			test: {
				options: {
					urls: ['http://localhost:9876/test/'],
					reporter: 'Spec',
					threshold: 90
				}
			}
		},
		jshint: {
			rules: {
				options: {
					jshintrc: true,
					reporter: grunt.option('report') ? require('jshint-junit-reporter') : undefined,
					reporterOutput: grunt.option('report') ? 'lint.xml' : undefined
				},
				src: ['lib/**/*.js', 'test/**/*.js', 'Gruntfile.js', '!test/mock/**/*.js']
			}
		}
	});

	grunt.registerTask('server', ['fixture', 'connect:test:keepalive']);
	grunt.registerTask('test', ['connect:test', grunt.option('report') ? 'mocha' : 'blanket_mocha']);
	grunt.registerTask('default', ['jshint']);

};
