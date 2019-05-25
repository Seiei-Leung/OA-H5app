<template>
	<div class="integration-component">
		<div class="top_title">
    	    <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i><span>返回</span></a>
    	    <div>快乐有奖分</div>
    	</div>
        <!-- 待办事项九宫格 -->
        <div class="weui-grids" style="margin-top: 50px;background-color: #fff;color:#444">
            <a href="javascript:void(0);" class="weui-grid" @click="goMyIntegration">
                <div class="weui-grid__icon">
                    <img src="http://www.etscn.com.cn:38080/oa/KQ/img/积分 (1).png">
                </div>
                <p class="weui-grid__label">我的奖分</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid" @click="goMyMedal">
                <div class="weui-grid__icon">
                    <img src="http://www.etscn.com.cn:38080/oa/KQ/img/champion.png" style = "width:85%">
                </div>
                <p class="weui-grid__label">我的奖牌</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid" @click="goMyCoupon">
                <div class="weui-grid__icon">
                    <img src="http://www.etscn.com.cn:38080/oa/KQ/img/奖金.png">
                </div>
                <p class="weui-grid__label">我的奖票</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid" @click="goIntegrationRanking">
                <div class="weui-grid__icon">
                    <img src="http://www.etscn.com.cn:38080/oa/KQ/img/排名.png">
                </div>
                <p class="weui-grid__label">奖分排名</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid" @click="goIntegrationDetail">
                <div class="weui-grid__icon">
                    <img src="http://www.etscn.com.cn:38080/oa/KQ/img/详情页-分享.png">
                </div>
                <p class="weui-grid__label">奖分详情</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid" @click="goAddOrMinusIntegration">
                <div class="weui-grid__icon">
                    <img src="http://www.etscn.com.cn:38080/oa/KQ/img/增加减少仓位.png">
                </div>
                <p class="weui-grid__label">奖分申请</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid" @click="goMyAuditOfIntegration">
                <div class="weui-grid__icon">
                    <img src="http://www.etscn.com.cn:38080/oa/KQ/img/2.png">
                </div>
                <p class="weui-grid__label">我的审核</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid" @click="goIntegrationAnnouncement">
                <div class="weui-grid__icon">
                    <img src="http://www.etscn.com.cn:38080/oa/KQ/img/喇叭 (1).png">
                </div>
                <p class="weui-grid__label">公告</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid" @click="goIntegrationMission">
                <div class="weui-grid__icon">
                    <img src="http://www.etscn.com.cn:38080/oa/KQ/img/案例大厅.png">
                </div>
                <p class="weui-grid__label">任务大厅</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid" @click="goIntegrationAppraise">
                <div class="weui-grid__icon">
                    <img src="http://www.etscn.com.cn:38080/oa/KQ/img/0.png">
                </div>
                <p class="weui-grid__label">服务评价</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid" @click="goIntegrationSuggest">
                <div class="weui-grid__icon">
                    <img src="http://www.etscn.com.cn:38080/oa/KQ/img/3.png">
                </div>
                <p class="weui-grid__label">改善建议</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid" @click="goAwardMsg">
                <div class="weui-grid__icon">
                    <img src="http://www.etscn.com.cn:38080/oa/KQ/img/1.png">
                </div>
                <p class="weui-grid__label">奖项说明</p>
            </a>
            <a href="javascript:void(0);" class="weui-grid" @click="goIntegrationMsg">
                <div class="weui-grid__icon">
                    <img src="http://www.etscn.com.cn:38080/oa/KQ/img/5.png">
                </div>
                <p class="weui-grid__label">奖分标准</p>
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
        goMyMedal: function() {
            this.$router.push({name: 'myMedal'})
        },
        goIntegrationMsg: function() {
            this.$router.push({name: 'integrationMsg'})
        },
        goAwardMsg: function() {
            this.$router.push({name: 'awardMsg'})
        },
        goIntegrationSuggest: function() {
            this.$router.push({name: 'integrationSuggest'})
        },
        goIntegrationAppraise: function() {
            this.$router.push({name: 'integrationAppraise'})
        },
        goIntegrationMission: function() {
            this.$router.push({name: 'integrationMission'})
        },
        goIntegrationAnnouncement: function() {
            this.$router.push({name: 'integrationAnnouncement'})
        },
        goIntegrationDetail: function() {
            this.$router.push({name: 'integrationDetail'});
        },
        goMyAuditOfIntegration: function() {
            this.$router.push({name: 'myAuditOfIntegration'});
        },
        goIntegrationRanking: function() {
            this.$router.push({name: 'myIntegration', params: {kind: "rankingCenter"}});
        },
        goMyIntegration: function() {
            this.$router.push({name: 'myIntegration', params: {kind: "integrationCenter"}});
        },
		goAddOrMinusIntegration: function() {
            this.$router.push({name: 'addOrMinusIntegration'});
        },
        goMyCoupon: function() {
            this.$router.push({name: "myCoupon"});
        }
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