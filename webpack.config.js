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
        library: '[name]',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './public/build/assets'),
        publicPath: '/assets',
    },

    devServer: {
        contentBase: path.resolve(__dirname, './public/src'),
    },

    watch: NODE_ENV === 'development',

    devtool: NODE_ENV === 'development' ? 'source-map' : null,

    resolve: {
        alias: {
            normalize: path.resolve(__dirname, './node_modules/normalize.scss/normalize.scss')
        }
    },

    module: {
      rules: [{
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: [{
              loader: 'babel-loader',
              options: { presets: ['es2015', 'react'] }
          }],
      },

      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              loader: [
                  {
                      loader: 'css-loader',
                      query: {
                          modules: true,
                          importLoaders: 2,
                          sourceMap: true
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
            filename: '[name].bundle.css',
            allChunks: true,
        })
    ]
};