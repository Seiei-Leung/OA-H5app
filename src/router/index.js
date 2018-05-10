import Vue from 'vue';
import Router from 'vue-router';
import workbench from '@/components/workbench/workbench';
import addressBook from '@/components/addressBook/addressBook';
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
import sourcePlan from '@/components/sourcePlan/sourcePlan';

Vue.use(Router);

export default new Router({
  routes: [
    // 工作台
    {
      path: '/',
      name: 'workbench',
      component: workbench
    },
    // 通讯录
    {
      path: '/addressBook',
      name: 'addressBook',
      component: addressBook
    },
    // 登陆
    {
      path: '/signin',
      name: 'signin',
      component: signin
    },
    // 通知公告
    {
      path: '/announcement',
      name: 'announcement',
      component: announcement
    },
    // 待办事项 或 我的申请
    {
      path: '/todolist/:where',
      name: 'todoList',
      component: todoList
    },
    // 审核表单 或 我的申请详情
    {
      path: '/workingtable/:classname/:titlename/:where',
      name: 'workingTable',
      component: workingTable
    },
    // 公告详情
    {
      path: '/announcementdetail',
      name: 'announcementDetail',
      component: announcementDetail
    },
    // 数据魔方
    {
      path: '/datacube',
      name: 'dataCube',
      component: dataCube
    },
    // 日程表
    {
      path: '/schedule',
      name: 'schedule',
      component: schedule
    },
    // 我的申请进度详情页面
    {
      path: '/myapplydetail/:billno',
      name: 'myApplyDetail',
      component: myApplyDetail
    },
    // 个人中心
    {
      path: '/personalMsg',
      name: 'personalMsg',
      component: personalMsg
    },
    // 副表
    {
      path: '/tabledetail',
      name: 'tabledetail',
      component: tabledetail
    },
    // 业务查询
    {
      path: '/businessQuery',
      name: 'businessQuery',
      component: businessQuery
    },
    // 物料计划
    {
      path: '/sourcePlan',
      name: 'sourcePlan',
      component: sourcePlan
    }
  ]
})
