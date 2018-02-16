const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractVendor = new ExtractTextPlugin('../docs/vendor-libraries.css');
const extractPlugin = new ExtractTextPlugin('./bootstrap-select-dropdown.css');

module.exports = {
  entry: './src/docs.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: [path.resolve('node_modules')],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader", "sass-loader"]
        })
      },
      {
      test: require.resolve('jquery'),
      use: [
        {
          loader: 'expose-loader',
          options: '$'
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ],
  devServer: {
    contentBase: path.join(__dirname, "docs"),
    compress: true,
    port: 9000
  }
};
