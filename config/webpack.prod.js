var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var webpackMerge = require('webpack-merge');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',

  output: {
    publicPath: '/',
    path: 'dist',
    filename: '[id].[name].js'
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('[id].[name].css'),
    new webpack.optimize.UglifyJsPlugin(),
    new FaviconsWebpackPlugin({
      logo: './app/images/favicon.ico',
      prefix: 'icons-[name]/'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new CopyWebpackPlugin([
      // Copy directory contents to {output}/to/directory/
        { from: './app/images', to: './images' },
      ], {
      ignore: [
          // Doesn't copy any files with a txt extension
          '*.ico',
      ],
    })
  ]
});
