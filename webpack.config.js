const path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    chalk = require('chalk'),
    ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
    HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    copyWebpackPlugin = require('copy-webpack-plugin'),
    VueExtractTextURLPlugin = require('./webpack-plugin/vue-extracttext-url-plugin');

const DEV_MODE = process.env.NODE_ENV === 'development';
const colorFun = DEV_MODE ? chalk.black.bgYellow : chalk.bgCyan.white;

// const node_modules_dir = path.join( __dirname, '/node_modules' );

console.log(colorFun(`DEV_MODE = ${DEV_MODE} , process.env.NODE_ENV = ${process.env.NODE_ENV}`));
const config = {
    context: path.resolve('src'),
    entry: {
        app: ['./js/app.js'],
    },
    output: {
        filename: 'asset/js/[name].js?[hash]',
        path: path.resolve(__dirname, './dist'),
        publicPath: '',
    },
    resolveLoader: {
        moduleExtensions: ['-loader'],
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
    devServer: {
        // historyApiFallback: false,
        // noInfo: true,
        hot: true,
        // inline: true,
        // https://webpack.js.org/configuration/stats/
        stats: {
            colors: true,
            hash: false, // add the hash of the compilation
            version: false, // add webpack version information
            timings: true, // add timing information
            assets: true, // add assets information
            chunks: false, // add chunk information
            chunkModules: false, // add built modules information to chunk information
            modules: false, // add built modules information
            cached: false, // add also information about cached (not built) modules
            reasons: false, // add information about the reasons why modules are included
            source: false, // add the source code of modules
            error: true,
            errorDetails: true, // add details to errors (like resolving log)
            chunkOrigins: false, // add the origins of chunks and chunk merging info
        },
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
            loader: 'vue-loader',
            include: path.resolve('src/vue'),
            exclude: /node_modules/,
            options: {
                loaders: {
                    stylus: ExtractTextPlugin.extract({
                        use: 'css!stylus?paths=src/css/',
                        fallback: 'vue-style',
                    }),
                },
                postcss: [
                    require('autoprefixer')({
                        browsers: ['last 5 version', 'iOS >=8', 'Safari >=8'],
                    }),
                    require('cssnano')({
                        zindex: false,
                        calc: false,
                        reduceIdents: false,
                    }),
                ],
            },
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [
                path.resolve('src/js'),
            ],
            exclude: /node_modules/,
        },
        {
            test: /\.(png|jpg|gif|svg|ico)$/,
            include: path.resolve('src/asset/img'),
            loader: 'url-loader',
            exclude: /node_modules/,
            options: {
                limit: 1024,
                name: '[path][name].[ext]?[hash:8]',
            },
        },
        {
            test: /\.pug$/,
            loader: 'pug-loader',
            options: {
                self: true,
                pretty: DEV_MODE,
            },
        },
        /*{
            test: /\.js$/,
            include: path.resolve( 'src/asset/fla' ),
            loader: "imports-loader?this=>window"
        }*/
    ],
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
    new ExtractTextPlugin({ filename: 'asset/css/[name].css?[hash]', disable: DEV_MODE }),
    new VueExtractTextURLPlugin({ disable: DEV_MODE }),
    // src/asset 裡面有什麼就 copy 到 dist/ 下
    copyWebpackPlugin([
        // { from: 'copy', to: './' },
        { from: 'asset/vendor/vender.bf8bf71e3c.js', to: './asset/js' },
    ]),
    new HtmlWebpackPlugin({
        template: './html/index.template.pug',
        data: {
            DEV_MODE,
        },
    }),
    new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
    }),
    new HtmlWebpackIncludeAssetsPlugin({
        assets: ['asset/js/vender.bf8bf71e3c.js'],
        append: false,
    }),
    new webpack.DefinePlugin({
        __DEV__: DEV_MODE,
        'process.env.NODE_ENV': DEV_MODE ? "'development'" : '"production"',
    }),

    //  http://vue-loader.vuejs.org/en/workflow/production.html
    ...DEV_MODE ? [
        new webpack.HotModuleReplacementPlugin(),
    ] : [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: { warnings: false },
            output: { comments: false },
        }),
        // optimize module ids by occurence count
        // 以下這個還不知道要做什麼
        new webpack.LoaderOptionsPlugin({
            test: /\.css$/,
            minimize: true,
            debug: false,
            options: {
            },
        }),
    ],
];

/*
████████ ██     ██ ████████ ████████ ████████  ██    ██    ███    ██        ██████
██        ██   ██     ██    ██       ██     ██ ███   ██   ██ ██   ██       ██    ██
██         ██ ██      ██    ██       ██     ██ ████  ██  ██   ██  ██       ██
██████      ███       ██    ██████   ████████  ██ ██ ██ ██     ██ ██        ██████
██         ██ ██      ██    ██       ██   ██   ██  ████ █████████ ██             ██
██        ██   ██     ██    ██       ██    ██  ██   ███ ██     ██ ██       ██    ██
████████ ██     ██    ██    ████████ ██     ██ ██    ██ ██     ██ ████████  ██████
*/
// 不要將這裡打包到你的 js 檔裡, 可以用 extensions ，然後自己 script src, 或是用 addVendor 的方法，二選一
// vue 一定要加，不知道為什麼 webpack 會自動去找 vue檔
config.externals = {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    jquery: '$',
    axios: 'axios',
};
module.exports = config;
