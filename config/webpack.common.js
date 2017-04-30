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
          test: /\.(jpg|jpeg|gif|png)$/,
          loader:'url-loader?limit=1024&name=images/[name].[ext]'
      },
      {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
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
