const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = () => ({
  devtool: 'inline-source-map',

  entry: [
    path.resolve(__dirname, 'src/index.js')
  ],

  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }, {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      }
    ]
  },

  devServer: {
    contentBase: './src',
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack by Viktoryia Makaranka',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new CleanWebpackPlugin(['../docs'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      allowExternal: true,
    }),
  ],
})