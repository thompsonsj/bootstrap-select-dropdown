const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
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
  }
};
