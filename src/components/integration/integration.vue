<template>
	<div class="integration-component">
		<div class="top_title">
    	    <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i><span>返回</span></a>
    	    <div>快乐有奖分</div>
    	</div>
        <!-- 待办事项九宫格 -->
        <div class="weui-grids" style="margin-top: 50px;background-color: #fff;color:#444">
            <a href="javascript:void(0);" class="weui-grid">
                <div class="weui-grid__icon">
                    <img v-bind:src="'http://www.etscn.com.cn:38080/oa/KQ/img/积分 (1).png'">
                </div>
                <p class="weui-grid__label">我的奖分</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid">
                <div class="weui-grid__icon">
                    <img v-bind:src="'http://www.etscn.com.cn:38080/oa/KQ/img/排名.png'">
                </div>
                <p class="weui-grid__label">奖分排名</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid" @click="addOrMinusIntegration">
                <div class="weui-grid__icon">
                    <img v-bind:src="'http://www.etscn.com.cn:38080/oa/KQ/img/增加减少仓位.png'">
                </div>
                <p class="weui-grid__label">奖分扣分</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid">
                <div class="weui-grid__icon">
                    <img v-bind:src="'http://www.etscn.com.cn:38080/oa/KQ/img/2.png'">
                </div>
                <p class="weui-grid__label">我的审核</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid">
                <div class="weui-grid__icon">
                    <img v-bind:src="'http://www.etscn.com.cn:38080/oa/KQ/img/奖金.png'">
                </div>
                <p class="weui-grid__label">我的奖票</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid">
                <div class="weui-grid__icon">
                    <img v-bind:src="'http://www.etscn.com.cn:38080/oa/KQ/img/详情页-分享.png'">
                </div>
                <p class="weui-grid__label">奖扣详情</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid">
                <div class="weui-grid__icon">
                    <img v-bind:src="'http://www.etscn.com.cn:38080/oa/KQ/img/喇叭 (1).png'">
                </div>
                <p class="weui-grid__label">公告</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid">
                <div class="weui-grid__icon">
                    <img v-bind:src="'http://www.etscn.com.cn:38080/oa/KQ/img/案例大厅.png'">
                </div>
                <p class="weui-grid__label">任务大厅</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid">
                <div class="weui-grid__icon">
                    <img v-bind:src="'http://www.etscn.com.cn:38080/oa/KQ/img/考勤.png'">
                </div>
                <p class="weui-grid__label">考勤</p>
            </a>
        </div>
	</div>
</template>

<script>
export default{
	data: function(){
		return {
			
		};
	},
	methods: {
		addOrMinusIntegration: function() {
            this.$router.push({name: 'addOrMinusIntegration'});
        },
	}
}
</script>

<style scoped>
.integration-component {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling : touch;
	background-color: #f5f5f5;
	z-index: 1;
}
.iconImg {
    display:block;
    width: 30px;
    margin-right:5px;
}
</style>