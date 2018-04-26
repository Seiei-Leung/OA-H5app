import Vue from 'vue';
import Vuex from 'vuex';

// 全局使用vuex
Vue.use(Vuex);

let UserMsg = localStorage.userMsg ? localStorage.userMsg : [];

export default new Vuex.Store({
	state: {
		// 用户登陆信息
		tableDetailData: [],
		userMsg: UserMsg,
		seieiURL: "http://www.seieiblog.top:38080"
	}
})