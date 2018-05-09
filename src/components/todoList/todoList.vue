<template>
	<div class="todoList-component">
		<div class="top_title">
    	    <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i><span>返回</span></a>
    	    <div>{{titleName}}</div>
            <i class="icon-grid" @click="showAsGrid" v-show="isShowAsList"></i>
            <i class="icon-list" @click="showAsList" v-show="!(isShowAsList)"></i>
    	</div>
        <!-- 待办事项列表 -->
        <div class="weui-media-box weui-media-box_small-appmsg" style="margin-top: 48px;" v-show="isShowAsList">
            <div class="weui-cells">
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" v-for="(todo, index) in todoList" @click="goWorkingTable(todo.name, todo.title)">
                    <div class="weui-cell__hd">
                        <img class="iconImg" v-bind:src="'http://www.seieiblog.top:38080/oa/KQ/img/' + index + '.png'">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>{{todo.modname}}<span class="weui-badge redPoint">{{todo.cnt}}</span></p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </a>
            </div>
        </div>
        <!-- 待办事项九宫格 -->
		<div class="weui-grids" style="margin-top: 50px;background-color: #fff;color:#444" v-show="!(isShowAsList)">
    	    <a href="javascript:void(0);" class="weui-grid" v-for="(todo, index) in todoList" @click="goWorkingTable(todo.name, todo.title)">
    	        <div class="weui-grid__icon">
    	            <img v-bind:src="'http://www.seieiblog.top:38080/oa/KQ/img/' + index + '.png'" v-bind:alt="todo.modname">
    	        	<span class="weui-badge">{{todo.cnt}}</span>
    	        </div>
    	        <p class="weui-grid__label">{{todo.modname}}</p>
    	    </a> 
    	</div>
	</div>
</template>

<script>
export default {
    data: function() {
        return {
            todoList: [],
            present: this.$route.params.where,
            istodoList: this.$route.params.where == 'todolist',
            ismyApply: this.$route.params.where == 'myapply',
            titleName: '',
            isShowAsList: localStorage.isShowAsList == "false" ? false : true
        };
    },
    created: function() {
        // 注释代码用于开发环境或实际项目接口
        // /api/getToDoList
        // http://59.33.36.124:38080/estapi/api/FlowApprove/GetMyApprove?actorid=fang
        // /api/getMyApplys
        // http://59.33.36.124:38080/estapi/api/FlowApprove/GetMyApply?actorid1=fang
        let url;
        if (this.istodoList) {
            this.titleName = '待办事项';
            url = JSON.parse(this.$store.state.userMsg).EmployeeNo == 91548 ? this.seieiURL + "/estapi/api/FlowApprove/GetMyApprove?actorid=andylao" : this.seieiURL + "/estapi/api/FlowApprove/GetMyApprove?actorid=" + JSON.parse(this.$store.state.userMsg).Code; // 当前页面内容为 审核表单
        } else if (this.ismyApply) {
            this.titleName = '我的申请';
            url = JSON.parse(this.$store.state.userMsg).EmployeeNo == 91548 ? this.seieiURL + "/estapi/api/FlowApprove/GetMyApply?actorid=fang" : this.seieiURL + "/estapi/api/FlowApprove/GetMyApply?actorid1=" + JSON.parse(this.$store.state.userMsg).Code; // 当前页面内容为 我的申请
        }
        this.$http.get(url).then(resp=>{
          // this.todoList = resp.body.data;
          this.todoList = resp.body;
          console.log(resp.body);
        }, response => {
            console.log("发送失败"+response.status+","+response.statusText);
        });
    },
	methods: {
		goWorkingTable: function(kind, title) {
            let present = this.present;
			this.$router.push({name: "workingTable", params: {classname: kind, titlename: title, where: present}});
		},
        showAsGrid: function(){
            localStorage.isShowAsList = false;
            this.isShowAsList = false;
        },
        showAsList: function(){
            localStorage.isShowAsList = true;
            this.isShowAsList = true;
        }
	}
}
</script>

<style scoped>
.todoList-component {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
    overflow: scroll;
	background-color: #f5f5f5;
	z-index: 1;
}
.weui-grid__icon {
	position: relative;
}
.iconImg {
    display:block;
    width: 30px;
    margin-right:5px;
}
.weui-badge {
    position: absolute;
    left: 20px;
    top: -10px;
}
.redPoint {
    position: absolute;
    top: 0.6em;
    left: 2.5em;
}
.icon-grid,
.icon-list {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    width: 48px;
    line-height: 48px;
}
</style>
