var path = require('path');

module.exports = {
  entry: './javascript/towerball.js',
  output: {
    path: path.resolve(__dirname, 'javascript'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: [/\.js?$/],
        exclude: /(node_modules)/
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};