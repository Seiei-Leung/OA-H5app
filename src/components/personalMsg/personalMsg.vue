<template>
	<div class="personalMsg-component">
    	<div class="personalHook" style="padding-top: 50px;">
            <div class="personMsg">
                <div class="avatar">
                    <img src="./img/tab-profile-active.png">
                </div>
                <div class="txt" id="staffName">{{user.Code}}</div>
            </div>
            <div class="MsgWrapper">
                <div>
                    <div class="title">员工工号：</div><div class="contentTxt" id="staffID">{{user.EmployeeNo}}</div>
                </div>
                <div>
                    <div class="title">员工姓名：</div><div class="contentTxt" id="staffDepartment">{{user.Name}}</div>
                </div>
            </div>
            <button class="weui-btn weui-btn_primary signout" @click="signout">登 出</button>
    	</div>
	</div>
</template>

<script>
export default {
	data: function(){
        return {
            user: JSON.parse(this.$store.state.userMsg)
        };
    },
    created: function() {
        this.$store.commit("showIndexComponents");
    },
    methods: {
        signout: function() {
            this.$store.state.userMsg = "";
            localStorage.userMsg = "";
            localStorage.forOApersonID = "";
            this.$router.push({name: "signin"});
        }
    },
    // 路由离开时触发
    beforeRouteLeave (to, from, next) {
        this.$store.commit("hideIndexComponents");
        next();
    }
}
</script>

<style scoped>
.personalHook .personMsg {
    width: 100%;
    height: 50px;
    background-color: #fff;
    font-size: 0;
}
.personalHook .personMsg .avatar {
    display: inline-block;
    margin-top: 5px;
    margin-left: 20px;
    width: 40px;
    height: 40px;
    vertical-align: top;
    background-color: #aaa;
    border-radius: 100%;
}
.personalHook .personMsg .avatar img {
    width: 100%;
    height: 100%;
}
.personalHook .personMsg .txt {
    display: inline-block;
    margin-left: 1em;
    line-height: 50px;
    font-size: 18px;
    color: #444;
}
.MsgWrapper {
    margin: 3px;
    margin-top: 10px;
    padding: 0.5em;
    font-size: 18px;
    color: #444;
    background-color: #fff;
    border-radius: 4px;
}
.MsgWrapper .title {
    vertical-align: top;
    display: inline-block;
    width: 40%;
    line-height: 32px;
    text-align: center;
}
.MsgWrapper .contentTxt {
    vertical-align: top;
    display: inline-block;
    width: 60%;
    height: 28px;
    text-align: center;
    border-bottom: 1px solid #ddd
}
.signout {
    margin-top: 30px;
    width: 80%!important;
}
.weui-cell__bd p {
    font-size: 16px;
}
.weui-cell {
    padding: 15px;
}
</style>