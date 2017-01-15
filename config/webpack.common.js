var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
var webpack = require('webpack');

module.exports = {
  entry: {
  'vendor': './app/ts/lib/vendor.ts',
  'polyfills': './app/ts/lib/polyfills.ts',
  'app': ['babel-polyfill', './app/ts/main.ts']
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader']
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.css$/,
        loaders: [ExtractTextPlugin.extract('style', 'css?sourceMap'), 'to-string', 'css']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=asset/[name].[ext]'
      },
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new  webpack.optimize.CommonsChunkPlugin({
      name: 'polyfills',
      chunks: ['polyfills']
    }),
    new  webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['vendor']
    }),
    new  webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: 'body',
    }),
  ]
}
