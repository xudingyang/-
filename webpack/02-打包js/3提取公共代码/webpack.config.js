var webpack = require('webpack')
var path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    pageA: './src/pageA',
    pageB: './src/pageB',
    // vendor: ['lodash']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  },
  plugins: []
}