<template>
	<div class="todoList-component">
		<div class="top_title">
    	    <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i>返回</a>
    	    <div>{{titleName}}</div>
    	</div>
    	<!-- 待办事项九宫格 -->
		<div class="weui-grids" style="margin-top: 1rem;background-color: #fff;color:#444">
    	    <a href="javascript:void(0);" class="weui-grid" v-for="todo in todoList" @click="goWorkingTable(todo.name, todo.title)">
    	        <div class="weui-grid__icon">
    	            <img src="./img/icon_16.png" v-bind:alt="todo.modname">
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
            titleName: ''
        };
    },
    created: function() {
        // 注释代码用于开发环境或实际项目接口
        // /api/getToDoList
        // http://192.168.1.213:38080/estapi/api/FlowApprove/GetMyApprove?actorid=fang
        // /api/getMyApplys
        // http://192.168.1.213:38080/estapi/api/FlowApprove/GetMyApply?actorid1=fang
        let url;
        if (this.istodoList) {
            this.titleName = '待办事项';
            url = "http://192.168.1.213:38080/estapi/api/FlowApprove/GetMyApprove?actorid=fang"; // 当前页面内容为 审核表单
        } else if (this.ismyApply) {
            this.titleName = '我的申请';
            url = "http://192.168.1.213:38080/estapi/api/FlowApprove/GetMyApply?actorid1=fang"; // 当前页面内容为 我的申请
        }
        this.$http.get(url).then(resp=>{
          // this.todoList = resp.body.data;
          this.todoList = resp.body;
        }, response => {
            console.log("发送失败"+response.status+","+response.statusText);
        });
    },
	methods: {
		goWorkingTable: function(kind, title) {
            let present = this.present;
			this.$router.push({name: "workingTable", params: {classname: kind, titlename: title, where: present}});
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
.weui-badge {
	margin-left: 5px;
	position:absolute;
	top:-8px;
	right:-8px;
}
</style>
