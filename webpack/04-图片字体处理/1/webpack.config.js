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
              // insertInto: '#app',  // style标签插入到 #app下。默认是插入到head标签里
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
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [

          // file-loader的处理比较简陋。一般用url-loader。url-loader包含file-loader的功能
          // {
          //   loader: 'file-loader',
          //   options: {
          //     publicPath: '../dist/assets/imgs',
          //     useRelativePath: true
          //   }
          // }

          // 下边演示url-loader.
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
              // 小于这个值的图片，用base64打包。 这里的单位是B
              // 如果图片大于这个值，那么还是按照file-loader的方式打包。这也是需要配置publicPath与useRelativePath的原因
              limit: 1024 * 90,
              publicPath: '../dist/assets/imgs',
              useRelativePath: true
            }
          }
        ]
      },
      {
        test: /\.(eot|otf|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
              limit: 1024 * 5,
              publicPath: '../dist/assets/fonts',
              useRelativePath: true
            }
          }
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
  plugins: [
    // 把css提取到单独的文件。这时候就不会自动添加到文档中的style了
    new ExtractTextPlugin({
      filename: '[name].min.css'     // 提取出来的css叫什么名字
    })
  ]
}