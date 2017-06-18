'use strict';

const path = require('path');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, './public/src'),
    entry: {
        app: './app.jsx'
    },

    output: {
        library: 'app',
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, './public/build/assets'),
        publicPath: '/assets'
    },

    devServer: {
        contentBase: path.resolve(__dirname, './public/src'),
        historyApiFallback: true
    },

    watch: NODE_ENV === 'development',

    devtool: NODE_ENV === 'development' ? 'source-map' : null,

    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            normalize: path.resolve(__dirname, './node_modules/normalize.scss/normalize.scss')
        }
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }],
        },

            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                camelCase: true,
                                importLoaders: 1,
                                sourceMap: true,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'autoprefixer-loader',
                            query: {
                                browsers: 'last 2 version'
                            }
                        },
                        {
                            loader: 'sass-loader',
                            query: {
                                outputStyle: 'expanded',
                                sourceMap: true,
                                sourceMapContents: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|svg)$/,
                use: [
                    'file-loader?name=[path][hash:6][name].[ext]',
                ]
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new ExtractTextPlugin({
            filename: 'app.bundle.css',
            allChunks: true,
        })
    ]
};