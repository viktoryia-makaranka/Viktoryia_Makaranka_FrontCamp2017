const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const webpack = require('webpack');

module.exports = merge(common('develop'), {
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../docs'),
    publicPath: '',
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].bundle.js',
    sourceMapFilename: 'js/[name].map',
  },
  devServer: {
    contentBase: '../docs',
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});