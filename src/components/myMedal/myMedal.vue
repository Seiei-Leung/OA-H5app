<template>
  <div class="myMedal-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack">
        <i class="icon-chevron-left"></i>
        <span>返回</span>
      </a>
      <div>{{title}}</div>
      <div class="titleRight" @click="showRedeemBlock">兑奖详情</div>
    </div>
    <div class="contentWrapper" v-show="!isShowRedeemBlock">
      <div class="containerOfMine" v-show="!isShowRankingCenter">
        <div class="item">
          <div style="margin-bottom: 10px;">
            <img src="http://www.etscn.com.cn:38080/oa/KQ/img/champion.png"/>
          </div>
          <div class="title">累计金牌</div>
          <div class="score">{{countOfChampion}} 枚</div>
          <div class="txt" @click="getMedalDetail('1')" v-on:touchstart.self='touchS($event)' v-on:touchend.self='touchE($event)'>详情</div>
        </div>
        <div class="item">
          <div style="margin-bottom: 10px;">
            <img src="http://www.etscn.com.cn:38080/oa/KQ/img/second.png"/>
          </div>
          <div class="title">累计银牌</div>
          <div class="score">{{countOfSecond}} 枚</div>
          <div class="txt" @click="getMedalDetail('2')" v-on:touchstart.self='touchS($event)' v-on:touchend.self='touchE($event)'>详情</div>
        </div>
        <div class="item">
          <div style="margin-bottom: 10px;">
            <img src="http://www.etscn.com.cn:38080/oa/KQ/img/third.png"/>
          </div>
          <div class="title">累计铜牌</div>
          <div class="score">{{countOfThird}} 枚</div>
          <div class="txt" @click="getMedalDetail('3')" v-on:touchstart.self='touchS($event)' v-on:touchend.self='touchE($event)'>详情</div>
        </div>
      </div>
      <div class="medalDetail">
        <div class="weui-form-preview" style="margin-bottom: 10px;" v-show="medalListForShow.length > 0" v-for="(item, index) in medalListForShow" v-bind:key="index">
          <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">
                奖牌类别
              </label>
              <span class="weui-form-preview__value">
                <img v-show="item.type == '金牌'" src="http://www.etscn.com.cn:38080/oa/KQ/img/champion.png" style="width: 20px;"/>
                <img v-show="item.type == '银牌'" src="http://www.etscn.com.cn:38080/oa/KQ/img/second.png" style="width: 20px;"/>
                <img v-show="item.type == '铜牌'" src="http://www.etscn.com.cn:38080/oa/KQ/img/third.png" style="width: 20px;"/>
              </span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">PK组别</label>
              <span class="weui-form-preview__value">{{userMsgForIntegration.pkdept}}</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">获得日期</label>
              <span class="weui-form-preview__value">{{item.date.split("T")[0]}}</span>
            </div>
          </div>
        </div>
        <div v-show="medalListForShow.length == 0" class="nullTxt">
          暂 无 奖 牌
        </div>
      </div>
    </div>
    <div v-show="isShowRedeemBlock" class="redeemBlock" style="margin-top: 60px;">
      <div class="weui-form-preview" style="margin-bottom: 10px;" v-show="redeemList.length > 0" v-for="(item, index) in redeemList" v-bind:key="index">
          <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">
                兑换奖牌数
              </label>
              <span class="weui-form-preview__value">
                <img v-show="item.type == '金牌'" src="http://www.etscn.com.cn:38080/oa/KQ/img/champion.png" style="width: 20px;height: 27px;"/>
                <img v-show="item.type == '银牌'" src="http://www.etscn.com.cn:38080/oa/KQ/img/second.png" style="width: 20px;height: 27px;"/>
                <img v-show="item.type == '铜牌'" src="http://www.etscn.com.cn:38080/oa/KQ/img/third.png" style="width: 20px;height: 27px;"/>
                <span class="greenTxt" style="vertical-align: top;">X 1</span>
              </span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">兑换事项</label>
              <span class="weui-form-preview__value"></span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">兑换日期</label>
              <span class="weui-form-preview__value"></span>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      title: "我的奖牌",
      userMsg: {},
      userMsgForIntegration: {},
      countOfChampion: 0, // 累计金牌数
      countOfSecond: 0, // 累计银牌数
      countOfThird: 0, // 累计铜牌数
      medalList: [],
      medalListForShow: [], // 金牌详情
      isShowRedeemBlock: false, // 显示兑换页面
      redeemList: [], // 兑换列表
    }
  },
  methods: {
    getMedalDetail: function(type) {
      var medalListForShow = [];
      for (var i=0; i<this.medalList.length; i++)
      {
        if (this.medalList[i].type == "金牌" && type == '1')
        {
          medalListForShow.push(this.medalList[i]);
        }
        if (this.medalList[i].type == "银牌" && type == '2')
        {
          medalListForShow.push(this.medalList[i]);
        }
        if (this.medalList[i].type == "铜牌" && type == '3')
        {
          medalListForShow.push(this.medalList[i]);
        }
      }
      this.medalListForShow = medalListForShow;
    },
    showRedeemBlock: function() {
      this.title = "兑奖详情";
      this.isShowRedeemBlock = true;
    },
    goBack: function() {
      if (this.isShowRedeemBlock) {
        this.title = "我的奖牌";
        this.isShowRedeemBlock = false;
        return;
      }
      this.$router.go(-1);
    }
  },
  created: function() {
    var that = this;
    this.userMsg = JSON.parse(this.$store.state.userMsg);
    this.userMsgForIntegration = this.$store.state.userMsgForIntegration;
    this.$http.get(this.seieiURL + "/estapi/api/Integral/getMedal?userId=" + this.userMsg.EmployeeNo).then(
      resp => {
        that.medalList = resp.body;
        that.getMedalDetail('1');
      }
    );
  }
};
</script>

<style scoped>
.contentWrapper {
  margin-top: 280px;
}
.containerOfMine {
  position: fixed;
  top: 48px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  z-index: 1;
  background-color: #f5f5f5;
}
.containerOfMine img {
  width: 40%;
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
  color: #999;
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
.medalDetail .nullTxt {
  text-align: center;
  color: #999;
}
.greenTxt {
  color: #60c38b;
  font-weight: bold;
}
</style>