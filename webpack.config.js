/* eslint max-len:0 */
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const DEV_MODE = process.env.NODE_ENV === 'development';

const toFilename = name => (DEV_MODE ? name : `${name}?[chunkhash]`);

const config = {
  mode: process.env.NODE_ENV,
  context: path.resolve('src'),
  entry: {
    app: ['./js/app.js'],
  },
  devtool: DEV_MODE ? 'inline-source-map' : false,
  output: {
    path: path.resolve('dist'),
    filename: toFilename('asset/js/[name].js'),
    chunkFilename: toFilename('asset/js/[name].chunk.js'),
    publicPath: '',
  },
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('node_modules'),
    ],
    alias: {
      '~': path.resolve('src'),
      '@': path.resolve('src/js'),
      img: path.resolve('src/asset/img'),
    },
  },
  /*
    ##     ##  #######  ########  ##     ## ##       ########
    ###   ### ##     ## ##     ## ##     ## ##       ##
    #### #### ##     ## ##     ## ##     ## ##       ##
    ## ### ## ##     ## ##     ## ##     ## ##       ######
    ##     ## ##     ## ##     ## ##     ## ##       ##
    ##     ## ##     ## ##     ## ##     ## ##       ##
    ##     ##  #######  ########   #######  ######## ########
  */
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            preserveWhitespace: true,
          },
        },
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 2048,
            name: '[path][name].[ext]?[hash]',
          },
        },
        exclude: /node_modules/,
      },
      {
        // this applies to <template lang="pug"> in Vue components
        test: /\.pug$/,
        use: ['pug-plain-loader'],
        include: path.resolve('src/js'),
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
        include: path.resolve('src/html'),
      },
      {
        test: /\.(styl|stylus)$/,
        use: [
          {
            loader: 'vue-style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'stylus-loader',
            options: {
              paths: 'src/css/',
              sourceMap: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: !DEV_MODE ? 'warning' : false,
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'html/index.template.pug',
      data: {
        DEV_MODE,
      },
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new CopyWebpackPlugin([
      { from: 'asset/copy', to: './', ignore: ['.*'] },
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        VUE_ENV: JSON.stringify('client'),
      },
    }),
    ...DEV_MODE
      ? [
        new FriendlyErrorsPlugin(),
      ]
      : [
        new CleanWebpackPlugin(['dist'], { }),
      ],
  ],
  /*
    ########  ######## ##     ##  ######  ######## ########  ##     ## ######## ########
    ##     ## ##       ##     ## ##    ## ##       ##     ## ##     ## ##       ##     ##
    ##     ## ##       ##     ## ##       ##       ##     ## ##     ## ##       ##     ##
    ##     ## ######   ##     ##  ######  ######   ########  ##     ## ######   ########
    ##     ## ##        ##   ##        ## ##       ##   ##    ##   ##  ##       ##   ##
    ##     ## ##         ## ##   ##    ## ##       ##    ##    ## ##   ##       ##    ##
    ########  ########    ###     ######  ######## ##     ##    ###    ######## ##     ##
  */
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port: 3000,
    hot: true,
    stats: {
      colors: true,
      hash: false,
      chunks: false,
      chunkModules: false,
      children: false,
    },
    host: '0.0.0.0',
    disableHostCheck: true,
  /*  proxy: [
    {
      context: ['/upload', '/api'],
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  ], */
  },
  /*
  #######  ########  ######## #### ##     ## #### ########    ###    ######## ####  #######  ##    ##
  ##     ## ##     ##    ##     ##  ###   ###  ##       ##    ## ##      ##     ##  ##     ## ###   ##
  ##     ## ##     ##    ##     ##  #### ####  ##      ##    ##   ##     ##     ##  ##     ## ####  ##
  ##     ## ########     ##     ##  ## ### ##  ##     ##    ##     ##    ##     ##  ##     ## ## ## ##
  ##     ## ##           ##     ##  ##     ##  ##    ##     #########    ##     ##  ##     ## ##  ####
  ##     ## ##           ##     ##  ##     ##  ##   ##      ##     ##    ##     ##  ##     ## ##   ###
  #######  ##           ##    #### ##     ## #### ######## ##     ##    ##    ####  #######  ##    ##
  */
  optimization: {
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendor: {
        // name: 'vendor',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
  },
};


/*
######   #######  ##    ## ########  #### ######## ####  #######  ##    ##    ###    ##        ######
##    ## ##     ## ###   ## ##     ##  ##     ##     ##  ##     ## ###   ##   ## ##   ##       ##    ##
##       ##     ## ####  ## ##     ##  ##     ##     ##  ##     ## ####  ##  ##   ##  ##       ##
##       ##     ## ## ## ## ##     ##  ##     ##     ##  ##     ## ## ## ## ##     ## ##        ######
##       ##     ## ##  #### ##     ##  ##     ##     ##  ##     ## ##  #### ######### ##             ##
##    ## ##     ## ##   ### ##     ##  ##     ##     ##  ##     ## ##   ### ##     ## ##       ##    ##
 ######   #######  ##    ## ########  ####    ##    ####  #######  ##    ## ##     ## ########  ######
*/
if (!DEV_MODE) {
  const stylusLoader = config.module.rules.find(({ test }) => test.test('.stylus'));
  // Replace the `vue-style-loader` with
  // the MiniCssExtractPlugin loader.
  stylusLoader.use[0] = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../../',
    },
  };
  config.plugins.push(new MiniCssExtractPlugin({
    filename: 'asset/css/[name]-[contenthash].css',
    chunkFilename: 'asset/css/[name]-chunk-[contenthash].css',
  }));
}

module.exports = config;
