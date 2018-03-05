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
      // todoList 接口
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
      // 进入待办事项接口
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
      }),
      // 我的申请接口
      app.get('/api/getMyApplys', (req, res) => {
        res.json({
          errno: 0,
          data: [
            {
              id: "2c826305-ecb3-4447-a690-54f73d2858ca,9981bb37-05fe-4c56-80b8-d81760e40d3a,8409db2e-19ae-4f5f-96d0-20b92eac0db9,4a42a4e2-7d69-44b1-b631-6197b881d650,61a3a4ff-be9c-437e-84b1-731cbb8f2f2f,4e23112d-93d8-4675-b10c-46dcbf6da412,c1937b7c-217e-4292-8f04-6923817eb0d3,584b6353-75b5-4529-af3a-318fc558fbe1,886878b8-d851-45b0-89da-1e5fd5efaa0a,ce566246-b859-4f20-b6c2-18195bd1132b,28782703-3a8e-4baf-b516-37110d7d558d,aa42aae9-f551-4437-98bd-101ce3245726,547b4d4f-0ad6-4637-86b8-6461d4bd2880,a13edcf3-5af9-45a5-828e-85c522b604b1",
              title: "每月绩效审核",
              name: "frmMonthPerform",
              modname: "每月绩效",
              cnt: 14
            },
            {
              id: "3adff173-181b-4348-9d7e-84d254fc45c1,efe24d8b-8fd5-47b2-8e76-cba26d3410a8,c36e50f7-f905-41f0-881a-e195aa186ebe,16f4cbc2-6d3e-4187-9f8c-7d9df52a77ef,3d0c3812-79a3-4bdf-9826-803e9ad4c7e4,318a55d9-b171-420c-9083-0cf4d000706d,0ad3b581-d90b-4f42-a30f-1f0d59d02648,3296530c-6a2f-447c-a505-a3b5b7f39aaa,22838dad-2b16-4a2b-8176-e1ee752fff14",
              title: "系统模块开发申请",
              name: "frmModuleApply",
              modname: "TXT开发需求申请",
              cnt: 9
            }
          ]
        })
      }),
      app.get('/api/getMyApplyList', (req, res) => {
        res.json({
          errno: 0,
          data: [
              {
                feild1: 1,
                feild2: "方剑伟",
                feild3: 2017,
                feild4: 3,
                feild5: "2017-02-10T00:00:00",
                feild6: "170210MP_004",
                serialno: "28782703-3a8e-4baf-b516-37110d7d558d",
                billno: "170210MP_004",
                fieldcnt: 6,
                fields: "feild1-月份,feild2-主管名称,feild3-年份,feild4-总人数,feild5-日期,feild6-单据号"
              },
              {
                feild1: 2,
                feild2: "方剑伟",
                feild3: 2017,
                feild4: 3,
                feild5: "2017-03-07T00:00:00",
                feild6: "170307MP_005",
                serialno: "2c826305-ecb3-4447-a690-54f73d2858ca",
                billno: "170307MP_005",
                fieldcnt: 6,
                fields: "feild1-月份,feild2-主管名称,feild3-年份,feild4-总人数,feild5-日期,feild6-单据号"
              }
            ]
        })
      }),
      app.get('/api/getMyApplyDetail', (req, res) => {
        res.json({
          errno: 0,
          data: [
              {
                displayname: "申请",
                state: "完成",
                createdtime: "2018-03-05 10:37:27",
                claimedtime: "2018-03-05 10:37:27",
                endtime: "2018-03-05 10:37:27",
                stepnum: 1,
                actorid: "fang"
              },
              {
                displayname: "绩效审批",
                state: "签收",
                createdtime: "2018-03-05 10:37:28",
                claimedtime: "2018-03-05 10:37:28",
                endtime: "0001-01-01 12:00:00",
                stepnum: 2,
                actorid: "ZC-CWH1-ZMF"
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
