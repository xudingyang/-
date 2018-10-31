module.exports = {
  mode: 'development',
  entry: {
    app: './app.js'
  },
  output: {
    // filename: '[name].[hash:8].js'
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // use 可以是一个单独的loader。也可以是一个对象
        // use: 'babel-loader',
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  'browsers': ['>0.25%', 'last 2 versions']
                  // chrome: 60
                  // ie: 6
                }
              }]
            ]
          }
        },
        // exclude 排除在规则之外。比如node_modules肯定不需要转换的
        exclude: '/node_modules/'
      }
    ]
  }
}