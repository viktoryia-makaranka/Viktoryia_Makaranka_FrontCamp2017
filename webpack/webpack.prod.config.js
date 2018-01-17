const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const path = require('path');

module.exports = merge(common('production'), {
  output: {
    path: path.resolve(__dirname, '../docs'),
    publicPath: '',
    filename: 'js/[name].[chunkhash].bundle.js',
    chunkFilename: 'js/[name].[chunkhash].bundle.js',
    sourceMapFilename: 'js/[name].[chunkhash].map',
  },
});