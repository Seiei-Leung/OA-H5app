<template>
	<div class="myApplyDetail-component">
		<div class="top_title">
    	    <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i><span>返回</span></a>
    	    <div>申请进度</div>
    	</div>
		<div v-for="(billno, index) in billnoList">
			<div class="billno-time">
				-- {{billno.createdtime}} --
				<div class="num-ball">{{index + 1}}</div>
			</div>
			<div  class="billno">
				<div class="blue-line">
					<div class="triangle" v-show="index + 1 < billnoLength">
					</div>
				</div>
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
        // "http://59.33.36.124:38080/estapi/api/FlowApprove/GetMyApplySchedule?billno=" + billno
		this.$http.get(this.seieiURL + "/estapi/api/FlowApprove/GetMyApplySchedule?billno=" + billno).then(resp => {
			this.billnoList = resp.body;
		})
	},
	computed: {
		billnoLength: function() {
			let length = this.billnoList.length;
			return length;
		}
	}
}
</script>

<style scoped>
.billno-time {
	position: relative;
	margin-top: 1em;
	text-align: center;
	color: #999;
}
.billno-time .num-ball{
	position: absolute;
    top: 0;
    left: 3%;
    background-color: #169fe6;
    color: #fff;
    width: 1.8em;
    height: 1.8em;
    text-align: center;
    line-height: 1.8em;
    border-radius: 100%;
}
.billno {
	position: relative;
	margin: 1em 0 0 12%;
	padding: 1em;
	width: 75%;
	background-color: #fff;
	border-radius: 10px;
	color: #444;
}
.billno .blue-line {
	position: absolute;
	top: 0;
	left: -7%;
	width: 1px;
	height: 100%;
	background-color: #169fe6;
}
.billno .blue-line .triangle {
	position: absolute;
	bottom: -10px;
	left: -6px;
	width: 0;
	height: 0;
	border:6px solid transparent;
	border-top: 10px solid #169fe6;
}
.billno-item span:first-child{
	display: inline-block;
	min-width: 6em;
	color: #169fe6;
}
</style>