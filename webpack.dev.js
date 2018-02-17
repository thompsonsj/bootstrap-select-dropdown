const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: './src/docs.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs')
  },
  devServer: {
    contentBase: path.join(__dirname, "docs"),
    compress: true,
    port: 9000
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ]
});
