var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var webpackMerge = require('webpack-merge');
//var FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    publicPath: '/',
    path: 'dist',
    filename: '[id].[hash].js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('[id].[hash].css'),
    new webpack.optimize.UglifyJsPlugin(),
    /*new FaviconsWebpackPlugin({
      logo: './app/images/favicon.ico',
      prefix: 'icons-[hash]/'
    }),*/
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ],
});
