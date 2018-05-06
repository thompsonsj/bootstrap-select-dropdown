const path = require('path');
const WebpackAutoInject = require('webpack-auto-inject-version');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

module.exports = {
  entry: './src/docs.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs')
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
      },
      {
      test: require.resolve('jquery'),
      use: [
        {
          loader: 'expose-loader',
          options: '$'
          }
        ]
      },
      {
      test: require.resolve('fuse.js'),
      use: [
        {
          loader: 'expose-loader',
          options: 'Fuse'
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "docs"),
    //compress: true,
    port: 9000
  },
  plugins: [
    new WebpackAutoInject({
        components: {
            AutoIncreaseVersion: false,
            InjectAsComment: false
        }
    }),
    new ExtractTextPlugin('bundle.css'),
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
    })
  ]
};
