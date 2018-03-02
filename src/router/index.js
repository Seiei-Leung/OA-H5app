import Vue from 'vue'
import Router from 'vue-router'
import workbench from '@/components/workbench/workbench'
import addressBook from '@/components/addressBook/addressBook'
import signin from '@/components/signin/signin'
import announcement from '@/components/announcement/announcement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'workbench',
      component: workbench
    },
    {
      path: '/addressBook',
      name: 'addressBook',
      component: addressBook
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
    },
    {
      path: '/announcement',
      name: 'announcement',
      component: announcement
    }
  ]
})
