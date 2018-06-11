// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router?v=2018-6-7'
import Common from './common'
import VueResource from 'vue-resource';
import store from  './store'


Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(Common);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
