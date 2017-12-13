const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const extractLess = new ExtractTextPlugin({
  filename: 'styles.css',
});

module.exports = {
  entry: [
    'babel-polyfill',
    'fetch-polyfill',
    './src/js/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs'),
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        loader: 'eslint-loader',
        query: {
          configFile: '.eslintrc',
        },
      }, {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      }, {
        test: /\.less$/,
        use: extractLess.extract({
          use: ['css-loader', 'postcss-loader', 'less-loader'],
          fallback: 'style-loader',
        }),
      }, {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './images/[hash].[ext]',
          },
        },
      }],
  },
  plugins: [
    extractLess,
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          /* your eslint loader config */
        },
      },
    }),
  ],
};