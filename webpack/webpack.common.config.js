const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

const extractLess = new ExtractTextPlugin('[name].css');

module.exports =  {
  entry: [
    'babel-polyfill',
    'fetch-polyfill',
    './src/js/index.js',
  ],
  output: {
    path: path.resolve(__dirname, '../docs'),
    publicPath: '',
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].bundle.js',
    sourceMapFilename: 'js/[name].map',
  },
  resolve: {
    alias: {
      App: path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', {
              targets: {
                browsers: ['last 2 versions', 'ie >= 10'],
              },
            }]],
          },
        },
      }, {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      }, {
        test: /\.less$/,
        use: extractLess.extract({
          use: [{
            loader: 'css-loader',
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({
                browsers: ['last 2 version', 'ie >= 10'],
              })],
            },
          }, {
            loader: 'less-loader',
          }],
          fallback: 'style-loader',
        }),
      }, {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './images/[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    extractLess,
    new HtmlWebpackPlugin({
      title: 'Webpack by Viktoryia Makaranka',
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(['../docs']),
  ],
};