const extractVendor = new ExtractTextPlugin('../docs/vendor-libraries.css');
const extractPlugin = new ExtractTextPlugin('./bootstrap-select-dropdown.css');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: './src/dist.js',
  output: {
    filename: 'bootstrap-select-dropdown.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, "docs"),
    compress: true,
    port: 9000
  }
});
