const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCss = new ExtractTextPlugin('./bootstrap-select-dropdown.css');
const extractCssMin = new ExtractTextPlugin('./bootstrap-select-dropdown.css');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    "bootstrap-select-dropdown" : "./src/dist.js",
    "bootstrap-select-dropdown.min" : "./src/dist.js",
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js"
  },
  externals: {
    jquery: 'jQuery'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [path.resolve('node_modules')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: [path.resolve('node_modules')],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader", "sass-loader"]
        })
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve('src/scss/_common.scss'),
        to: path.resolve('dist/_bootstrap-select-dropdown.scss')
      }
    ]),
    new ExtractTextPlugin('[name].css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/g
    }),
    new UglifyJsPlugin({
      include: /\.min\.js$/
    })
  ]
};
