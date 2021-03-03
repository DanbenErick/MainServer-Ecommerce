const path = require('path')

const config = {
  entry : 'src/index.js',
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  }
}

module.exports = config