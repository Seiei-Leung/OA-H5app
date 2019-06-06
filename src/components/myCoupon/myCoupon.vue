<template>
  <div class="myCoupon-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack">
        <i class="icon-chevron-left"></i>
        <span>返回</span>
      </a>
      <div>我的奖票</div>
    </div>
    <div class="contentWrapper">
      <div class="topBar">
        <div class="item" v-bind:class="{ 'active': isShowUnUsedCoupon }" @click="showUnUsedCoupon">未打印</div>
        <div class="item" v-bind:class="{ 'active': !isShowUnUsedCoupon }" @click="showUsedCoupon">已打印</div>
      </div>
      <div class="couponCountTxt">
        共有{{couponList.length}}张奖票，未打印 <span class="greenTxt">{{unUsedCouponList.length}}</span> 张，已打印 <span class="redTxt">{{usedCouponList.length}}</span> 张
      </div>
      <!--  -->
      <div class="couponListWrapper" v-show="isShowUnUsedCoupon">
        <div class="couponWrapper" v-for="(item, index) in unUsedCouponList" v-bind:key="index">
          <div class="title">
            <div class="integration">{{item.integral}}</div>
            <div class="couponTxt">奖票</div>
          </div>
          <div class="content">
            <div class="reason">{{item.eventStr}}</div>
            <div class="msg">申请人：{{item.name}}</div>
            <div class="msg">审核人：{{item.auditor}}</div>
            <div class="msg">审批人：{{item.approver}}</div>
            <div class="halfTopCircle"></div>
            <div class="halfBottomCircle"></div>
          </div>
        </div>
      </div>
      <div class="couponListWrapper usedCouponListWrapper" v-show="!isShowUnUsedCoupon">
        <div class="couponWrapper" v-for="(item, index) in usedCouponList" v-bind:key="index">
          <div class="title">
            <div class="integration">{{item.integral}}</div>
            <div class="couponTxt">奖票</div>
          </div>
          <div class="content">
            <div class="reason">{{item.eventStr}}</div>
            <div class="msg">申请人：{{item.name}}</div>
            <div class="msg">审核人：{{item.auditor}}</div>
            <div class="msg">审批人：{{item.approver}}</div>
            <div class="halfTopCircle"></div>
            <div class="halfBottomCircle"></div>
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
      isShowUnUsedCoupon: true, // 是否显示
      user: {}, // 用户信息
      couponList: [], // 奖票源列表
      usedCouponList: [], // 已用票卷列表
      unUsedCouponList: [], // 未用票卷列表
    };
  },
  methods: {
    showUnUsedCoupon: function() {
      this.isShowUnUsedCoupon = true;
    },
    showUsedCoupon: function() {
      this.isShowUnUsedCoupon = false;
    }
  },
  created: function() {
    var that = this;
    this.user = JSON.parse(this.$store.state.userMsg);
    this.$http.get(this.seieiURL + "/estapi/api/Integral/getCouponByUserId?userId=" + this.user.EmployeeNo).then(
      resp => {
        that.couponList = resp.body;
        var usedCouponList = [];
        var unUsedCouponList = [];
        resp.body.forEach(item => {
          if (item.isUsed) {
            usedCouponList.push(item);
          } else {
            unUsedCouponList.push(item);
          }
        });
        that.unUsedCouponList = unUsedCouponList;
        that.usedCouponList = usedCouponList;
      }
    )
  }
};
</script>

<style scoped>
.contentWrapper {
  margin-top: 100px;
}
.topBar {
  position: fixed;
  top: 48px;
  display: flex;
  width: 100%;
  justify-content: space-around;
  z-index: 1;
}
.topBar .item{
  box-sizing: border-box;
  flex-grow: 1;
  font-size: 16px;
  line-height: 2.5em;
  color: #444;
  background-color: #fff;
  border: 1px solid #eee;
  text-align: center;
}
.topBar .item.active {
  color: #6fb27c;
  font-weight: bold;
}
.couponCountTxt {
  padding-left: 10px;
  font-size: 16px;
  line-height: 2em;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  color: #666;
}
.greenTxt {
  color: #6fb27c;
}
.redTxt {
  color: #ff4343;
}
.couponListWrapper {
  padding-bottom: 10px;
}
.couponWrapper {
  margin: auto;
  margin-top: 10px;
  width: 95%;
  font-size: 0px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.couponWrapper .title {
  box-sizing: border-box;
  display: inline-block;
  padding-top: 10px;
  width: 30%;
  vertical-align: top;
  font-size: 20px;
  text-align: center;
  color: #6fb27c;
}
.usedCouponListWrapper .title {
  color: #999;
}
.couponWrapper .title .integration {
    font-size: 32px;
}
.couponWrapper .content {
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  padding: 10px 10px 10px 20px;
  width: 70%;
  vertical-align: top;
  font-size: 16px;
    color: #666;
  border-left: 1px dotted #ddd;
}
.couponWrapper .content .reason {
    margin-bottom: 10px;
}
.couponWrapper .content .msg {
    font-size: 14px;
    color: #999;
}
.couponWrapper .content .halfTopCircle,
.couponWrapper .content .halfBottomCircle {
  position: absolute;
  left: -8px;
  width: 16px;
  height: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
}
.couponWrapper .content .halfTopCircle {
  top: -1px;
  border-bottom-right-radius: 100%;
  border-bottom-left-radius: 100%;
  border-top: none;
}
.couponWrapper .content .halfBottomCircle {
  bottom: -1px;
  border-top-right-radius: 100%;
  border-top-left-radius: 100%;
  border-bottom: none;
}
</style>