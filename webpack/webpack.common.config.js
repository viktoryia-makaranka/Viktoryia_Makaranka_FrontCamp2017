const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = (env) => {
  const isProd = env === 'production';
  return {
    entry: [
      'babel-polyfill',
      'fetch-polyfill',
      './src/js/index.js',
    ],
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
          },
        }, {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
          },
        }, {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
            }, {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer({
                  browsers: ['last 2 version'],
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
        }],
    },
    plugins: [
      new ExtractTextPlugin('[name].css', {
        allChunks: false,
        disable: !isProd,
      }),
      new HtmlWebpackPlugin({
        title: 'Webpack by Viktoryia Makaranka',
        template: './src/index.html',
      }),
      new CleanWebpackPlugin(['../docs'], {
        root: path.resolve(__dirname, '../'),
        verbose: true,
        allowExternal: true,
      }),
    ],
  };
}
