module.exports = function(grunt) {
	grunt.initConfig({});
	grunt.loadNpmTasks('grunt-exec');
	grunt.initConfig({
		exec: {
			load_server: {
				cmd: "node node_modules/jasmine-integration/server.js"
			}
		}
	});
	grunt.task.registerTask('jasmine:server', ['exec:load_server']);
	grunt.loadNpmTasks('jasmine-integration');
};
