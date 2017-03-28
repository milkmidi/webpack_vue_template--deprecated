var gulp = require( 'gulp' ),
    $ = require( 'gulp-load-plugins' )(),
    gutil = require( 'gulp-util' ),
    webpack = require( 'webpack' ),
    WebpackDevServer = require( 'webpack-dev-server' ),
    runSequence = require( 'run-sequence' ),
    merge = require( 'merge-stream' ),
    childProcess = require( 'child_process' ),
    path = require( 'path' ),
    rimraf = require( 'rimraf' ),
    buffer = require( 'vinyl-buffer' ),
    spritesmith = require('gulp.spritesmith'),
    chalk = require( 'chalk' );
//
// var ifs = require( 'os' ).networkInterfaces();
// var host = '' + Object.keys( ifs ).map( x => ifs[ x ].filter( x => x.family === 'IPv4' && !x.internal )[ 0 ] ).filter( x => x )[ 0 ].address;
// var host = '' + Object.keys( ifs ).map( x => ifs[ x ].filter( x => x.family === 'IPv4' && !x.internal )[ 0 ] ).filter( x => x )[ 0 ].address;
// host = host || 'localhost';
var host = 'localhost';
var port = 3000;
var URI = `http://${host}:${port}/`;

function logDevelopment() {
    var str = `
    ########  ######## ##     ##
    ##     ## ##       ##     ##
    ##     ## ##       ##     ##
    ##     ## ######   ##     ##
    ##     ## ##        ##   ##
    ##     ## ##         ## ##
    ########  ########    ###
    `;
    console.log( chalk.black.bgYellow( str ) );
}
function logProduction() {
    var str = `
    ########  ########   #######
    ##     ## ##     ## ##     ##
    ##     ## ##     ## ##     ##
    ########  ########  ##     ##
    ##        ##   ##   ##     ##
    ##        ##    ##  ##     ##
    ##        ##     ##  #######   `;
    console.log( chalk.bgCyan.white.bold( str ) );
}

gulp.task( 'rimraf', ( cb )=> {
    console.log( 'rimraf' );
    rimraf( './dist', cb );
});

/*
 ██████  ████████  ████████  ████ ████████ ████████
██    ██ ██     ██ ██     ██  ██     ██    ██
██       ██     ██ ██     ██  ██     ██    ██
 ██████  ████████  ████████   ██     ██    ██████
      ██ ██        ██   ██    ██     ██    ██
██    ██ ██        ██    ██   ██     ██    ██
 ██████  ██        ██     ██ ████    ██    ████████
*/
// https://github.com/twolfson/gulp.spritesmith
function createSprite( src , name ) {
    var spriteData = gulp.src( src )
        .pipe( spritesmith( {
            imgName: ''+ name + '.png',
            cssName:'_'+ name + '.css',
            padding: 4,
            imgOpts: { quality: 100 },
            cssTemplate: 'src/css/base/_handlebarsStr.css.basic.handlebars',
            cssHandlebarsHelpers: {
                ifIndexOfBTN( name, options ) {
                    if ( ~name.indexOf( '_btn' ) ) {
                        return options.fn( this );
                    }
                    return options.inverse( this );
                },
                hoverPosition( position, height ) {
                    console.log(position , height);
                    return ( position - ( height / 2 ) ) + 'px';
                },
                half( num ) {
                    return ( num  / 2 | 0 ) + 'px';
                },
                retinaBGS( spriteSheetWidth, itemWidth ) {
                    return ( spriteSheetWidth / itemWidth * 100 ) + '%';
                },
                getVW( itemWidth ) {
                    return ( itemWidth / 640 * 100 ) + 'vw';
                },
                autoSizePosition( spriteSheetSize, itemSize, itemOffset ) {
                    var s = spriteSheetSize / itemOffset;
                    var w = spriteSheetSize / 640;
                    return ( w / s * 100 ) + 'vw';
                }
            }

        }));
    var imgStream = spriteData.img
        .pipe( buffer() )
        .pipe( gulp.dest( 'src/asset/img_src/' ) );

    var cssStream = spriteData.css
        .pipe( gulp.dest( 'src/css' ) );
    return merge( imgStream, cssStream );
}


gulp.task( 'sprite', function () {
    var a = [
        createSprite( 'src/asset/sprite_src/*', 'sprite' ),
    ];
    return merge.apply( null, a );
});

/*
████ ██     ██    ███     ██████   ████████
 ██  ███   ███   ██ ██   ██    ██  ██
 ██  ████ ████  ██   ██  ██        ██
 ██  ██ ███ ██ ██     ██ ██   ████ ██████
 ██  ██     ██ █████████ ██    ██  ██
 ██  ██     ██ ██     ██ ██    ██  ██
████ ██     ██ ██     ██  ██████   ████████
*/
// 只要是底線開頭的檔案，都不壓 K ，直接搬到 src/img 資料夾下
gulp.task( 'm', () => {
    console.log('m');
    var IMG_SRC = [ 'src/asset/img_src/**/*.+(jpg|png|gif)', '!src/asset/img_src/_*' ];
    var OTHER_IMG = [ '!src/asset/img_src/**/*.(jpg|png|gif)', 'src/asset/img_src/_*' ];
    var DIST = 'src/asset/img';
    var imageminPngquant = require( 'imagemin-pngquant' );
    var imageminMozjpeg = require( 'imagemin-mozjpeg' );

    var taskOtherIMG = gulp.src( OTHER_IMG )
        .pipe( $.changed( DIST ) )
        .pipe( $.size( {
            title: '',
            showFiles: true,
        }) )
        .pipe( gulp.dest( DIST ) );

    var taskIMGSRC = gulp.src( IMG_SRC )
        .pipe( $.changed( DIST ) )
        .pipe( $.size( {
            title: '',
            showFiles: true,
        }) )
        .pipe( $.imagemin( [
            imageminMozjpeg( { quality: 90 }),
            imageminPngquant( { quality: 90 })
        ] ) )
        .pipe( gulp.dest( DIST ) )
        .pipe( $.size( {
            title: 'dist',
        }) );

    return merge( taskOtherIMG, taskIMGSRC );
});

/*
██     ██ ████████ ██    ██ ████████   ███████  ████████
██     ██ ██       ███   ██ ██     ██ ██     ██ ██     ██
██     ██ ██       ████  ██ ██     ██ ██     ██ ██     ██
██     ██ ██████   ██ ██ ██ ██     ██ ██     ██ ████████
 ██   ██  ██       ██  ████ ██     ██ ██     ██ ██   ██
  ██ ██   ██       ██   ███ ██     ██ ██     ██ ██    ██
   ███    ████████ ██    ██ ████████   ███████  ██     ██
*/
gulp.task( 'vendor', () => {
    var concat = require( 'gulp-concat' );
    var hash = require( 'gulp-hash-filename' );
    var VENDOR_ARR = [
        './src/asset/vendor/source/vue.min.js',
        './src/asset/vendor/source/vue-router.min.js',
        './src/asset/vendor/source/vuex.min.js',
        './src/asset/vendor/source/TweenMax.min.js',
        './src/asset/vendor/source/es6-promise.auto.min.js',
        './src/asset/vendor/source/device.min.js',
        './src/asset/vendor/source/createjs-2015.11.26.min.js',
    ]
    return gulp.src( VENDOR_ARR )
        .pipe( concat( 'vender.js', { newLine: ';' } ) )
        .pipe( hash( {
            'format': '{name}.{hash:10}{ext}',
        } ) )
        .pipe( gulp.dest( './src/asset/vendor/' ) );
});

/**
████████  ████████ ██     ██  ██████  ████████ ████████  ██     ██ ████████ ████████
██     ██ ██       ██     ██ ██    ██ ██       ██     ██ ██     ██ ██       ██     ██
██     ██ ██       ██     ██ ██       ██       ██     ██ ██     ██ ██       ██     ██
██     ██ ██████   ██     ██  ██████  ██████   ████████  ██     ██ ██████   ████████
██     ██ ██        ██   ██        ██ ██       ██   ██    ██   ██  ██       ██   ██
██     ██ ██         ██ ██   ██    ██ ██       ██    ██    ██ ██   ██       ██    ██
████████  ████████    ███     ██████  ████████ ██     ██    ███    ████████ ██     ██
*/
gulp.task( 'webpack-dev-server', ( cb ) => {
    logDevelopment();
    process.env.NODE_ENV = 'development';

    var config = require( './webpack.config' );
    // config.devtool = 'cheap-module-eval-source-map'; // 這會抓到 mixin 裡的路徑
    config.devtool = 'inline-source-map';   // 要用這個才會對

    for ( let a in config.entry ) {
        config.entry[ a ].unshift( `webpack-dev-server/client?${URI}` , 'webpack/hot/dev-server' );
    }
    // config.plugins.push( new webpack.HotModuleReplacementPlugin() );
    var server = new WebpackDevServer( webpack( config ), config.devServer );
    server.listen( port, host, ( err  ) => {
        if ( err )
            console.log( err );
        gutil.log( '[webpack-dev-server]', URI );
        cb();
    });
});

/**
██      ██ ████████ ████████  ████████     ███     ██████  ██    ██    ████████  ██     ██ ████ ██       ████████
██  ██  ██ ██       ██     ██ ██     ██   ██ ██   ██    ██ ██   ██     ██     ██ ██     ██  ██  ██       ██     ██
██  ██  ██ ██       ██     ██ ██     ██  ██   ██  ██       ██  ██      ██     ██ ██     ██  ██  ██       ██     ██
██  ██  ██ ██████   ████████  ████████  ██     ██ ██       █████       ████████  ██     ██  ██  ██       ██     ██
██  ██  ██ ██       ██     ██ ██        █████████ ██       ██  ██      ██     ██ ██     ██  ██  ██       ██     ██
██  ██  ██ ██       ██     ██ ██        ██     ██ ██    ██ ██   ██     ██     ██ ██     ██  ██  ██       ██     ██
 ███  ███  ████████ ████████  ██        ██     ██  ██████  ██    ██    ████████   ███████  ████ ████████ ████████
 */
gulp.task( 'webpack-build',( cb ) => {
    logProduction();
    process.env.NODE_ENV = 'production';
    var config = require( './webpack.config' );
    webpack( config, ( err, stats ) => {
        if ( err ) {
            throw new gutil.PluginError( 'webpack', err );
        }
        gutil.log( '[webpack]', stats.toString( { colors: true, chunkModules: false }) );
        cb();
    });
});


gulp.task( 'p', () => runSequence( 'rimraf', 'm', 'webpack-build' ) );
gulp.task( 'pp', () => {
    runSequence( 'rimraf', 'm', 'webpack-build', () => {
        console.log('pp');
        var fileZillaBAT =  path.resolve( __dirname, './___FTP.bat' );
        childProcess.exec( fileZillaBAT, ( error ) => {
            if ( error ) {
                console.error( error );
            }
            return gulp.src( './' )
                .pipe( $.open( { uri: 'http://www.medialand.tw/?debug=medialand' }) );
        });
    });
});

gulp.task( 'd', [ 'watch','webpack-dev-server' ], () => {
    return gulp.src( './' )
        .pipe( $.open( { uri: URI + '?debug=medialand' }) );
});

gulp.task( 'watch', () => {
    console.log('watch');
    gulp.watch( 'src/asset/img_src/**/*', [ 'm' ] );
    gulp.watch( 'src/asset/sprite_src/**/*', [ 'sprite' ] );
});


gulp.task( 'default', ['watch', 'webpack-dev-server' ] );