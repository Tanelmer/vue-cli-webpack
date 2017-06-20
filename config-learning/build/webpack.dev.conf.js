// webpack.dev.conf.js在webpack.base.conf的基础上增加完善了开发环境下面的配置
/**
 1.将hot-reload相关的代码添加到entry chunks
 2.合并基础的webpack配置
 3.使用styleLoaders
 4.配置Source Maps
 5.配置webpack插件
 */
// 引入相关依赖
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
// 一个可以合并数组和对象的插件
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
// 一个用于生成HTML文件并自动注入依赖文件（link/script）的webpack插件
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 用于更友好地输出webpack的警告、错误等信息
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
// 这是上面的第一点 热重载与entry相关联
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// 合并基础的webpack配置
module.exports = merge(baseWebpackConfig, {
  // 配置样式文件的处理规则，使用styleLoaders
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  // 配置Source Maps。在开发中使用cheap-module-eval-source-map更快 这是纯翻译~~~ 晚点去找找这个玩意干啥的
  // 开发总是离不开调试，如果可以更加方便的调试当然就能提高开发效率，
  // 不过打包后的文件有时候你是不容易找到出错了的地方对应的源代码的位置的，
  // Source Maps就是来帮我们解决这个问题的。
  // 通过简单的配置后，Webpack在打包时可以为我们生成的source maps，
  // 这为我们提供了一种对应编译文件和源文件的方法，使得编译后的代码可读性更高，也更容易调试。
  // 有四种配置 - 构建速度与完整性成反比关系
  devtool: '#cheap-module-eval-source-map', //这是最快的一种 但是有些东西可能会不完整，官网说的

  // webpack插件配置
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    // 报错不会阻塞，但是会在编译结束后报错
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
