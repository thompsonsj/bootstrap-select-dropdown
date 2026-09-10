const path = require('path')
const webpack = require('webpack')
const handlebarsPlugin = require('./webpack.handlebars')
const version = require('./package.json').version

const babelRule = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
}

const defineVersion = new webpack.DefinePlugin({
  __BSD_VERSION__: JSON.stringify(version)
})

const shared = {
  entry: {
    'bootstrap-select-dropdown': './src/dist.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  externals: {
    'fuse.js': 'Fuse',
    jquery: '$'
  },
  module: {
    rules: [babelRule]
  }
}

module.exports = [
  {
    ...shared,
    output: {
      ...shared.output,
      filename: '[name].min.js'
    },
    optimization: {
      minimize: true
    },
    plugins: [defineVersion, handlebarsPlugin()]
  },
  {
    ...shared,
    output: {
      ...shared.output,
      filename: '[name].js'
    },
    optimization: {
      minimize: false
    },
    plugins: [defineVersion]
  }
]
