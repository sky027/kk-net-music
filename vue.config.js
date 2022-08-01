'use strict'

process.env.VUE_APP_VERSION = new Date().toLocaleString()

const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const publicPath = process.env.NODE_ENV === 'development' ? '/' : ''
module.exports = {
  publicPath,
  outputDir: 'dist',
  assetsDir: 'static',
  // 是否控制台显示eslint信息。
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: 3060,
    proxy: {
      '/api': {
        target: 'https://testsd.cicd.vpclub.cn',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // build完后是否自动打开
    open: true,
    // 通过设置让浏览器 overlay 是否同时显示警告和错误：
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: config => {
    // 基础公共配置。

    // 设置别名。
    config.resolve.alias = {
      '@': resolve('src'),
      '@images': resolve('src/assets/images')
    }

    // 为生产环境修改配置...
    if (process.env.NODE_ENV === 'production') {
      // 添加BundleAnalyzerPlugin插件。
      config.mode = 'production'

      // 打包分析工具。
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

      // Gzip压缩。
      const CompressionPlugin = require('compression-webpack-plugin')

      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerPort: 9527,
          openAnalyzer: true,
          analyzerMode: 'server'
        }),
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css/, // 匹配文件名
          threshold: 1024 * 10, // 对超过10K的数据进行压缩。
          deleteOriginalAssets: false // 是否删除源文件。
        })

      )
      // 修改terserOptions.compress,用于去除生产console和debugger等信息。
      Object.assign(config.optimization.minimizer[0].options.terserOptions.compress, {
        warnings: false,
        // drop_console: true,
        drop_console: false,
        drop_debugger: true
        // pure_funcs: ['console.log']
      })
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
  }
}
