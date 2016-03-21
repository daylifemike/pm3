module.exports = function(grunt) {
    var plugin_name = 'pm3';
    var plugin_path = '../wordpress/wp-content/plugins/' + plugin_name + '/';

    grunt.initConfig({
        clean: ['src/main/webapp/assets'],
        copy: {
            wp: {
                expand: true,
                flatten: true,
                src: [
                    // 'resources/public/main.js',
                    'src/php/pm3.php',
                    // 'src/css/pm3.css'
                ],
                dest: plugin_path
            }
        },
        watch: {
            out: {
                files: [
                    'resources/public/main.js',
                    'src/php/*.php'
                ],
                tasks: [ 'copy' ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [ 'clean', 'copy']);
    // grunt.registerTask('default', [ 'clean', 'react', 'copy', 'compass', 'exec']);
};
