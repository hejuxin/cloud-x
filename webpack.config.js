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
}