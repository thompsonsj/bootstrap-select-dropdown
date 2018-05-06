const path = require('path');
const WebpackAutoInject = require('webpack-auto-inject-version');
const Entities = require('html-entities').AllHtmlEntities;
const HandlebarsPlugin = require("handlebars-webpack-plugin");
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
      }
    ]
  },
  plugins: [
    new WebpackAutoInject({
        components: {
            AutoIncreaseVersion: false,
            InjectAsComment: false
        }
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
        },
        jsonoption: function(value) {
          if (value == 'boolean_false') {
            return 'false';
          }
          if (value == 'boolean_true') {
            return 'true';
          }
          return value;
        }
      }
    }),
    new UnminifiedWebpackPlugin({
      //include: /\.js$/i
    })
  ]
};
