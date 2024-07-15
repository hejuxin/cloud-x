const path = require('path');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    cloud: './index.js',
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset',
      },
    ]
  }
}