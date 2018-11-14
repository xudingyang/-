var webpack = require('webpack')
var path = require('path')
// webpack4要按照最新版的。 npm install --save-dev extract-text-webpack-plugin@next
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              insertInto: '#app',  // style标签插入到 #app下。默认是插入到head标签里
              singleton: true      // 是否只使用一个style标签
            }
          },
          use: [
            {
              loader: 'css-loader'
            },
            // postcss-loader 写在css-loader和less-loader之间
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('autoprefixer')(),    // 补充前缀
                  require('cssnano')({
                    preset: 'default'
                  })
                ]
              }
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      }
    ]
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
  plugins: [
    // 把css提取到单独的文件。这时候就不会自动添加到文档中的style了
    new ExtractTextPlugin({
      filename: '[name].min.css'     // 提取出来的css叫什么名字
    })
  ]
}