'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

// 利用 express 框架 模拟接口提供数据
const express = require('express')
const app = express()
var apiRouters = express.Router()
app.use('/api', apiRouters)

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    // 模拟接口
    before(app) {
      // 登录接口
      app.get('/api/signin', (req, res) => {
        res.json({
          errno: 0,
          data: [1,2]
        })
      }),
      app.get('/api/getToDoList', (req, res) => {
        res.json({
          errno: 0,
          data: [
            {name: "frmPackOutApprove",modname: "装车扫描审批",title: "装车扫描审批",cnt: 832},
            {name: "frmModuleApply",modname: "TXT开发需求申请",title: "系统模块开发申请",cnt: 2},
            {name: "frmModuleApp_FP",modname: "开发任务分配",title: "系统模块开发申请",cnt: 6},
            {name: "frmModuleApp_ZX",modname: "TXT需求完成确认",title: "系统模块开发申请",cnt: 1}
          ]
        })
      }),
      app.get('/api/workingtable', (req, res) => {
        res.json({
          errno: 0,
          data: [
            {
              feild1: 10176,
              feild2: "TZA969",
              feild3: "跟单-钟秀青",
              feild4: "2017-06-06T00:00:00",
              feild5: 52,
              feild6: "SM",
              serialno: "0000DD03-5293-4A95-8F4A-1950094128BC",
              billno: "7CAA96C1-5DD9-43FC-9462-E58E30DF3B2F",
              fieldcnt: 6,
              fields: "feild1-出货总件数,feild2-车牌号,feild3-跟单,feild4-出货日期,feild5-出货总箱数,feild6-客户"
            },
            {
              feild1: 10176,
              feild2: "TZA969",
              feild3: "跟单-钟秀青",
              feild4: "2017-06-06T00:00:00",
              feild5: 52,
              feild6: "SM",
              serialno: "0000DD03-5293-4A95-8F4A-1950094128BC",
              billno: "7CAA96C1-5DD9-43FC-9462-E58E30DF3B2F",
              fieldcnt: 6,
              fields: "feild1-出货总件数,feild2-车牌号,feild3-跟单,feild4-出货日期,feild5-出货总箱数,feild6-客户"
            }
          ]
        })
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
