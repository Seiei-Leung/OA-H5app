<template>
	<div class="businessQuery-component">
		<div class="top_title">
    	    <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i><span>返回</span></a>
    	    <div>业务查询</div>
            <i class="icon-grid" @click="showAsGrid" v-show="isShowAsList"></i>
            <i class="icon-list" @click="showAsList" v-show="!(isShowAsList)"></i>
    	</div>
        <!-- 待办事项列表 -->
        <div class="weui-media-box weui-media-box_small-appmsg" style="margin-top: 48px;" v-show="isShowAsList">
            <div class="weui-cells">
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="goSourcePlan">
                    <div class="weui-cell__hd">
                        <img class="iconImg" v-bind:src="'http://www.seieiblog.top:38080/oa/KQ/img/1.png'">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>物料计划</p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </a>
            </div>
            <div class="weui-cells">
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="goCuttingbedReport">
                    <div class="weui-cell__hd">
                        <img class="iconImg" v-bind:src="'http://www.seieiblog.top:38080/oa/KQ/img/2.png'">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>裁床报表</p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </a>
            </div>
            <div class="weui-cells">
                <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="goProductScheduleQuery">
                    <div class="weui-cell__hd">
                        <img class="iconImg" v-bind:src="'http://www.seieiblog.top:38080/oa/KQ/img/3.png'">
                    </div>
                    <div class="weui-cell__bd weui-cell_primary">
                        <p>生产排期查询</p>
                    </div>
                    <span class="weui-cell__ft"></span>
                </a>
            </div>
        </div>
        <!-- 待办事项九宫格 -->
		<div class="weui-grids" style="margin-top: 50px;background-color: #fff;color:#444" v-show="!(isShowAsList)">
    	    <a href="javascript:void(0);" class="weui-grid" @click="goSourcePlan">
    	        <div class="weui-grid__icon">
    	            <img v-bind:src="'http://www.seieiblog.top:38080/oa/KQ/img/1.png'">
    	        </div>
    	        <p class="weui-grid__label">物料计划</p>
    	    </a>
    	    <a href="javascript:void(0);" class="weui-grid">
    	        <div class="weui-grid__icon">
    	            <img v-bind:src="'http://www.seieiblog.top:38080/oa/KQ/img/2.png'">
    	        </div>
    	        <p class="weui-grid__label">裁床报表</p>
    	    </a>
    	</div>
	</div>
</template>

<script>
export default{
	data: function(){
		return {
			isShowAsList: localStorage.isShowAsListForBusinessQuery == "false" ? false : true
		};
	},
	methods: {
		showAsGrid: function(){
            localStorage.isShowAsListForBusinessQuery = false;
            this.isShowAsList = false;
		},
        showAsList: function(){
            localStorage.isShowAsListForBusinessQuery = true;
            this.isShowAsList = true;
        },
        goSourcePlan:function(){
        	this.$router.push({name: 'sourcePlan'});
        },
        goCuttingbedReport: function() {
            this.$router.push({name: "cuttingbedReport"});
        },
        goProductScheduleQuery: function() {
            this.$router.push({name: "productScheduleQuery"});
        }
	},
    beforeRouteLeave: function(to,from,next) {
        to.meta.keepAlive = false;
        setTimeout(function() {
            next();
        }, 1000);
    }
}
</script>

<style scoped>
.businessQuery-component {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
    overflow: scroll;
	background-color: #f5f5f5;
	z-index: 1;
}
.iconImg {
    display:block;
    width: 30px;
    margin-right:5px;
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