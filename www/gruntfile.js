module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'ui/scripts/main.js']
    },

    imagemin: {
        dynamic: {
            files: [{
                expand: true,
                cwd: 'ui/images/temp',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'ui/image/icons'
            }]
        }
    },

    sprite:{
      all: {
        src: 'ui/image/icons/*.png',
        destImg: 'ui/img/sprite.png',
        destCSS: 'ui/styles/sprites.css'
      }
    },

    less: {
      all: {
        options: {
          paths: ["ui/styles/"],
          cleancss: true
        },
        files: {
          "ui/styles/main.css": "ui/styles/main.less"
        }
      }
    },

    watch: {
        scripts: {
            files: ['Gruntfile.js', 'ui/scripts/*.js'],
            tasks: ['jshint'],
            options: {
                nospawn: true,
                livereload: true
            },
        },
        less: {
            files: ['ui/styles/main/*.less', 'ui/styles/main.less', '*.html'],
            tasks: ['less'],
            options: {
                nospawn: true,
                livereload: true
            },
        }
    },

    includes: {
      files: {
        src: ['tpls/header.html'],
        dest: 'tmp',
        flatten: true,
        cwd: '.',
        options: {
          silent: true,
          banner: '<!-- I am a banner <% includes.files.dest %> -->'
        }
      }
    }


  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
//  grunt.loadNpmTasks('grunt-contrib-concat');
//  grunt.loadNpmTasks('grunt-contrib-uglify');
//  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
//  grunt.loadNpmTasks('grunt-includes');

  grunt.registerTask('default', [
    'jshint',
   // 'imagemin',
    'less', 
    'watch'
  ]);
};