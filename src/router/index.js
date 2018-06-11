import Vue from 'vue';
import Router from 'vue-router';
import workbench from '@/components/workbench/workbench';
import addressBook from '@/components/addressBook/addressBook?v=2018-6-7';
import signin from '@/components/signin/signin';
import announcement from '@/components/announcement/announcement';
import todoList from '@/components/todoList/todoList?v=2018-5-7';
import workingTable from '@/components/workingTable/workingTable?v=2018-5-10';
import announcementDetail from '@/components/announcementDetail/announcementDetail';
import dataCube from '@/components/dataCube/dataCube';
import schedule from '@/components/schedule/schedule';
import myApplyDetail from '@/components/myApplyDetail/myApplyDetail';
import personalMsg from '@/components/personalMsg/personalMsg';
import tabledetail from '@/components/tabledetail/tabledetail';
import businessQuery from '@/components/businessQuery/businessQuery';
import sourcePlan from '@/components/sourcePlan/sourcePlan?v=2018-5-28';
import serialnoDetail from '@/components/serialnoDetail/serialnoDetail';
import cuttingbedReport from '@/components/cuttingbedReport/cuttingbedReport?v=2018-5-31';
import productScheduleQuery from '@/components/productScheduleQuery/productScheduleQuery?v=2018-5-24';
import test from '@/components/test/test';

Vue.use(Router);

export default new Router({
  routes: [
    // 工作台
    {
      path: '/',
      name: 'workbench',
      component: workbench,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    // 通讯录
    {
      path: '/addressBook',
      name: 'addressBook',
      component: addressBook,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    // 登陆
    {
      path: '/signin',
      name: 'signin',
      component: signin,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    // 通知公告
    {
      path: '/announcement',
      name: 'announcement',
      component: announcement,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    // 待办事项 或 我的申请
    {
      path: '/todolist/:where',
      name: 'todoList',
      component: todoList,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    // 审核表单 或 我的申请详情
    {
      path: '/workingtable/:classname/:titlename/:where',
      name: 'workingTable',
      component: workingTable,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    // 公告详情
    {
      path: '/announcementdetail',
      name: 'announcementDetail',
      component: announcementDetail,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    // 数据魔方
    {
      path: '/datacube',
      name: 'dataCube',
      component: dataCube,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    // 日程表
    {
      path: '/schedule',
      name: 'schedule',
      component: schedule,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    // 我的申请进度详情页面
    {
      path: '/myapplydetail/:billno',
      name: 'myApplyDetail',
      component: myApplyDetail,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    // 个人中心
    {
      path: '/personalMsg',
      name: 'personalMsg',
      component: personalMsg,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    // 副表
    {
      path: '/tabledetail',
      name: 'tabledetail',
      component: tabledetail,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    // 业务查询
    {
      path: '/businessQuery',
      name: 'businessQuery',
      component: businessQuery,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    // 物料计划
    {
      path: '/sourcePlan',
      name: 'sourcePlan',
      component: sourcePlan,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    // 制单细数
    {
      path: '/serialnoDetail/:serialno/:orderno/:custname/:ordernonum',
      name: 'serialnoDetail',
      component: serialnoDetail,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    // 裁床报告
    {
      path: '/cuttingbedReport',
      name: 'cuttingbedReport',
      component: cuttingbedReport,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    // 生产排期查询
    {
      path: '/productScheduleQuery',
      name: 'productScheduleQuery',
      component: productScheduleQuery,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    // 测试
    {
      path: '/test',
      name: 'test',
      component: test,
      meta: {
        keepAlive: false // 需要被缓存
      }
    }
  ]
})
