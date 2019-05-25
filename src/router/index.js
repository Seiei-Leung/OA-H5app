import Vue from 'vue';
import Router from 'vue-router';
import workbench from '@/components/workbench/workbench?v=2019-5-14';
import addressBook from '@/components/addressBook/addressBook?v=2018-6-7';
import signin from '@/components/signin/signin';
/* import announcement from '@/components/announcement/announcement'; */
import todoList from '@/components/todoList/todoList?v=2018-5-7';
import workingTable from '@/components/workingTable/workingTable?v=2018-5-10';
import announcementDetail from '@/components/announcementDetail/announcementDetail';
import myApplyDetail from '@/components/myApplyDetail/myApplyDetail';
import personalMsg from '@/components/personalMsg/personalMsg';
import tabledetail from '@/components/tabledetail/tabledetail';
import businessQuery from '@/components/businessQuery/businessQuery';
import sourcePlan from '@/components/sourcePlan/sourcePlan?v=2018-10-29';
import serialnoDetail from '@/components/serialnoDetail/serialnoDetail';
import cuttingbedReport from '@/components/cuttingbedReport/cuttingbedReport?v=2018-5-31';
import productScheduleQuery from '@/components/productScheduleQuery/productScheduleQuery?v=2018-5-24';
import visitMsg from '@/components/visitMsg/visitMsg';
import clientCheck from '@/components/clientCheck/clientCheck';
import markSpecifications from '@/components/markSpecifications/markSpecifications';
import integration from '@/components/integration/integration';
import messagePage from '@/components/messagePage/messagePage';
import addOrMinusIntegration from '@/components/addOrMinusIntegration/addOrMinusIntegration';
import myCoupon from '@/components/myCoupon/myCoupon';
import myIntegration from '@/components/myIntegration/myIntegration';
import integrationRanking from '@/components/integrationRanking/integrationRanking';
import myAuditOfIntegration from '@/components/myAuditOfIntegration/myAuditOfIntegration';
import integrationDetail from '@/components/integrationDetail/integrationDetail';
import integrationAnnouncement from '@/components/integrationAnnouncement/integrationAnnouncement';
import integrationAppraise from '@/components/integrationAppraise/integrationAppraise';
import integrationSuggest from '@/components/integrationSuggest/integrationSuggest';
import awardMsg from '@/components/awardMsg/awardMsg';
import integrationMsg from '@/components/integrationMsg/integrationMsg';
import myMedal from '@/components/myMedal/myMedal';
import integrationMission from '@/components/integrationMission/integrationMission';
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
    // 消息
    {
      path: '/messagePage',
      name: 'messagePage',
      component: messagePage,
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
/*     {
      path: '/announcement',
      name: 'announcement',
      component: announcement,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    }, */
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
    // 来访记录查询
    {
      path: '/visitMsg',
      name: 'visitMsg',
      component: visitMsg,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    // 来访记录查询
    {
      path: '/clientCheck',
      name: 'clientCheck',
      component: clientCheck,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    // FILA唛头规格分解
    {
      path: '/markSpecifications',
      name: 'markSpecifications',
      component: markSpecifications,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    // 积分中心
    {
      path: '/integration',
      name: 'integration',
      component: integration,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    // 积分奖扣
    {
      path: '/addOrMinusIntegration',
      name: 'addOrMinusIntegration',
      component: addOrMinusIntegration,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    // 我的奖卷
    {
      path: '/myCoupon',
      name: 'myCoupon',
      component: myCoupon,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    // 我的积分
    {
      path: '/myIntegration/:kind',
      name: 'myIntegration',
      component: myIntegration,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    // 奖分排名
    {
      path: '/integrationRanking/:kind',
      name: 'integrationRanking',
      component: integrationRanking,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    // 积分我的审核
    {
      path: '/myAuditOfIntegration',
      name: 'myAuditOfIntegration',
      component: myAuditOfIntegration,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    // 积分详情
    {
      path: '/integrationDetail/:kind',
      name: 'integrationDetail',
      component: integrationDetail,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    // 积分我的审核
    {
      path: '/integrationAnnouncement',
      name: 'integrationAnnouncement',
      component: integrationAnnouncement,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    // 积分任务大厅
    {
      path: '/integrationMission',
      name: 'integrationMission',
      component: integrationMission,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    // 积分服务评价
    {
      path: '/integrationAppraise',
      name: 'integrationAppraise',
      component: integrationAppraise,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    // 奖项详情
    {
      path: '/awardMsg',
      name: 'awardMsg',
      component: awardMsg,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    // 奖分详情
    {
      path: '/integrationMsg',
      name: 'integrationMsg',
      component: integrationMsg,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    // 我的奖牌
    {
      path: '/myMedal',
      name: 'myMedal',
      component: myMedal,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    // 改善建议
    {
      path: '/integrationSuggest',
      name: 'integrationSuggest',
      component: integrationSuggest,
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
    },

  ]
})
