const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './static/favicon',
          to: 'favicon/',
        },
        { from: './static/robots.txt' },
        { from: './static/og-image.png' },
        { from: './static/sw.js' },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './static/index.html',
    }),
    new EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new BundleAnalyzerPlugin({ analyzerMode: process.env.CI ? 'disable' : 'static' }),
    new MiniCssExtractPlugin(),
  ],
  output: {
    filename: '[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
};
