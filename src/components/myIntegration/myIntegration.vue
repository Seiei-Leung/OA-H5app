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
        <div class="integrationCount">{{Number(userMsgForIntegration.totalintegral) + Number(userMsgForIntegration.baseintegral) + Number(userMsgForIntegration.workyearsintegral)}}</div>
        <div>累计奖分</div>
        <div class="footer">
          <div>
            <div style="font-size: 20px;">当月奖分：{{integrationCountOfMonth}}</div>
          </div>
          <div>
            <div style="font-size: 20px;">当月扣分：{{minusIntegrationCountOfMonth}}</div>
          </div>
        </div>
      </div>
      <div class="containerOfMine" v-show="!isShowRankingCenter">
        <div class="item">
          <div class="title">我的奖扣详情</div>
          <!-- <div class="score">{{integrationCountOfTypeIsDetail}}</div> -->
          <div class="txt" @click="goMyIntegrationDetail('normal')" v-on:touchstart.self='touchS($event)' v-on:touchend.self='touchE($event)'>点击查看</div>
        </div>
        <div class="item">
          <div class="title">固定奖分规则</div>
          <!-- <div class="score">{{userMsgForIntegration.fixedintegral}}</div> -->
          <div class="txt" @click="goMyIntegrationDetail('fixed')" v-on:touchstart.self='touchS($event)' v-on:touchend.self='touchE($event)'>点击查看</div>
        </div>
        <div class="item">
          <div class="title">每月奖分规则</div>
          <div class="txt" @click="goMyIntegrationDetail('eachMonth')" v-on:touchstart.self='touchS($event)' v-on:touchend.self='touchE($event)'>点击查看</div>
        </div>
      </div>
      <div v-show="!isShowRankingCenter">
        <div style="line-height: 2.5;color: #888;text-align: center;">累计奖分明细：</div>
        <div
          class="weui-form-preview"
          style="margin-bottom: 10px;"
          v-for="(item, index) in detailList"
          v-bind:key="index"
        >
          <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">奖分类型</label>
              <span class="weui-form-preview__value" style="color: #666;">{{item.title}}</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">奖扣分</label>
              <span class="weui-form-preview__value greenTxt">{{item.integral}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="containerOfRanking" v-show="isShowRankingCenter">
        <div class="weui-cells">
          <a class="weui-cell weui-cell_access" href="javascript:;" @click="goIntegrationRanking('all', rankingNumOfAll)">
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
          <a class="weui-cell weui-cell_access" href="javascript:;" @click="goIntegrationRanking('dept', rankingNumOfDept)">
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
              <span class="greenTxt">{{rankingNumOfDept}}</span> 名
            </div>
          </a>
          <a class="weui-cell weui-cell_access" href="javascript:;" @click="goIntegrationRanking('composite')">
            <div class="weui-cell__hd">
              <img
                src="http://www.etscn.com.cn:38080/oa/KQ/img/排名.png"
                alt
                style="width:20px;margin-right:16px;display:block"
              >
            </div>
            <div class="weui-cell__bd">
              <p>综合排名</p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <v-loading v-show="isLoading"></v-loading>
  </div>
</template>

<script>
import loading from '../loading/loading';

var now = new Date();
export default {
  data: function() {
    return {
      headTitle: "我的奖分", // 页面标题
      userMsg: {}, // 用户信息
      integrationCount: 0, // 累计奖分
      integrationCountOfMonth: 0, // 每月加分
      minusIntegrationCountOfMonth: 0, // 每月扣分
      integrationCountOfTypeIsDetail: 0, // 奖扣详情总分
      integrationCountOfTypeIsMonth: 0, // 每月奖分总分
      isShowRankingCenter: true, // 显示的内容是否为排名中心
      rankingNumOfAll: 0, // 全部员工排名
      rankingNumOfDept: 0, // 部门排名
      userMsgForIntegration: {}, // 用户积分信息
      isLoading: false, // loading 是否显示
      detailList: [], // 累积奖分详情
    };
  },
  created: function() {
    var that = this;
    this.isShowRankingCenter = (this.$route.params.kind == "rankingCenter");
    this.userMsg = JSON.parse(this.$store.state.userMsg);
    this.userMsgForIntegration = this.$store.state.userMsgForIntegration;
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    this.$http.get(this.seieiURL + "/estapi/api/Integral/getMyIntegrationMsgByUserId?userId=" + this.userMsg.EmployeeNo + "&year=" + year + "&month=" + month).then(
      resp => {
        that.integrationCountOfMonth = resp.body.addintegralOfMonth;
        that.minusIntegrationCountOfMonth = resp.body.deductintegralOfMonth != 0 ? "-" + resp.body.deductintegralOfMonth : "0";
        that.integrationCountOfTypeIsDetail = Number(resp.body.addintegralOfTypeIsDetail) - Number(resp.body.deductintegralOfTypeIsDetail);
        that.integrationCountOfTypeIsMonth = Number(resp.body.addintegralOfTypeIsMonth);
        that.detailList = resp.body.detailList;
        if (that.isShowRankingCenter) {
          that.isLoading = true;
          // 获取全员排名
          that.$http.get(that.seieiURL + "/estapi/api/Integral/getRankNumByConfig?ranktype=0&datetype=0&pkdeptserialno=0&year=0&month=0&season=0&userId=" + that.userMsg.EmployeeNo).then(
            resp => {
              that.rankingNumOfAll = resp.body.index;
              // 获取部门排名
              that.$http.get(that.seieiURL + "/estapi/api/Integral/getRankNumByConfig?ranktype=1&datetype=0&pkdeptserialno=" + that.userMsgForIntegration.pkdeptserialno + "&year=0&month=0&season=0&userId=" + that.userMsg.EmployeeNo).then(
                resp => {
                  that.isLoading = false;
                  that.rankingNumOfDept = resp.body.index;
                }
              );
            }
          );
        }
      }
    );
    
  },
  methods: {
    goIntegrationRanking: function(kind, ranknum) {
      this.$router.push({ name: "integrationRanking", params: {kind: kind, ranknum: ranknum}});
    },
    goMyIntegrationDetail: function(kind) {
      this.$router.push({ name: "myIntegrationDetail", params: {kind: kind}});
    }
  },
	components: {
    'v-loading': loading
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
