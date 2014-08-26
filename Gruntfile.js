module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            default: {
                files: {
                    'design/style.css': 'design/style.less'
                },
                options: {
                    compress: true
                }
            }
        },
        autoprefixer: {
            default: {
                src: 'design/style.css',
                dest: 'design/style.css'
            }
        },
        watch: {
            styles: {
                files: 'design/style.less',
                tasks: [ 'less:default', 'autoprefixer:default' ]
            },
            grunt: {
                files: 'Gruntfile.js'
            }
        }
    });
    grunt.loadNpmTasks( 'grunt-contrib-less' );
    grunt.loadNpmTasks( 'grunt-autoprefixer' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
};
