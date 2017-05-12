module.exports = function(grunt) {
    // Define Grunt tasks
    grunt.initConfig({
      phpunit: {
        classes: {
            dir: 'tests/php/'
        }
      }
    });
    // Load Grunt Plugins
    grunt.loadNpmTasks('grunt-phpunit');
}
