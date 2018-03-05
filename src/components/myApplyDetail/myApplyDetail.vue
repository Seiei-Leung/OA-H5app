<template>
	<div class="myApplyDetail-component">
		<div class="top_title">
    	    <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i>返回</a>
    	    <div>申请进度</div>
    	</div>
		<div v-for="billno in billnoList">
			<div class="billno-time">
				-- {{billno.createdtime}} --
			</div>
			<div  class="billno">
				<div class="billno-item">
					<span>事项：</span>
					<span>{{billno.displayname}}</span>
				</div>
				<div class="billno-item">
					<span>状态显示：</span>
					<span>{{billno.state}}</span>
				</div>
				<div class="billno-item">
					<span>完成用户：</span>
					<span>{{billno.actorid}}</span>
				</div>
				<div class="billno-item">
					<span>创建时间：</span>
					<span>{{billno.createdtime}}</span>
				</div>
				<div class="billno-item">
					<span>签收时间：</span>
					<span>{{billno.claimedtime}}</span>
				</div>
				<div class="billno-item">
					<span>完成时间：</span>
					<span>{{billno.endtime}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			billnoList: []
		}
	},
	created: function() {
		let billno = this.$route.params.billno;
        // 注释代码用于开发环境或实际项目接口
        // /api/getMyApplyDetail
        // "http://192.168.1.213:38080/estapi/api/FlowApprove/GetMyApplySchedule?billno=" + billno
		this.$http.get("http://192.168.1.213:38080/estapi/api/FlowApprove/GetMyApplySchedule?billno=" + billno).then(resp => {
			this.billnoList = resp.body;
		})
	}
}
</script>

<style scoped>
.myApplyDetail-component {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
	padding-bottom: 2em;
    overflow: scroll;
	background-color: #f5f5f5;
	z-index: 1;
}
.billno-time {
	margin-top: 1em;
	text-align: center;
	color: #999;
}
.billno {
	margin: auto;
	margin-top: 1em;
	padding: 1em;
	width: 85%;
	background-color: #fff;
	border-radius: 10px;
	color: #444;
}
.billno-item span:first-child{
	display: inline-block;
	min-width: 6em;
	color: #169fe6;
}
</style>