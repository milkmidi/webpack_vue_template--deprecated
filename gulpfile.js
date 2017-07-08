/* eslint global-require:off,max-len:off,no-console:off */
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const gutil = require('gulp-util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const runSequence = require('run-sequence');
const merge = require('merge-stream');
const childProcess = require('child_process');
const path = require('path');
const rimraf = require('rimraf');
const buffer = require('vinyl-buffer');
const spritesmith = require('gulp.spritesmith');
const chalk = require('chalk');
//
// var ifs = require( 'os' ).networkInterfaces();
// var host = '' + Object.keys( ifs ).map( x => ifs[ x ].filter( x => x.family === 'IPv4' && !x.internal )[ 0 ] ).filter( x => x )[ 0 ].address;
// host = host || 'localhost';
const host = 'localhost';
const port = 3000;
const URI = `http://${host}:${port}/`;

function logDevelopment() {
  const str = `
  ########  ######## ##     ##
  ##     ## ##       ##     ##
  ##     ## ##       ##     ##
  ##     ## ######   ##     ##
  ##     ## ##        ##   ##
  ##     ## ##         ## ##
  ########  ########    ###
  `;
  console.log(chalk.black.bgYellow(str));
}

function logProduction() {
  const str = `
  ########  ########   #######
  ##     ## ##     ## ##     ##
  ##     ## ##     ## ##     ##
  ########  ########  ##     ##
  ##        ##   ##   ##     ##
  ##        ##    ##  ##     ##
  ##        ##     ##  #######   `;
  console.log(chalk.bgCyan.white.bold(str));
}

gulp.task('rimraf', (cb) => {
  console.log('rimraf');
  rimraf('./dist', cb);
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
function createSprite(src, fileName) {
  const spriteData = gulp.src(src)
    .pipe(spritesmith({
      imgName: `${fileName}.png`,
      cssName: `_${fileName}.css`,
      padding: 4,
      imgOpts: {
        quality: 100,
      },
      cssTemplate: 'src/css/base/handlebars/basic.hbs',
      cssHandlebarsHelpers: {
        ifIndexOfBTN(name, options) {
          if (name.indexOf('_btn') !== -1) {
            return options.fn(this);
          }
          return options.inverse(this);
        },
        half(value) {
          return `${Math.floor(value / 2)}px`;
        },
        hoverPosition(position, height) {
          return `${position - Math.floor(height / 2)}px`;
        },
        percent(value, base) {
          return `${(value / base) * 100}%`;
        },
        bgPosition(spriteSize, size, offset) {
          const result = (offset / (size - spriteSize)) * 100;
          if (isNaN(result)) {
            return '0';
          }
          return `${result}%`;
        },

      },

    }));
  const imgStream = spriteData.img
    .pipe(buffer())
    .pipe(gulp.dest('src/asset/img_src/'));

  const cssStream = spriteData.css
    .pipe(gulp.dest('src/css'));
  return merge(imgStream, cssStream);
}


gulp.task('sprite', () => {
  const a = [
    createSprite('src/asset/sprite_src/*', 'sprite'),
  ];
  return merge(...a);
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
gulp.task('m', () => {
  console.log('m');
  const IMG_SRC = ['src/asset/img_src/**/*.+(jpg|png|gif)', '!src/asset/img_src/_*'];
  const OTHER_IMG = ['!src/asset/img_src/**/*.(jpg|png|gif)', 'src/asset/img_src/_*'];
  const DIST = 'src/asset/img';
  const imageminPngquant = require('imagemin-pngquant');
  const imageminMozjpeg = require('imagemin-mozjpeg');

  const taskOtherIMG = gulp.src(OTHER_IMG)
    .pipe($.changed(DIST))
    .pipe($.size({
      title: '',
      showFiles: true,
    }))
    .pipe(gulp.dest(DIST));

  const taskIMGSRC = gulp.src(IMG_SRC)
    .pipe($.changed(DIST))
    .pipe($.size({ showFiles: true }))
    .pipe($.imagemin([
      imageminMozjpeg({
        quality: 90,
      }),
      imageminPngquant({
        quality: 90,
      }),
    ]))
    .pipe(gulp.dest(DIST));

  return merge(taskOtherIMG, taskIMGSRC);
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
gulp.task('vendor', () => {
  const concat = require('gulp-concat');
  const hash = require('gulp-hash-filename');
  const VENDOR_ARR = [
    // './src/asset/vendor/source/',
  ];
  return gulp.src(VENDOR_ARR)
    .pipe(concat('vender.js', {
      newLine: ';',
    }))
    .pipe(hash({
      format: '{name}.{hash:10}{ext}',
    }))
    .pipe(gulp.dest('./src/asset/vendor/'));
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
gulp.task('webpack-dev-server', (cb) => {
  logDevelopment();
  process.env.NODE_ENV = 'development';

  const config = require('./webpack.config');
  // config.devtool = 'cheap-module-eval-source-map'; // 這會抓到 mixin 裡的路徑
  config.devtool = 'inline-source-map'; // 要用這個才會對

  for (const a in config.entry) {
    config.entry[a].unshift(`webpack-dev-server/client?${URI}`, 'webpack/hot/dev-server');
  }
  // config.plugins.push( new webpack.HotModuleReplacementPlugin() );
  const server = new WebpackDevServer(webpack(config), config.devServer);
  server.listen(port, host, (err) => {
    if (err) {
      console.log(err);
    }
    gutil.log('[webpack-dev-server]', URI);
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
gulp.task('webpack-build', (cb) => {
  logProduction();
  process.env.NODE_ENV = 'production';
  const config = require('./webpack.config');
  webpack(config, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString({
      colors: true,
      chunkModules: false,
    }));
    cb();
  });
});


gulp.task('p', () => runSequence('rimraf', 'm', 'webpack-build'));
gulp.task('pp', () => {
  runSequence('rimraf', 'm', 'webpack-build', () => {
    console.log('pp');
    const fileZillaBAT = path.resolve(__dirname, './___FTP.bat');
    childProcess.exec(fileZillaBAT, (error) => {
      if (error) {
        console.error(error);
      }
      return gulp.src('./')
        .pipe($.open({
          uri: 'http://www.medialand.tw/?debug=medialand',
        }));
    });
  });
});

gulp.task('d', ['watch', 'webpack-dev-server'], () => gulp.src('./')
  .pipe($.open({
    uri: `${URI}?debug=medialand`,
  })));

gulp.task('watch', () => {
  console.log('watch');
  gulp.watch('src/asset/img_src/**/*', ['m']);
  gulp.watch('src/asset/sprite_src/**/*', ['sprite']);
});


gulp.task('default', ['watch', 'webpack-dev-server']);
