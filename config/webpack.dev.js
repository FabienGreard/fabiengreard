var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var webpackMerge = require('webpack-merge');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'dev';

module.exports = webpackMerge(commonConfig, {
  cache: true,
  devtool: 'cheap-module-source-map',
  output: {
    path: 'dist',
    publicPath: 'http://localhost:8080/',
    filename: '[name].js'
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080/'
      },
      {
        reload: true
      }
    ),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ],
  devServer: {
    port: 8080,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
});
