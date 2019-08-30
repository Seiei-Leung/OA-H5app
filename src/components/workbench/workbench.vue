<template>
	<!-- 工作台 -->
	<div class="workbench-component" style="z-index: -1;">	
	<div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_small-appmsg">
            <div class="weui-cells">
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="goBusinessQuery">
                    <div class="weui-cell__hd">
                        <img src="./img/icon_5.png" alt="业务查询" class="iconImg">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>业务查询</p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="goWhere('todolist')">
                    <div class="weui-cell__hd">
                        <img src="./img/icon_41.png" alt="待办事项" class="iconImg">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p style="position: relative;">待办事项<span class="weui-badge redPoint">{{todoListNum}}</span></p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="goVisitMsg" v-if="isShowVisitMsg">
                    <div class="weui-cell__hd">
                        <img src="./img/icon_4.png" alt="来访记录查询" class="iconImg">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p style="position: relative;">来访记录查询</p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="goClientCheck">
                    <div class="weui-cell__hd">
                        <img src="./img/icon_16.png" alt="客户型号对照" class="iconImg">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p style="position: relative;">客户型号对照</p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="goMarkSpecifications">
                    <div class="weui-cell__hd">
                        <img src="./img/icon_16.png" alt="FILA唛头规格分解" class="iconImg">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p style="position: relative;">FILA唛头规格分解</p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="goFootStepOfFile">
                    <div class="weui-cell__hd">
                        <img src="./img/icon_7.png" alt="文件交收查询" class="iconImg">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p style="position: relative;">文件交收查询</p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </a>
            </div>
        </div>
    </div>
	</div>
</template>

<script>

export default {
    data: function() {
        return {
            todoListNum: 0,
            myApplyNum: 0,
            toast: '审批成功',
            isShowVisitMsg: false
        };
    },
    created: function() {
        if (this.$store.state.userMsg == "") {
            this.$router.push({ name: "signin" });
        } else {
            var that = this;
            this.$store.commit("showIndexComponents");
            if (JSON.parse(this.$store.state.userMsg).checkinflag) {
                this.isShowVisitMsg = true;
            }
            
            this.$http.get(this.seieiURL + "/estapi/api/FlowApprove/GetMyApprove?actorid=" + JSON.parse(this.$store.state.userMsg).Code).then(resp=>{
              // resp.body = resp.body.data;
              resp.body.forEach((item) => {
                that.todoListNum += item.cnt;
              });
            
              that.$http.get(that.seieiURL + "/estapi/api/FlowApprove/GetMyApply?actorid1=" + JSON.parse(that.$store.state.userMsg).Code).then(resp=>{
                // resp.body = resp.body.data;
                resp.body.forEach((item) => {
                  that.myApplyNum += item.cnt;
                });
              }, response => {
                  console.log("发送失败"+response.status+","+response.statusText);
              });

            }, response => {
                console.log("发送失败"+response.status+","+response.statusText);
            });
        }
    },
	methods: {
        // 进入文件交收查询
        goFootStepOfFile: function() {
            this.$router.push({name: 'footStepOfFile'});
        },
        // 进入待办事项
        goWhere: function(arg) {
            this.$router.push({name: 'todoList', params: {where: arg}});
        },
        // 进入数据魔方
        goDataCube: function() {
            this.$router.push({name: 'dataCube'});
        },
        // 进入业务查询
        goBusinessQuery: function(){
            this.$router.push({name: 'businessQuery'});
        },
        // 进入日程表
        goSchedule: function() {
            window.open('./schedule.html', '_self');
        },
        // 进入地图
        goMap: function() {
            window.open('./map.html', '_self');
        },
        // 进入访客记录
        goVisitMsg: function() {
            this.$router.push({name: "visitMsg"});
        },
        // 进入奖分中心
        goIntegration: function() {
            this.$router.push({name: "integration"});
        },
        goClientCheck: function() {
            this.$router.push({name: "clientCheck"});
        },
        goMarkSpecifications: function() {
            this.$router.push({name: "markSpecifications"});
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
.workbench-component {
	margin:48px 0 3rem 0;
}
.iconImg {
	display:block;
	width:20px;
	margin-right:5px;
}
.redPoint {
	position: absolute;
	top: -0.4em;
	left: 5.2em;
}
</style>