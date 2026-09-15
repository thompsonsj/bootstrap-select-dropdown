const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const handlebarsPlugin = require('./webpack.handlebars')
const version = require('./package.json').version

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
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              api: 'modern',
              sassOptions: {
                quietDeps: true,
                silenceDeprecations: [
                  'import',
                  'slash-div',
                  'global-builtin',
                  'color-functions',
                  'abs-percent'
                ]
              }
            }
          }
        ]
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: ['$']
        }
      },
      {
        test: require.resolve('fuse.js'),
        loader: 'expose-loader',
        options: {
          exposes: ['Fuse']
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'docs')
    },
    port: 9000
  },
  plugins: [
    new webpack.DefinePlugin({
      __BSD_VERSION__: JSON.stringify(version)
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    }),
    handlebarsPlugin()
  ]
}
