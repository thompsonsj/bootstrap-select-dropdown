const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

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
    new ExtractTextPlugin('bundle.css'),
    new HandlebarsPlugin({
      entry: path.join(process.cwd(), "src", "views", "*.hbs"),
      output: path.join(process.cwd(), "docs", "[name].html"),
      data: require("./src/views/data.json"),
      helpers: {
        htmlentities: function(context, options) {
          return entities.encode( context );
        }
      }
    })
  ]
});
