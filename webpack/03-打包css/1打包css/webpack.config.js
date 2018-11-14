var webpack = require('webpack')
var path = require('path')

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
        test: /\.css$/,
        use: [

          // 下边是生成style标签的方式
          // style-loader  是在文档中创建style标签。不是link标签
          // css-loader    是让js可以引入css，即把css搞成模块
          // 下边的顺序不能反。放在后边的先处理。即，从后往前的处理css
          {
            loader: 'style-loader',
            options: {
              insertInto: '#app'  // style标签插入到 #app下。默认是插入到head标签里
            }
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true  // 是否压缩css
            }
          },
          {
            // 处理less，只需要把less-loader写在最后边就行了。把less转成css后，再交给css-loader和style-loader处理
            loader: 'less-loader'
          }

          // 下边是生成link标签的方式
          // 此时要配置publicPath
          // 这种方式并不常用，因为不能引入多个link。
          /**
          {
            loader: 'style-loader/url'
          },
          {
            loader: 'file-loader'
          }
           */
        ]
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
  plugins: []
}