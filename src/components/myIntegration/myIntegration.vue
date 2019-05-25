<template>
  <div class="myIntegration-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack">
        <i class="icon-chevron-left"></i>
        <span>返回</span>
      </a>
      <div>{{isShowRankingCenter ? "我的排名" : "我的奖分"}}</div>
    </div>
    <div class="contentWrapper">
      <div class="topBar">
        <div class="integrationCount">{{integrationCount}}</div>
        <div>累计奖分</div>
        <div class="footer">
          <div>
            <div style="font-size: 20px;">奖分：{{integrationCountOfMonth}}</div>
          </div>
          <div>
            <div style="font-size: 20px;">扣分：{{minusIntegrationCountOfMonth}}</div>
          </div>
        </div>
      </div>
      <div class="containerOfMine" v-show="!isShowRankingCenter">
        <div class="item">
          <div class="title">奖扣详情</div>
          <div class="score">{{scoreOfMonth}}</div>
          <div class="txt" @click="goIntegrationDetail('mine')" v-on:touchstart.self='touchS($event)' v-on:touchend.self='touchE($event)'>点击查看</div>
        </div>
        <div class="item">
          <div class="title">固定奖分</div>
          <div class="score">{{scoreOfFixed}}</div>
          <div class="txt" v-on:touchstart.self='touchS($event)' v-on:touchend.self='touchE($event)'>点击查看</div>
        </div>
        <div class="item">
          <div class="title">每月奖分</div>
          <div class="score">{{scoreOfMonth}}</div>
          <div class="txt" v-on:touchstart.self='touchS($event)' v-on:touchend.self='touchE($event)'>点击查看</div>
        </div>
      </div>
      <div class="containerOfRanking" v-show="isShowRankingCenter">
        <div class="weui-cells">
          <a class="weui-cell weui-cell_access" href="javascript:;" @click="goIntegrationRanking('all')">
            <div class="weui-cell__hd">
              <img
                src="http://www.etscn.com.cn:38080/oa/KQ/img/排名.png"
                alt
                style="width:20px;margin-right:16px;display:block"
              >
            </div>
            <div class="weui-cell__bd">
              <p>全员排名</p>
            </div>
            <div class="weui-cell__ft">
              第
              <span class="greenTxt">{{rankingNumOfAll}}</span> 名
            </div>
          </a>
          <a class="weui-cell weui-cell_access" href="javascript:;" @click="goIntegrationRanking('dep')">
            <div class="weui-cell__hd">
              <img
                src="http://www.etscn.com.cn:38080/oa/KQ/img/排名.png"
                alt
                style="width:20px;margin-right:16px;display:block"
              >
            </div>
            <div class="weui-cell__bd">
              <p>部门排名</p>
            </div>
            <div class="weui-cell__ft">
              第
              <span class="greenTxt">{{rankingNumOfDep}}</span> 名
            </div>
          </a>
          <a class="weui-cell weui-cell_access" href="javascript:;" @click="goIntegrationRanking('grade')">
            <div class="weui-cell__hd">
              <img
                src="http://www.etscn.com.cn:38080/oa/KQ/img/排名.png"
                alt
                style="width:20px;margin-right:16px;display:block"
              >
            </div>
            <div class="weui-cell__bd">
              <p>级别排名</p>
            </div>
            <div class="weui-cell__ft">
              第
              <span class="greenTxt">{{rankingNumOfGrade}}</span> 名
            </div>
          </a>
          <a class="weui-cell weui-cell_access" href="javascript:;" @click="goIntegrationRanking('newStaff')">
            <div class="weui-cell__hd">
              <img
                src="http://www.etscn.com.cn:38080/oa/KQ/img/排名.png"
                alt
                style="width:20px;margin-right:16px;display:block"
              >
            </div>
            <div class="weui-cell__bd">
              <p>新员工排名</p>
            </div>
            <div class="weui-cell__ft">
              第
              <span class="greenTxt">{{rankingNumOfNewStaff}}</span> 名
            </div>
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
      headTitle: "我的奖分", // 页面标题
      user: {}, // 用户信息
      integrationCount: 20000, // 累计奖分
      integrationCountOfMonth: 100, // 每月加分
      minusIntegrationCountOfMonth: -1000, // 每月扣分
      scoreOfMonth: 200, // 每月积分累计
      scoreOfFixed: 0, // 固定积分
      isShowRankingCenter: true, // 显示的内容是否为排名中心
      rankingNumOfAll: 1, // 全部员工排名
      rankingNumOfDep: 1, // 部门排名
      rankingNumOfGrade: 1, // 级别排名
      rankingNumOfNewStaff: 1 // 新员工排名
    };
  },
  created: function() {
    this.user = JSON.parse(this.$store.state.userMsg);
  },
  methods: {
    goIntegrationRanking: function(kind) {
      this.$router.push({ name: "integrationRanking", params: {kind: kind}});
    },
    goIntegrationDetail: function(kind) {
      this.$router.push({ name: "integrationDetail", params: {kind: kind}});
    }
  },
  created: function() {
    this.isShowRankingCenter = (this.$route.params.kind == "rankingCenter");
  }
};
</script>

<style scoped>
.contentWrapper {
  margin-top: 58px;
}
.topBar {
  margin: auto;
  width: 95%;
  text-align: center;
  color: #fff;
  background-color: #60c38b;
  border-radius: 4px;
}
.topBar .integrationCount {
  padding-top: 50px;
  font-size: 40px;
  line-height: 1;
}
.topBar .footer {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  margin-top: 25px;
  border-top: 1px solid #ddd;
}
.containerOfMine {
  display: flex;
  justify-content: space-around;
  padding: 10px 10px 0 10px;
}
.containerOfMine .item {
  box-sizing: border-box;
  padding-top: 20px;
  width: 32%;
  text-align: center;
  flex-grow: 0;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: #fff;
}
.containerOfMine .item .title {
  margin-bottom: 10px;
}
.containerOfMine .item .score {
  margin-bottom: 10px;
  color: #60c38b;
  font-size: 24px;
}
.containerOfMine .item .txt {
  padding: 10px 0;
  color: #aaa;
  border-top: 1px solid #e5e5e5;
}
.greenTxt {
  color: #6fb27c;
}
.containerOfRanking {
  padding-top: 10px;
}
.rankingBar {
  padding-left: 10px;
  line-height: 2em;
  border-top: 1px solid #eee;
  background-color: #fff;
}
</style>
