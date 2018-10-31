> 知识点一：Entry、Output、Loaders、Plugins

> 知识点二：名词解释

> Chunk 就是指代码块

> Bundle 一捆、一束。一般指被打包后的代码

> Module 模块。比如loaders处理完之后的就是module
 
# 1 Entry
- 代码的入口，打包的入口。单个或多个.
- 可以是字符串、数组、对象。用对象最方便、灵活。
```javascript
// 字符串
module.exports = {
  entry: 'index.js'
}
// 数组
module.exports = {
  entry: ['index.js', 'login.js']
}
// 对象
module.exports = {
  entry: {
    index: ['index.js', 'app.js'],
    login: 'login.js'
  }
}
```
# 2 Output
- 打包成的文件;一个或多个;自定义规则；配合cdn
```javascript
// v2.0版本后，默认打包结构就是这样。
// 这样很显然不灵活，所以需要改成对象形式.
module.exports = {
  entry: 'index.js',
  output: {
    filename: 'index.min.js'
  }  
}

// 修改版本
 module.exports = {
  entry: {
    index: 'index.js',
    login: 'login.js'
  },
  output: {
    filename: '[name].min.[hash:8].js'
  }
} 
```
# 3 Loaders
- 处理文件，转化成模块
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
         use: 'css-loader'
      }]
  }  
}
```
# 4 Plugins
- 参与打包整个过程
- 打包优化和压缩
- 配置编译时的变量
- 及其灵活
```javascript
module.exports = {
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({})
  ]
}
```

**常用插件**
1. 优化相关
    - CommonsChunkPlugin
    - UglifyjsWebpackPlugin
2. 功能相关
    - 	ExtractTextWebpackPlugin
    -	HtmlWebpackPlugin
    -	HotModuleReplacementPlugin
    -	CopyWebpackPlugin


