import 'babel-polyfill'

let func = () => {return 12}
const NUM = 34
let arr = [1, 2, 3]
let arr1 = arr.map(item => item * 2)

// 发现，这个Set还是没有被转换。
// 需要babel polyfill 和 babel runtime transform

// 那么，babel-loader和babel-core为什么不一次性到位呢？
// 因为babel-core针对的是语法。不针对函数和方法

console.log('new Set(arr1) = ' + new Set(arr1))