/* eslint no-console:off */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const VueExtractTextURLPlugin = require('./webpack-plugin/vue-extracttext-url-plugin');

const DEV_MODE = process.env.NODE_ENV === 'development';
const colorFun = DEV_MODE ? chalk.black.bgYellow : chalk.bgCyan.white;

console.log(colorFun(`DEV_MODE = ${DEV_MODE} , process.env.NODE_ENV = ${process.env.NODE_ENV}`));

const toFilename = (name, ext = 'js') => {
  const units = [name, '.', ext];
  if (!DEV_MODE) {
    const hashStr = (ext === 'css' ? '-[contenthash]' : '-[chunkhash]');
    units.splice(1, 0, hashStr);
  }
  return units.join('');
};
const config = {
  context: path.resolve('src'),
  entry: {
    app: ['./js/app.js'],
    vendor: [
      'es6-promise/auto',
      'vue',
      'vue-router',
      'vuex',
      'vuex-router-sync',
      // 'devicejs',
    ],
  },
  output: {
    filename: toFilename('js/[name]'),
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
  },

  resolve: {
    modules: [
      path.resolve('src/vue'),
      path.resolve('src/js'),
      path.resolve('src/css'),
      path.resolve('src/asset/img'),
      path.resolve('src'),
      path.resolve('node_modules'),
    ],
    alias: {
    },
    extensions: ['.js', '.vue'],
  },
};

/*
██     ██  ███████  ████████  ██     ██ ██       ████████
███   ███ ██     ██ ██     ██ ██     ██ ██       ██
████ ████ ██     ██ ██     ██ ██     ██ ██       ██
██ ███ ██ ██     ██ ██     ██ ██     ██ ██       ██████
██     ██ ██     ██ ██     ██ ██     ██ ██       ██
██     ██ ██     ██ ██     ██ ██     ██ ██       ██
██     ██  ███████  ████████   ███████  ████████ ████████
*/
config.module = {
  rules: [
    {
      test: /\.vue$/,
      use: {
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false,
          extractCSS: !DEV_MODE, // easy way, will auto import postcss.config.js
          stylus: 'stylus-loader?paths=src/css/',
        },
      },
      include: path.resolve('src/vue'),
      exclude: /node_modules/,
    },
    {
      test: /\.js$/,
      use: 'babel-loader',
      include: [
        path.resolve('src/js'),
      ],
      exclude: /node_modules/,
    },
    {
      test: /\.(png|jpg|gif|svg|ico)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: '[path][name].[ext]?[hash:8]',
        },
      },
      include: [path.resolve('src/asset/img')],
      exclude: /node_modules/,
    },
    {
      test: /\.pug$/,
      use: {
        loader: 'pug-loader',
        options: {
          self: true,
          pretty: DEV_MODE,
        },
      },
    },
  ],
};

config.performance = {
  maxEntrypointSize: 300000,
  hints: !DEV_MODE ? 'warning' : false,
};

/*
████████  ██       ██     ██  ██████   ████ ██    ██  ██████
██     ██ ██       ██     ██ ██    ██   ██  ███   ██ ██    ██
██     ██ ██       ██     ██ ██         ██  ████  ██ ██
████████  ██       ██     ██ ██   ████  ██  ██ ██ ██  ██████
██        ██       ██     ██ ██    ██   ██  ██  ████       ██
██        ██       ██     ██ ██    ██   ██  ██   ███ ██    ██
██        ████████  ███████   ██████   ████ ██    ██  ██████
*/
config.plugins = [
  new ExtractTextPlugin({ filename: toFilename('css/[name]', 'css'), disable: DEV_MODE }),
  new VueExtractTextURLPlugin({ disable: DEV_MODE }),
  copyWebpackPlugin([
    // { from: 'copy', to: './' },
    // { from: 'asset/vendor/vender.bf8bf71e3c.js', to: './asset/js' },
  ]),
  new HtmlWebpackPlugin({
    template: './html/index.template.pug',
    data: {
      DEV_MODE,
    },
  }),
  /* new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer',
  }), */
  new webpack.DefinePlugin({
    __DEV__: DEV_MODE,
    'process.env.NODE_ENV': DEV_MODE ? "'development'" : '"production"',
  }),

  ...DEV_MODE ? [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
  ] : [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: { warnings: false },
      output: { comments: false },
    }),
  ],
];

/**
    ████████  ████████ ██     ██  ██████  ████████ ████████  ██     ██ ████████ ████████
    ██     ██ ██       ██     ██ ██    ██ ██       ██     ██ ██     ██ ██       ██     ██
    ██     ██ ██       ██     ██ ██       ██       ██     ██ ██     ██ ██       ██     ██
    ██     ██ ██████   ██     ██  ██████  ██████   ████████  ██     ██ ██████   ████████
    ██     ██ ██        ██   ██        ██ ██       ██   ██    ██   ██  ██       ██   ██
    ██     ██ ██         ██ ██   ██    ██ ██       ██    ██    ██ ██   ██       ██    ██
    ████████  ████████    ███     ██████  ████████ ██     ██    ███    ████████ ██     ██
    */
    // https://webpack.js.org/configuration/dev-server/█devserver
config.devServer = {
  historyApiFallback: true,
  hot: true,
  stats: {
    colors: true,
    hash: false,
    chunks: false,
  },
};

module.exports = config;
