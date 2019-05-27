import Vue from 'vue';
import Vuex from 'vuex';

// 全局使用vuex
Vue.use(Vuex);

let UserMsg = localStorage.userMsg ? localStorage.userMsg : "";
let UserMsgForIntegration = localStorage.UserMsgForIntegration ? localStorage.UserMsgForIntegration : "";

export default new Vuex.Store({
	state: {
		// 用户登陆信息
		tableDetailData: [],
		userMsg: UserMsg,
		userMsgForIntegration: UserMsgForIntegration, // 用户级别信息
		isShowIndexComponents: false, // 是否显示首页图标
	},
	mutations: {
		// 切换是否显示首页图标
		showIndexComponents: function(state) {
			state.isShowIndexComponents = true;
		},
		hideIndexComponents: function(state) {
			state.isShowIndexComponents = false;
		}
	}
})