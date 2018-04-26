<template>
	<!-- 工作台 -->
	<div class="workbench-component" style="z-index: -1;">	
	<div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_small-appmsg">
            <div class="weui-cells">
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="goDataCube">
                    <div class="weui-cell__hd">
                    	<!-- 相片引用使用 相对路径 -->
                    	<img src="./img/icon_4.png" alt="数据魔方" class="iconImg">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>数据魔方</p>
                    </div>
                	<span class="weui-cell__ft"></span>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="goDB">
                    <div class="weui-cell__hd">
                    	<img src="./img/icon_11.png" alt="通知公告" class="iconImg">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>通知公告</p>
                    </div>
                	<span class="weui-cell__ft"></span>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="goSchedule">
                    <div class="weui-cell__hd">
                    	<img src="./img/icon_16.png" alt="日程" class="iconImg">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>日程</p>
                    </div>
                	<span class="weui-cell__ft"></span>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="gotimeCard">
                    <div class="weui-cell__hd">
                        <img src="./img/timg2.jpg" alt="考勤查询" class="iconImg">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>考勤查询</p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="gotimeCardXLF">
                    <div class="weui-cell__hd">
                        <img src="./img/timg.jpg" alt="效率分查询" class="iconImg">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>效率分查询</p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="gotimeCardZSGZ">
                    <div class="weui-cell__hd">
                        <img src="./img/timg4.png" alt="效率分查询" class="iconImg">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>计时查询</p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="gotimeCardSS">
                    <div class="weui-cell__hd">
                        <img src="./img/timg3.jpg" alt="膳食查询" class="iconImg">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>膳食查询</p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:void(0);">
                    <div class="weui-cell__hd">
                        <img src="./img/icon_7.png" alt="业务查询" class="iconImg">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>业务查询</p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:void(0);">
                    <div class="weui-cell__hd">
                    	<img src="./img/icon_5.png" alt="预警" class="iconImg">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>预警</p>
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
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="goWhere('myapply')">
                    <div class="weui-cell__hd">
                        <img src="./img/icon_16.png" alt="待办事项" class="iconImg">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p style="position: relative;">我的申请<span class="weui-badge redPoint">{{myApplyNum}}</span></p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="goUpLoadimg()">
                    <div class="weui-cell__hd">
                    	<img src="./img/icon_21.png" alt="上传图片" class="iconImg">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>上传图片</p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="goMap()">
                    <div class="weui-cell__hd">
                    	<img src="./img/icon_37.png" alt="出差约车" class="iconImg">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>出差约车</p>
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
            toast: '审批成功'
        };
    },
    created: function() {
        // 注释代码用于开发环境或实际项目接口
        // /api/getToDoList
        // http://59.33.36.124:38080/estapi/api/FlowApprove/GetMyApprove?actorid=fang
        // /api/getMyApplys
        // http://59.33.36.124:38080/estapi/api/FlowApprove/GetMyApply?actorid1=fang
        this.$http.get(this.seieiURL + "/estapi/api/FlowApprove/GetMyApprove?actorid=" + JSON.parse(this.$store.state.userMsg).Code).then(resp=>{
          // resp.body = resp.body.data;
          resp.body.forEach((item) => {
            this.todoListNum += item.cnt;
          });
        }, response => {
            console.log("发送失败"+response.status+","+response.statusText);
        });
        this.$http.get(this.seieiURL + "/estapi/api/FlowApprove/GetMyApply?actorid1=" + JSON.parse(this.$store.state.userMsg).Code).then(resp=>{
          // resp.body = resp.body.data;
          resp.body.forEach((item) => {
            this.myApplyNum += item.cnt;
          });
        }, response => {
            console.log("发送失败"+response.status+","+response.statusText);
        });
    },
	methods: {
        // 进入公告通知
        goDB: function() {
            this.$router.push({name: 'announcement'});
        },
        // 进入待办事项
        goWhere: function(arg) {
            this.$router.push({name: 'todoList', params: {where: arg}});
        },
        // 进入数据魔方
        goDataCube: function() {
            this.$router.push({name: 'dataCube'});
        },
        // 进入日程表
        goSchedule: function() {
            window.open('./schedule.html', '_self');
        },
        // 进入地图
        goMap: function() {
            window.open('./map.html', '_self');
        },
        // 进入上传图片
        goUpLoadimg: function() {
            window.open('./UpLoadimg.html', '_self');
        },
        // 进入考勤查询
        gotimeCard: function() {
            window.open('./KQ2/timeCard.html', '_self');
        },
        // 进入效率分查询
        gotimeCardXLF: function() {
            window.open('./KQ2/timeCardXLF.html', '_self');
        },
        // 进入膳食查询
        gotimeCardSS: function() {
            window.open('./KQ2/timeCardSS.html', '_self');
        },
        // 进入计时查询
        gotimeCardZSGZ: function() {
            window.open('./KQ2/timeCardZSGZ.html', '_self');
        }
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