const nodeExternals = require('webpack-node-externals');

const path = require('path')

module.exports = () => ({
  devtool: 'inline-source-map',

  target: 'node',

  externals: [nodeExternals()],

  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/router.js'),
  ],

  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle-server.js',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
    ],
  },

})