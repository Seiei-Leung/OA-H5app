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
        <div class="item" @click="changeActiveIndex('4')" v-bind:class="{ 'active': activeIndex == 4 }">
          <div>月度排名</div>
          <div v-show="activeIndex == 4" style="line-height: 1.2;">({{searchMonth}})</div>
        </div>
        <div class="item" @click="changeActiveIndex('3')" v-bind:class="{ 'active': activeIndex == 3 }">
          <div>季度排名</div>
          <div v-show="activeIndex == 3" style="line-height: 1.2;">({{searchSeason}})</div>
        </div>
        <div class="item" @click="changeActiveIndex('2')" v-bind:class="{ 'active': activeIndex == 2 }">
          <div>年度排名</div>
          <div v-show="activeIndex == 2" style="line-height: 1.2;">({{searchYear}})</div>
        </div>
        <div class="item" @click="changeActiveIndex('1')" v-bind:class="{ 'active': activeIndex == 1 }">累计排名</div>
      </div>
      <div class="contentBlock">
        <div style="padding-left: 10px;line-height: 1.8em;color: #666;">我的排名（PK 部门：{{userMsgForIntegration.pkdept}}）</div>
        <div class="myRankingBar">
          {{heardTitle}}: 第
          <span class="greenTxt">{{rankingNumForShow}}</span> 名
        </div>
        <div style="padding-left: 10px;line-height: 1.8em;color: #666;">排名详情</div>
        <div class="RankingContainer">
          <div class="weui-cells" style="margin-top: 0px;">
            <a class="weui-cell weui-cell_access weui-cell_example" href="javascript:;" v-for="(item, index) in rankingListForShow" v-bind:key="index">
              <!-- 用于 部门排名 -->
              <div v-if="ranktype == 1">
                <div class="weui-cell__hd" v-if="isGoldaward(index + 1)">
                  <img
                    src="http://www.etscn.com.cn:38080/oa/KQ/img/champion.png"
                    alt
                    style="width:20px;margin-right:16px;display:block"
                  >
                </div>
                <div class="weui-cell__hd" v-if="isSilveraward(index + 1)">
                  <img
                    src="http://www.etscn.com.cn:38080/oa/KQ/img/second.png"
                    alt
                    style="width:20px;margin-right:16px;display:block"
                  >
                </div>
                <div class="weui-cell__hd" v-if="isBronzeaward(index + 1)">
                  <img
                    src="http://www.etscn.com.cn:38080/oa/KQ/img/third.png"
                    alt
                    style="width:20px;margin-right:16px;display:block"
                  >
                </div>
              </div>
              <!-- 用于 全员排名 -->
              <div v-if="ranktype == 0">
                <div class="weui-cell__hd" v-if="index == 0">
                  <img
                    src="http://www.etscn.com.cn:38080/oa/KQ/img/champion.png"
                    alt
                    style="width:20px;margin-right:16px;display:block"
                  >
                </div>
                <div class="weui-cell__hd" v-if="index == 1">
                  <img
                    src="http://www.etscn.com.cn:38080/oa/KQ/img/second.png"
                    alt
                    style="width:20px;margin-right:16px;display:block"
                  >
                </div>
                <div class="weui-cell__hd" v-if="index == 2">
                  <img
                    src="http://www.etscn.com.cn:38080/oa/KQ/img/third.png"
                    alt
                    style="width:20px;margin-right:16px;display:block"
                  >
                </div>
              </div>
              <div class="weui-cell__bd">
                <p style="display: inline-block;" v-bind:class="{ 'redFont': item.code == userMsg.EmployeeNo }">{{item.ranking}} {{item.name}}({{item.departname}})</p>
                <p style="float: right;color: #6fb27c;">{{item.allintegral}}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <awesome-picker
      ref="yearPicker"
      :data="yearPicker.data"
      :anchor="yearPicker.anchor"
      :textTitle="yearPicker.title"
      @confirm="yearPickerConfirm"
    ></awesome-picker>
    <awesome-picker
      ref="seasonPicker"
      :data="seasonPicker.data"
      :textTitle="seasonPicker.title"
      @confirm="seasonPickerConfirm"
    ></awesome-picker>
    <awesome-picker
      ref="monthPicker"
      :data="monthPicker.data"
      :textTitle="monthPicker.title"
      @confirm="monthPickerConfirm"
    ></awesome-picker>
    <v-loading v-show="isLoading"></v-loading>
  </div>
</template>

<script>
import loading from '../loading/loading';

var year = Number(new Date().getFullYear());
var startYear = year - 60;
var yearPickerList = [];
for (var i=startYear; i<(year+1); i++) {
  yearPickerList.push(i);
}

export default {
  data: function() {
    return {
      heardTitle: "", // 标题
      rankingNumForShow: 0, // 排名
      rankingNum: 0, // 排名
      userMsg: {}, // 用户基本信息
      userMsgForIntegration: {}, // 用户积分基本信息
      activeIndex: 4, // 分页栏索引
      goldawardList: [], // 金牌限额
      silverawardList: [], // 金牌限额
      bronzeawardList: [], // 金牌限额
      rankingListForShow: [], // 排名列表
      rankingList: [], // 排名列表
      isLoading: false, // loading 是否显示
      ranktype: 0, // 排名类型：0全员排名,1部门排名,2综合排名
      datetype: 0, // 筛选时间类型：0累计,1年度,2季度,3月度
      searchYear: "未选定", // 查询年份
      searchMonth: (Number(new Date().getMonth()) + 1), // 查询月份
      searchSeason: "未选定", // 查询季度
      yearPicker: {
        data: [yearPickerList],
        title: "选择年份",
        anchor: [(yearPickerList.length-1)]
      },
      seasonPicker: {
        data: [[1,2,3,4]],
        title: "选择季度"
      },
      monthPicker: {
        data: [[1,2,3,4,5,6,7,8,9,10,11,12]],
        title: "选择月份"
      }
    };
  },
  methods: {
    changeActiveIndex: function(index) {
      var that = this;
      this.activeIndex = index;
      // 头部筛选栏
      if (index == '1') {
        this.rankingListForShow = this.rankingList;
        this.rankingNumForShow = this.rankingNum;
      }
      // 年份筛选
      if (index == '2') {
        this.$refs.yearPicker.show();
      }
      // 季度筛选
      if (index == '3') {
        this.$refs.seasonPicker.show();
      }
      // 季度筛选
      if (index == '4') {
        this.$refs.monthPicker.show();
      }
    },
    // 是否为金牌
    isGoldaward: function(index) {
      if (index > this.goldawardList[this.goldawardList.length-1]) {
        return false;
      }
      return true;
    },
    // 是否为银牌
    isSilveraward: function(index) {
      if (index > this.silverawardList[this.silverawardList.length-1] || index <= this.goldawardList[this.goldawardList.length-1]) {
        return false;
      }
      return true;
    },
    // 是否为铜牌
    isBronzeaward: function(index) {
      if (index > this.bronzeawardList[this.bronzeawardList.length-1] || index <= this.silverawardList[this.silverawardList.length-1]) {
        return false;
      }
      return true;
    },
    // 年份picker确定按钮
    yearPickerConfirm: function(data) {
      var that = this;
      that.isLoading = true;
      that.searchYear = data[0].value;
      that.$http.get(that.seieiURL + "/estapi/api/Integral/getRankDetailByConfig?ranktype=" + that.ranktype + "&datetype=1&pkdeptserialno=" + that.userMsgForIntegration.pkdeptserialno + "&year=" + data[0].value + "&month=0&season=0&userId=" + that.userMsg.EmployeeNo).then(
        resp => {
          that.rankingNumForShow = resp.body.index;
          that.rankingListForShow = resp.body.detail;
          that.$nextTick(function() {
            that.isLoading = false;
          })
        }
      );
    },
    // 季度picker确定按钮
    seasonPickerConfirm: function(data) {
      var that = this;
      that.isLoading = true;
      that.searchSeason = data[0].value;
      that.$http.get(that.seieiURL + "/estapi/api/Integral/getRankDetailByConfig?ranktype=" + that.ranktype + "&datetype=2&pkdeptserialno=" + that.userMsgForIntegration.pkdeptserialno + "&year=" + year + "&month=0&season=" + data[0].value + "&userId=" + that.userMsg.EmployeeNo).then(
        resp => {
          that.rankingNumForShow = resp.body.index;
          that.rankingListForShow = resp.body.detail;
          that.$nextTick(function() {
            that.isLoading = false;
          })
        }
      );
    },
    // 月份picker确定按钮
    monthPickerConfirm: function(data) {
      var that = this;
      that.isLoading = true;
      that.searchMonth = data[0].value;
      that.$http.get(that.seieiURL + "/estapi/api/Integral/getRankDetailByConfig?ranktype=" + that.ranktype + "&datetype=3&pkdeptserialno=" + that.userMsgForIntegration.pkdeptserialno + "&year=" + year + "&month=" + data[0].value + "&season=0&userId=" + that.userMsg.EmployeeNo).then(
        resp => {
          that.rankingNumForShow = resp.body.index;
          that.rankingListForShow = resp.body.detail;
          that.$nextTick(function() {
            that.isLoading = false;
          })
        }
      );
    },
  },
  created: function() {
    this.userMsg = JSON.parse(this.$store.state.userMsg);
    this.userMsgForIntegration = this.$store.state.userMsgForIntegration;
    var that = this;
    // 获取金牌额数
    this.$http.get(this.seieiURL + "/estapi/api/Integral/GetQuotaByDept?dept=" + this.userMsgForIntegration.pkdept).then(
      resp => {
        // 获取奖牌信息
        this.quotaObj = resp.body;
        var goldaward = Number(resp.body.goldaward);
        var silveraward = Number(resp.body.silveraward);
        var bronzeaward = Number(resp.body.bronzeaward);
        for (var i=1; i<goldaward+1; i++) {
          that.goldawardList.push(i);
        }
        if (silveraward != 0) {
          var templOfSilveraward = goldaward;
          for (var i=1; i<silveraward+1; i++) {
            templOfSilveraward += 1;
            that.silverawardList.push(templOfSilveraward);
          }
        } else {
          that.silverawardList.push(0);
        }
        if (bronzeaward != 0) {
          var templOfBronzeaward = goldaward + silveraward;
          for (var i=1; i<bronzeaward+1; i++) {
            templOfBronzeaward += 1;
            that.bronzeawardList.push(templOfBronzeaward);
          }
        } else {
          that.bronzeawardList.push(0);
        }

        // 获取排名详情
        that.rankingNumForShow = that.$route.params.ranknum;
        that.rankingNum = that.$route.params.ranknum;

        // 全员排名
        if (that.$route.params.kind == "all") {
          that.heardTitle = "全员排名";
          that.ranktype = 0;
          that.isLoading = true;
          that.$http.get(that.seieiURL + "/estapi/api/Integral/getRankDetailByConfig?ranktype=0&datetype=3&pkdeptserialno=0&year=" + year + "&month=" + (Number(new Date().getMonth()) + 1) + "&season=0&userId=" + that.userMsg.EmployeeNo).then(
            resp => {
              that.rankingListForShow = resp.body.detail;
              that.rankingList = resp.body.detail;
              that.$nextTick(function() {
                that.isLoading = false;
              })
            }
          );
        }
        // 部门排名
        else if (that.$route.params.kind == "dept") {
          that.heardTitle = "部门排名";
          that.ranktype = 1;
          that.isLoading = true;
          that.$http.get(that.seieiURL + "/estapi/api/Integral/getRankDetailByConfig?ranktype=1&datetype=3&pkdeptserialno=" + that.userMsgForIntegration.pkdeptserialno + "&year=" + year + "&month=" + (Number(new Date().getMonth()) + 1) + "&season=0&userId=" + that.userMsg.EmployeeNo).then(
            resp => {
              that.rankingListForShow = resp.body.detail;
              that.rankingList = resp.body.detail;
              that.$nextTick(function() {
                that.isLoading = false;
              })
            }
          );
        }
        // 综合排名
        else if (that.$route.params.kind == "composite") {
          that.heardTitle = "综合排名";
          that.ranktype = 2;
          that.isLoading = true;
          that.$http.get(that.seieiURL + "/estapi/api/Integral/getRankDetailByConfig?ranktype=0&datetype=0&pkdeptserialno=0&year=0&month=0&season=0&userId=" + that.userMsg.EmployeeNo).then(
            resp => {
              that.rankingListForShow = resp.body.detail;
              that.rankingList = resp.body.detail;
              that.$nextTick(function() {
                that.isLoading = false;
              })
            }
          );
        }
      }
    );
    
  },
	components: {
    'v-loading': loading
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
  z-index: 1;
}
.topBar .item{
  box-sizing: border-box;
  flex-grow: 1;
  height: 43px;
  line-height: 1.4;
  font-size: 16px;
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
.redFont {
  font-weight: bold;
  color: red;
}
</style>