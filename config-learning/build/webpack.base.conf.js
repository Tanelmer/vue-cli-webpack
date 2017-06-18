//引入依赖包
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 入口文件，路径相对于本文件所在的位置，可以写成字符串、数组、对象
  entry: {
    // path.resolve([from ...], to) 将to参数解析为绝对路径
    app: './src/main.js'
  },
  // 输出配置
  output: {
    // 输出文件，路径相对于本文件所在的位置
    path: config.build.assetsRoot,
    filename: '[name].js',
    // publicPath
    // 1.该属性的好处在于当你配置了图片CDN的地址，本地开发时引用本地的图片资源，上线打包时就将资源全部指向正式了，
    // 如果没有确定的发布地址不建议配置该属性，特别是在打包图片时，路径很容易出现混乱，如果没有设置，则默认从站点根目录加载
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    // require时省略的扩展名，遇到.js、.vue、.json结尾的也要去加载
    extensions: ['.js', '.vue', '.json'],

    //模块别名地址，方便后续直接引用别名，无须写长长的地址，注意如果后续不能识别该别名，需要先设置root
    //设置别名 是为了使用独立构建 npm默认是使用运行时构建 vue官网有两种构建方式的区别
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  //模块加载器
  module: {
    rules: [
      // loader相当于gulp里的task，用来处理在入口文件中require的和其他方式引用进来的文件，
      // test是正则表达式，匹配要处理的文件；
      // loader匹配要使用的loader，"-loader"可以省略；
      // include把要处理的目录包括进来，exclude排除不处理的目录
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        // 把较小的图片转换成base64的字符串内嵌在生成的js文件里 name指明了输出的命名规则
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        // 把较小的图标转换成base64的字符串内嵌在生成的js文件里 name指明了输出的命名规则
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
