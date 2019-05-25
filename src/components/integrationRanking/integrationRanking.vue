<template>
  <div class="integrationRanking-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack">
        <i class="icon-chevron-left"></i>
        <span>返回</span>
      </a>
      <div>{{heardTitle}}</div>
    </div>
    <div class="contentWrapper">
      <div class="topBar">
        <div class="item active">月度排名</div>
        <div class="item">季度排名</div>
        <div class="item">年度排名</div>
        <div class="item">累计排名</div>
      </div>
      <div class="contentBlock">
        <div style="padding-left: 10px;line-height: 1.8em;color: #666;">我的排名</div>
        <div class="myRankingBar">
          全员排名: 第
          <span class="greenTxt">{{rankingNum}}</span> 名
        </div>
        <div style="padding-left: 10px;line-height: 1.8em;color: #666;">排名详情</div>
        <div class="RankingContainer">
          <div class="weui-cells" style="margin-top: 0px;">
            <a class="weui-cell weui-cell_access weui-cell_example" href="javascript:;">
              <div class="weui-cell__hd">
                <img
                  src="http://www.etscn.com.cn:38080/oa/KQ/img/champion.png"
                  alt
                  style="width:20px;margin-right:16px;display:block"
                >
              </div>
              <div class="weui-cell__bd">
                <p>李四</p>
              </div>
            </a>
            <a class="weui-cell weui-cell_access weui-cell_example" href="javascript:;">
              <div class="weui-cell__hd">
                <img
                  src="http://www.etscn.com.cn:38080/oa/KQ/img/second.png"
                  alt
                  style="width:20px;margin-right:16px;display:block"
                >
              </div>
              <div class="weui-cell__bd">
                <p>张三</p>
              </div>
            </a>
            <a class="weui-cell weui-cell_access weui-cell_example" href="javascript:;">
              <div class="weui-cell__hd">
                <img
                  src="http://www.etscn.com.cn:38080/oa/KQ/img/third.png"
                  alt
                  style="width:20px;margin-right:16px;display:block"
                >
              </div>
              <div class="weui-cell__bd">
                <p>李四</p>
              </div>
            </a>
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
      heardTitle: "",
      rankingNum: 0
    };
  },
  created: function() {
    if (this.$route.params.kind == "all") {
      this.heardTitle = "全员排名";
    }
    else if (this.$route.params.kind == "dep") {
      this.heardTitle = "部门排名";
    }
    else if (this.$route.params.kind == "grade") {
      this.heardTitle = "级别排名";
    } else {
      this.heardTitle = "新员工排名";
    }
  }
};
</script>

<style scoped>
.greenTxt {
  color: #6fb27c;
}
.contentWrapper {
}
.topBar {
  position: fixed;
  top: 48px;
  display: flex;
  width: 100%;
  justify-content: space-around;
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
}
.contentBlock {
  margin-top: 90px;
}
.contentBlock .myRankingBar {
  padding-left: 10px;
  line-height: 2em;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  background-color: #fff;
}
</style>