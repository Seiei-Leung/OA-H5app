<template>
  <div class="myCoupon-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack">
        <i class="icon-chevron-left"></i>
        <span>返回</span>
      </a>
      <div>我的奖券</div>
    </div>
    <div class="contentWrapper">
      <div class="couponCountTxt">
        未打印的奖票
        <span class="greenTxt">{{couponCount}}</span> 张
      </div>
      <div class="couponListWrapper">
        <div class="couponWrapper">
          <div class="title">
            <div class="integration">10</div>
            <div class="couponTxt">奖票</div>
          </div>
          <div class="content">
            <div class="reason">探望生病同事</div>
            <div class="msg">申请人：李四</div>
            <div class="msg">初审人：张三</div>
            <div class="msg">终审人：张三</div>
            <div class="halfTopCircle"></div>
            <div class="halfBottomCircle"></div>
          </div>
        </div>
        <div class="couponWrapper">
          <div class="title">
            <div class="integration">10</div>
            <div class="couponTxt">奖票</div>
          </div>
          <div class="content">
            <div class="reason">探望生病同事</div>
            <div class="msg">申请人：李四</div>
            <div class="msg">初审人：张三</div>
            <div class="msg">终审人：张三</div>
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
      couponCount: 2
    };
  }
};
</script>

<style scoped>
.contentWrapper {
  margin-top: 48px;
  padding-top: 20px;
}
.couponCountTxt {
  padding-left: 10px;
  font-size: 16px;
  line-height: 2em;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
}
.greenTxt {
  color: #6fb27c;
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