const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Entities = require('html-entities').AllHtmlEntities;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCss = new ExtractTextPlugin('./bootstrap-select-dropdown.css');
const extractCssMin = new ExtractTextPlugin('./bootstrap-select-dropdown.css');
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

const entities = new Entities();

module.exports = {
  entry: {
    "bootstrap-select-dropdown" : "./src/dist.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].min.js"
  },
  externals: {
    "fuse.js": 'Fuse',
    jquery: '$'
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
    new ExtractTextPlugin('[name].min.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/g
    }),
    new HandlebarsPlugin({
      entry: path.join(process.cwd(), "src", "views", "*.hbs"),
      output: path.join(process.cwd(), "docs", "[name].html"),
      data: require("./src/views/data.json"),
      partials: [
        path.join(process.cwd(), "src", "views", "partials", "*", "*.hbs")
      ],
      helpers: {
        htmlentities: function(context, options) {
          return entities.encode( context );
        }
      }
    }),
    new UnminifiedWebpackPlugin({
      //include: /\.js$/i
    })
  ]
};
