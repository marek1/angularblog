'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {
    grunt.log.error('Cannot load config file '+e);
  }

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      coffee: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      },
      server: {
        files:  [ 'server/**/*' ],
        tasks:  [ 'express:dev', 'livereload-start' ]
      },
      jshint: {
      	files : '<%= yeoman.app %>/scripts/{,*/}*.js',
      	tasks : 'jshint'
      },
      less : {
      	files : '<%= yeoman.app %>/styles/**/*.less',
      	tasks : 'less'
      }
    },
    express: {
      options: {
        // Override defaults here
        background: true,
        port: 9000
      },
      dev: {
        options: {
          script: 'server/server.js'
        }
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
    	files: [
    		'<%= yeoman.app %>/scripts/{,*/}*.js',    		
	  		'!<%= yeoman.app %>/scripts/factories/isemptyobject.js'
    	],
      	options: {
	        // options here to override JSHint defaults
	        "quotmark"      : false,
	        "undef"         : false,
	        "unused"        : false,
   			"strict"        : false,  
   			"globalstrict"  : false,
	        globals: {
	          jQuery: true,
	          console: true,
	          module: true,
	          document: true
	        }
      	}
      // all:  [
        // '<%= yeoman.app %>/scripts/{,*/}*.js'
      // ],
      // options: {
        // jshintrc: '.jshintrc'
      // }
    },
    karma: {
      e2e: {
        configFile: 'config/karma-e2e.conf.js',
        singleRun: true,
        browsers: ['PhantomJS'],
        keepalive: true ,
        // background: true,
        autoWatch: true
      },
      unit: {
        configFile: 'config/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS'],
        keepalive: true,
        // background: true, 
        autoWatch: true
      }
      /*
       * No Idea how i can automate testing ,
       * so its run everytime 
       * a) the server starts
       * OR
       * b) a file changes (prefered) 
       */
    },
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/components',
        relativeAssets: true
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '.tmp/scripts/{,*/}*.js',
            '<%= yeoman.app %>/scripts/{,*/}*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'components/**/*',
            'images/{,*/}*.{gif,webp}',
            'styles/fonts/*'
          ]
        }]
      }
    },
    less : {
	  compile: {
        files: {
          'app/styles/main.css': ['app/styles/main.less']
        }
      }
    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('default', [
	 'clean:server',
	 'less',
	 'watch'
  ]);
	
  grunt.registerTask('server', [
  // 'jshint',
    'clean:server',
    'coffee:dist',
//    'karma:unit', //running a unit test every time the server starts
    'livereload-start',
    'express:dev',
    'open',
    'watch'
  ]);

  grunt.registerTask('test:unit', [
    'clean:server',
    'coffee',
    'connect:test',
    'karma:unit'
  ]);

  grunt.registerTask('test:e2e', [
    'clean:server',
    'coffee',
    'livereload-start',
    'connect:livereload',
    'karma:e2e'
  ]);
  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'less',
    'test:unit',
    'test:e2e',
    'coffee',
    'useminPrepare',
    'imagemin',
    'cssmin',
    'htmlmin',
    'concat',
    'copy',
    'cdnify',
    'ngmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', ['build']);
 // A very basic default task.
  grunt.registerTask('realshit', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });

};
