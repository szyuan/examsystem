'use strict';
var LIVERELOAD_PORT = 35729;
// var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
// var mountFolder = function(connect, dir) {
//     return connect.static(require('path').resolve(dir));
// };
var moment=require('moment');

module.exports = function(grunt){

    // show elapsed time at the end
    // require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var config = {
        app: 'app',
        dist: 'dist',
        server: 'server',
        port:3000
    };

    grunt.initConfig({

        config: config,
        
        compress: {
            main: {
                options: {
                    archive:function(){
                        var date=moment().format("YYYY-MM-DD_HH-mm");
                        return 'archive/'+date+'.zip'
                    },
                    mode: 'zip'
                },
                files: [
                    {expand: true,src:['public/*']}                    
                ]
            }
        },
        open: {
            build: {
                path: 'http://localhost:<%= config.port %>'
            }
        },
        /*---实时刷新---*/
        connect: {
            options: {
                // 服务器端口号
                port: 3000,
                // 服务器地址(可以使用主机名localhost，也能使用IP)
                hostname: 'localhost',
                // 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
                base: 'public/'
            },
            livereload: {
                options: {
                  // 通过LiveReload脚本，让页面重新加载。
                  middleware: function(connect, options) {
                        return [
                            // 把脚本，注入到静态文件中
                            lrSnippet,
                            // 静态文件服务器的路径
                            connect.static(options.base[0]),
                            // 启用目录浏览(相当于IIS中的目录浏览)
                            connect.directory(options.base[0])
                        ];
                    }
                }
            }
        },
        // 通过watch任务，来监听文件是否有更改
        watch: {
          client: {
            // 我们不需要配置额外的任务，watch任务已经内建LiveReload浏览器刷新的代码片段。
            options: {
              livereload: LIVERELOAD_PORT
            },
            // '**' 表示包含所有的子目录
            // '*' 表示包含所有的文件
            files: ['public/*.html', 'css/*', 'js/*', 'images/**/*']
          }
        }
        /*---/实时刷新---*/
        
    });

    grunt.registerTask('default', [
       
    ]);

    grunt.registerTask('serve', [
        'compress'
    ]);

    grunt.registerTask('live', [
        'connect',
        'watch'
    ]);

}