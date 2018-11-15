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
    filename: 'js/[name].bundle.js',
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
          //     publicPath: '../../dist/assets/imgs',
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
              publicPath: '../../dist/assets/imgs',
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
              limit: 1024 * 5,
              publicPath: '../../dist/assets/fonts',
              useRelativePath: true
              // 其实，上边两句可以用下边一句代替
              // 因为name是以顶层的output为起点的，所以不需要这么麻烦的找路径
              // name: 'assets/fonts/[name]_[hash:8].[ext]'
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

  // 下边演示第三方js文件用法

  // 方法一：直接挂在window对象上，然后用externals
  // 如果是在html文档中直接引入，是可以直接使用的。但是不可以在js文件中作为模块import或者require
  // 这时候需要用到externals，告诉webpack这个东西你不用管，只管按照我写的require来，到时候会找得到的。
  // 这种方式很干净，不会把js库打包进来
  // externals: {
  //   'jQuery': 'window.jQuery',
  // },

  // 方法二：用npm的方式，用webpack.ProvidePlugin来处理。
  // 这时候，不需要再js文件里import我们需要的jQuery，webpack会自动去node_modules寻找
  // 这种方式会把js库打包进来。唯一的好处是不需要在js里写require语句了，我不知道有什么用！！！

  // 方法三：把js库放到本地目录下。用resolve别名
  // 也是用webpack.ProvidePlugin

  resolve: {
    alias: {
      // 后边的$符号：确切的匹配。把jquery关键字匹配匹配到某文件
      jquery$: path.resolve(__dirname, 'src/libs/jquery2.14.min.js')
    }
  },
  plugins: [
    // 把css提取到单独的文件。这时候就不会自动添加到文档中的style了
    new ExtractTextPlugin({
      filename: 'css/[name].min.css'     // 提取出来的css叫什么名字
    }),

    // 引入第三方js库之  方法二
    // new webpack.ProvidePlugin({
    //   $: 'jQuery'  // key是我们引用的名字，value是模块的名字
    // })

    // 引入第三方库之  方法三
    new webpack.ProvidePlugin({
      $: 'jquery'  // 这里跟方法二的区别是，这里回去找别名。注意，与别名名称一致
    })
  ]
}