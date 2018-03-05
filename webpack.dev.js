const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HandlebarsPlugin = require("handlebars-webpack-plugin");

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
      //data: path.join(__dirname, "src", "views", "data.json"),
      data: require("./src/views/data.json"),
      partials: [
          path.join(process.cwd(), "src", "views", "components", "*", "*.hbs")
      ],
      helpers: {
          nameOfHbsHelper: Function.prototype,
          projectHelpers: path.join(process.cwd(), "app", "helpers", "*.helper.js")
      },
      onBeforeSetup: function (Handlebars) {},
      onBeforeAddPartials: function (Handlebars, partialsMap) {},
      onBeforeCompile: function (Handlebars, templateContent) {},
      onBeforeRender: function (Handlebars, data) {},
      onBeforeSave: function (Handlebars, resultHtml, filename) {},
      onDone: function (Handlebars, filename) {}
  })
  ]
});
