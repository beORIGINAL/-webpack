const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const Autoprefixer = require('autoprefixer');

const NODE_ENV = process.env.NODE_ENV || 'development';
const DEV_ENVIRONMENT = NODE_ENV === 'development';
const DEV_ENV_PORT = process.env.PORT || 3000;
const NODE_MODULES_LIST = Object.keys(require(path.resolve('./', 'package.json')).dependencies);

module.exports = {
    entry: {
        'node_modules': NODE_MODULES_LIST,
        'babel_polyfill': 'babel-polyfill',
        'esnap': [
            path.resolve(__dirname, 'assets', 'styles', 'app.scss'),
            path.resolve(__dirname, 'app', 'bootstrap.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].bundle.js',
        publicPath: '/',
        sourceMapFilename: '[name].map'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                        loader: 'ng-annotate-loader',
                        options: {
                            add: true
                        }
                    },
                    'babel-loader',
                    'required-loader'
                ]
            },
            {
                test: /\.tpl\.html$/,
                use: [{
                        loader: 'ng-cache-loader'
                    },
                    {
                        loader: 'required-loader'
                    }
                ]
            },
            {
                test: /\.s(c|a)ss/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: `${ DEV_ENVIRONMENT ? 'http://localhost:3000/' : '/'}`,
                    use: [{
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [Autoprefixer]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: DEV_ENVIRONMENT,
                                sourceMapContents: DEV_ENVIRONMENT,
                                outputStyle: 'expanded',
                                includePaths: [
                                    path.resolve(__dirname, 'assets', 'styles'),
                                    path.resolve(__dirname, 'assets', 'images')
                                ]
                            }
                        }, {
                            loader: 'resolve-url-loader'
                        },
                        {
                            loader: 'required-loader'
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true
                        }
                    }],
                    publicPath: `${ DEV_ENVIRONMENT ? 'http://localhost:3000/' : '/'}`
                })
            },
            {
                test: /\.(ttf|eot|woff|woff2|png|ico|jpg|jpeg|gif|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        context: path.resolve(__dirname, 'assets'),
                        name: 'assets/static/[ext]/[name].[ext]',
                        publicPath: DEV_ENVIRONMENT ? 'http://localhost:3000/' : '/'
                    }
                }]
            }
        ],
        noParse: `/${NODE_MODULES_LIST.join().replace(/,/g, '|')}/`
    },
    resolve: {
        extensions: [".js", ".scss", ".css"],
        modules: [
            path.join(__dirname, 'app'),
            'node_modules'
        ],
        alias: {
            'core': path.resolve(__dirname, 'app', 'core'),
            'common': path.resolve(__dirname, 'app', 'common'),
            'jquery-cron': path.resolve(__dirname, 'node_modules', 'jquery-cron', 'dist', 'jquery-cron-min.js')
        }
    },
    externals: {
        lodash: {
            commonjs: 'lodash',
            amd: 'lodash',
            root: '_'
        }
    },
    performance: {
        hints: 'warning',
        maxAssetSize: 200000,
        maxEntrypointSize: 400000,
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
    context: __dirname,
    target: 'web',
    devServer: {
        proxy: {
            '/rest': 'http://localhost:8080/rest'
        },
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        historyApiFallback: true,
        hot: true,
        https: false,
        noInfo: true,
        port: DEV_ENV_PORT
    },
    plugins: [
        new HtmlPlugin({
            title: 'Enhanced Snapshots',
            filename: 'index.html',
            template: path.resolve(__dirname, 'index.html'),
            chunksSortMode: 'dependency'
        }),
        new ExtractTextPlugin({
            filename: 'assets/css/[name].bundle.css',
            disable: DEV_ENVIRONMENT,
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'node_modules'
        }),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(NODE_ENV),
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            },
            DEV_ENVIRONMENT: DEV_ENVIRONMENT,
            MODULE_ID: () => `_${Math.random().toString(36).substr(2)}`
        }),
        new webpack.ProvidePlugin({
            '_': 'lodash',
            '$': 'jquery',
            'jQuery': 'jquery',
        }),
        new DashboardPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};