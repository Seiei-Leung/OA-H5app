import Vue from 'vue';
import Router from 'vue-router';
import workbench from '@/components/workbench/workbench';
import addressBook from '@/components/addressBook/addressBook';
import signin from '@/components/signin/signin';
import announcement from '@/components/announcement/announcement';
import todoList from '@/components/todoList/todoList';
import workingTable from '@/components/workingTable/workingTable';

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
    // 待办事项
    {
      path: '/todolist',
      name: 'todoList',
      component: todoList
    },
    // 审核表单
    {
      path: '/workingtable/:classname',
      name: 'workingTable',
      component: workingTable
    }
  ]
})
