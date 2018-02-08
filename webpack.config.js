const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractVendor = new ExtractTextPlugin('../docs/vendor-libraries.css');
const extractPlugin = new ExtractTextPlugin('./bootstrap-select-dropdown.css');

module.exports = {
  entry: './src/docs.js',
  /*{
    'vendor-libraries': './src/vendor-libraries.js',
    'bootstrap-select-dropdown': './src/bootstrap-select-dropdown.js'
  },*/
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
      /*{
        test: /vendor-libraries\.scss$/,
        exclude: [path.resolve('node_modules')],
        use: extractVendor.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader", "sass-loader"]
        })
      },
      {
        test: /bootstrap-select-dropdown\.scss$/,
        exclude: [path.resolve('node_modules')],
        use: extractPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader", "sass-loader"]
        })
      },*/
      {
      test: require.resolve('jquery'),
      use: [
        /*{
          loader: 'expose-loader',
          options: 'jQuery'
        },
        {
          loader: 'expose-loader',
          options: 'window.jQuery'
        },*/
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
    //extractVendor,
    //extractPlugin
    /*new CopyWebpackPlugin([
      {
        // Copy Bootstrap SCSS to source
        context: resolve('./node_modules'),
        from: 'bootstrap/scss',
        to: resolve(plConfig.paths.source.scss, '02-bootstrap')
      },
      {
        // Copy CKEditor source to public
        context: resolve('./node_modules'),
        from: 'ckeditor',
        to: resolve(plConfig.paths.public.js, 'ckeditor')
      },
      {
        // Copy Google Code Prettify source to public
        context: resolve('./node_modules'),
        from: 'google-code-prettify/src',
        to: resolve(plConfig.paths.public.js, 'google-code-prettify')
      }
    ])*/
  ],
  devServer: {
    contentBase: path.join(__dirname, "docs"),
    compress: true,
    port: 9000
  }
};
