<template>
	<div class="todoList-component">
		<div class="top_title">
    	    <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i>首页</a>
    	    <div>待办事项</div>
    	</div>
    	<!-- 待办事项九宫格 -->
		<div class="weui-grids" style="margin-top: 1rem;background-color: #fff;color:#444">
    	    <a href="javascript:void(0);" class="weui-grid" v-for="todo in todoList" @click="goWorkingTable(todo.name)">
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
            todoList: []
        };
    },
    created: function() {
        // 注释代码用于开发环境或实际项目接口
        // /api/getToDoList
        // http://192.168.1.213:38080/estapi/api/FlowApprove/GetMyApprove?actorid=fang
        this.$http.get("/api/getToDoList").then(resp=>{
          this.todoList = resp.body.data;
          // this.todoList = resp.body;
        }, response => {
            console.log("发送失败"+response.status+","+response.statusText);
        });
    },
	methods: {
		goWorkingTable: function(kind) {
			this.$router.push({name: "workingTable", params: {classname: kind}});
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
