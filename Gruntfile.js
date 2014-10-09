'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('animatedDropdown.jquery.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        clean: {
            files: ['dist']
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['src/js/jquery.<%= pkg.name %>.js'],
                dest: 'dist/js/jquery.<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/js/jquery.<%= pkg.name %>.min.js'
            }
        },
        qunit: {
            files: ['test/qunit/**/*.html']
        },

        /* https://github.com/gruntjs/grunt-contrib-connect */
        connect: {
            server: {
                options: {
                    port: 8000
                }
            },

            openJasmineSpec: {
                options: {
                    port: 8001,
                    /*useAvailablePort: true,*/
                    keepalive: true,
                    open: {
                        target: 'http://127.0.0.1:<%= connect.openJasmineSpec.options.port %>/_SpecRunner.html', // target url to open
                        appName: 'google-chrome', // name of the app that opens, ie: open, start, xdg-open   (google-chrome, firefox)
                        callback: function () {} // called when the app has opened
                    }
                }
            }
        },

        /* https://github.com/gruntjs/grunt-contrib-jasmine */
        jasmine: {
            console: {
                src: 'src/jquery.<%= pkg.name %>.js',
                options: {
                    specs: ['test/jasmine/**/*.js'],
                    vendor: ['libs/jquery/jquery.js', 'libs/jasmine/jasmine-jquery.js'],
                    helper: [],
                    summary: false,

                    /*
                     The host you want PhantomJS to connect against to run your tests.
                     e.g. if using an ad hoc server from within grunt host : 'http://127.0.0.1:8000/'
                     Without a host, your specs will be run from the local filesystem.

                     In order to run on this port, need to start a local server using grunt-contrib-connect
                     */
                    host: 'http://127.0.0.1:8000'
                }
            },

            /*
            * runs with keepRunner: true option to keep _SpecRunner.html after the test is invoked
            * this file will be opened further via connect:openJasmineSpec task
            * */
            browser: {
                src: 'src/js/jquery.<%= pkg.name %>.js',
                options: {
                    specs: ['test/jasmine/**/*.js'],
                    vendor: ['libs/jquery/jquery.js', 'libs/jasmine/jasmine-jquery.js'],
                    helper: [],
                    summary: false,
                    keepRunner: true,

                    /*
                     The host you want PhantomJS to connect against to run your tests.
                     e.g. if using an ad hoc server from within grunt host : 'http://127.0.0.1:8000/'
                     Without a host, your specs will be run from the local filesystem.

                     In order to run on this port, need to start a local server using grunt-contrib-connect
                     */
                    host: 'http://127.0.0.1:8000'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: ['src/**/*.js']
            },
            test: {
                src: ['test/qunit/**/*.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'qunit']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit']
            }
        },
        less: {
            dev: {
                options: {
                    paths: ['src/less']
                },
                files: {
                    'dist/css/animatedDropdown.css': 'src/less/animatedDropdown.less'
                }
            },
            prod: {
                options: {
                    paths: ['src/less'],
                    cleancss: true,
                    ieCompat: true,
                    compress: true
                },
                files: {
                    'dist/css/animatedDropdown.min.css': 'src/less/animatedDropdown.less'
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task.
    grunt.registerTask('default', ['jshint', 'qunit', 'clean', 'concat', 'uglify', 'less']);
    grunt.registerTask('test-jasmine', ['jshint', 'connect:server', 'jasmine:console']);

    /*
     task to run jasmine tests in browser via _SpecRunner.html.
     to be able to launch fixtures,need to launch it on server.

     so,first jasmine:browser runs tests with 'keepRunner:true' option to keep _SpecRunner.html file.
      after that, connect:openJasmineSpec task in called to run the _SpecRunner.html file.
      by default, open it it firefox.

      Note ! The task should be launched with --force options to proceed to connect:openJasmineSpec if
      there are failed tests, because otherwise jasmine:browser goal will fail and test results won't be opened in
      browser.
     */
    grunt.registerTask('test-jasmine-in-browser', ['jshint', 'connect:server', 'jasmine:browser', 'connect:openJasmineSpec']);

};
