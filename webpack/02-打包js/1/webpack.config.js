module.exports = {
  mode: 'development',
  entry: {
    // entry 的路径要写对。相对路径、绝对路径都可以。当然，我肯定写相对路径。
    // app: '/Users/xudingyang/HTML/frontend-knowledge/webpack/02-打包js/1/app.js'
    app: './app.js'
  },
  output: {
    // filename: '[name].[hash:8].js'
    filename: '[name].js'
  }
}