<template>
	<div class="personalMsg-component">
		<div class="signin_page">
    	    <div class="top_title">
    	    	<a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i>首页</a>
    	        <div>登录</div>
    	    </div>
    	    <div class="signin_wrapper" style="color:#444;line-height: 2em">
    	    	<div class="name">
    	    		<i class="icon-user2"></i><input type="text" name="" placeholder="请输入用户名" v-model="userName">
    	    	</div>
    	    	<div class="password">
    	    		<i class="icon-unlock"></i><input type="password" name="" placeholder="请输入密码" v-model="userPW">
    	    	</div>
    	    </div>
    	    <div class="signin_btn">
    	    	<button class="weui-btn weui-btn_primary" @click="signin">登录</button>
    	    	<div class="notsignin_btn">
    	    		<span class="signup fl">快速注册</span>
    	    		<span class="forgetpw fr">忘记密码？</span>
    	    	</div>
    	    </div>
		</div>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			userName: '',
			userPW: ''
		};
	},
	methods: {
		// 登陆事件
		signin: function() {
			if (String.trim(this.userName) == '' || String.trim(this.userPW) == '') {
				alert('请输入账号和密码');
			} else {
				localStorage.userMsg = [1,2]
				this.$store.state.userMsg = [1,2];
				// this.$http.get("http://192.168.1.213:38080/estapi/api/User/GetLogin",{
				// 			params: {
    //                             username: this.userName,
    //                             password: this.userPW
				// 			}
    //                         }).then(resp=>{  
    //                             console.log(resp);  
    //                         },response => {  
    //                             console.log("发送失败"+response.status+","+response.statusText);  
    //                         });  
			}
		}
	}
}
</script>

<style scoped>
.personalMsg-component {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
	background-color: #f5f5f5;
	z-index: 1
}
.signin_page .signin_wrapper {
	margin-top:1rem;
	background-color: #fff;
}
.signin_page .signin_wrapper input{
	font-size: 1.2em;
	box-sizing: border-box;
	height: 1.5rem;
	width: 85%;
	padding-left:0.5em;
	font-size: 1.5em;
	vertical-align: top;
}
.signin_page .signin_wrapper .name input{
	border-bottom: 1px solid #e5e5e5;
	border-radius: 0
}
.icon-user2,.icon-unlock {
	color:#999;
	display: inline-block;
	box-sizing: border-box;
	text-align: center;
	font-size: 2em;
	padding-top: 0.4em;
	width: 15%;
	height: 1.5rem
}
.signin_btn {
	padding:0 1em;
	margin-top: 1rem
}
.signin_btn button {
	width: 100%;
}
.signin_btn .notsignin_btn {
	margin-top: 1em;
	overflow: hidden;
	font-size: 1.2em
}
.signin_btn .notsignin_btn span {
	text-decoration: underline;
}
</style>