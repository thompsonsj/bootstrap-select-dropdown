const path = require('path')
const HandlebarsPlugin = require('handlebars-webpack-plugin')
const { encode } = require('html-entities')

module.exports = function handlebarsPlugin () {
  return new HandlebarsPlugin({
    entry: path.join(process.cwd(), 'src', 'views', '*.hbs'),
    output: path.join(process.cwd(), 'docs', '[name].html'),
    data: require('./src/views/data.json'),
    partials: [
      path.join(process.cwd(), 'src', 'views', 'partials', '*', '*.hbs')
    ],
    helpers: {
      htmlentities: function (context) {
        return encode(context)
      },
      jsonoption: function (value) {
        if (value == 'boolean_false') {
          return 'false'
        }
        if (value == 'boolean_true') {
          return 'true'
        }
        return value
      }
    }
  })
}
