<template>
  <div class="integrationDetail-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack">
        <i class="icon-chevron-left"></i>
        <span>返回</span>
      </a>
      <div>奖分详情</div>
    </div>
    <!-- 奖分详情 -->
    <div class="contentWrapper">
      <div class="searchBar">
        <div class="item" style="border-right: 1px solid #eee;">
          <input placeholder="事件模糊查找" v-on:input="watchSelectEventInput" v-model="selectEventTxt">
        </div>
        <div class="item" style="border-left: 1px solid #eee;">
          <input placeholder="员工模糊查找" v-on:input="watchSelectStaffInput" v-model="selectStaffTxt">
        </div>
      </div>
      <div class="topBar">
        <div class="item" @click="showsTimePicker">
          起始 {{stimeTxt}}
          <i class="icon-chevron-down"></i>
        </div>
        <div class="item" @click="showeTimePicker">
          结束 {{etimeTxt}}
          <i class="icon-chevron-down"></i>
        </div>
      </div>
      <div class="contentBlock">
        <div
          class="weui-form-preview"
          style="margin-bottom: 10px;"
          v-for="(item, index) in integrationDetailListForShow"
          v-bind:key="index"
        >
          <div class="weui-form-preview__hd">
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">日期</label>
              <em class="weui-form-preview__value" style="color: #999;">{{item.etime.split("T")[0]}}</em>
            </div>
          </div>
          <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">事件</label>
              <span class="weui-form-preview__value">{{item.eventStr}}</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">奖扣分</label>
              <span
                class="weui-form-preview__value"
                v-bind:class="{ 'greenTxt': item.addintegral, 'redFont': item.deductintegral }"
              >{{item.addintegral ? item.addintegral : "- " + item.deductintegral}}</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">状态</label>
              <span
                class="weui-form-preview__value"
              >已通过</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">部门</label>
              <span
                class="weui-form-preview__value"
              >{{item.dept}}</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">姓名</label>
              <span
                class="weui-form-preview__value"
              >{{item.empname}}</span>
            </div>
            <div class="weui-form-preview__item weui-form-preview__groupItem">
              <div class="item">
                <span class="title">组别</span>
                <span class="value">{{item.workgroup}}</span>
              </div>
              <div class="item">
                <span class="title">车间</span>
                <span class="value">{{item.workshop}}</span>
              </div>
              <div class="item">
                <span class="title">生产线</span>
                <span class="value">{{item.line}}</span>
              </div>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">审批人</label>
              <span
                class="weui-form-preview__value"
              >{{item.directorname}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <awesome-picker
      ref="stimePicker"
      :type="'date'"
      :textTitle="timePicker.title"
      @confirm="stimePickerConfirm"
    ></awesome-picker>
    <awesome-picker
      ref="etimePicker"
      :type="'date'"
      :textTitle="timePicker.title"
      @confirm="etimePickerConfirm"
    ></awesome-picker>
  </div>
</template>

<script>
var now = new Date();
var T;

export default {
  data: function() {
    return {
      timePicker: {
        title: "选择日期"
      },
      stimeTxt: this.formatTime(now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + "1日"), // 筛选开始时间
      etimeTxt: this.formatTime(now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() + "日"), // 筛选结束时间
      integrationDetailList: [], // 积分详情源列表
      integrationDetailListForShow: [], // 积分详情用于显示的列表
      selectEventTxt: "", // 筛选输入事件
      selectStaffTxt: "", // 筛选员工
    };
  },
  methods: {
    // 显示开始时间 Picker
    showsTimePicker: function() {
      this.$refs.stimePicker.show();
    },
    // 显示结束时间 Picker
    showeTimePicker: function() {
      this.$refs.etimePicker.show();
    },
    // 结束时间筛选
    etimePickerConfirm: function(data) {
      this.etimeTxt = this.formatTime(data[0].value + data[1].value + data[2].value);
      var that = this;
      this.$http.get(this.seieiURL + "/estapi/api/Integral/getAllIntegralDetail?stime=" + this.stimeTxt +  "&etime=" + this.addOneDay(this.etimeTxt))
        .then(resp => {
          that.integrationDetailList = resp.body.slice(0, resp.body.length);
          that.integrationDetailListForShow = resp.body.slice(0,resp.body.length);
        });
    },
    // 开始时间筛选
    stimePickerConfirm: function(data) {
      this.stimeTxt = this.formatTime(
        data[0].value + data[1].value + data[2].value
      );
      var that = this;
      this.$http.get(this.seieiURL + "/estapi/api/Integral/getAllIntegralDetail?stime=" + this.stimeTxt +  "&etime=" + this.addOneDay(this.etimeTxt))
        .then(resp => {
          that.integrationDetailList = resp.body.slice(0, resp.body.length);
          that.integrationDetailListForShow = resp.body.slice(0,resp.body.length);
        });
    },
    // 事件模糊查找
    watchSelectEventInput: function() {
      var that = this;
      clearTimeout(T);
      T = setTimeout(() => {
        if (that.selectEventTxt.trim() == "") {
          that.integrationDetailListForShow = that.integrationDetailList;
          return;
        }
        else {
          var integrationDetailListForShow = [];
          var re = new RegExp(that.selectEventTxt);
          for (var i=0; i<that.integrationDetailList.length; i++) {
            if (re.test(that.integrationDetailList[i].eventStr)) {
              integrationDetailListForShow.push(that.integrationDetailList[i]);
            }
          }
          that.integrationDetailListForShow = integrationDetailListForShow;
        }
      });
    },
    // 员工模糊查找
    watchSelectStaffInput: function() {
      var that = this;
      clearTimeout(T);
      T = setTimeout(() => {
        if (that.selectStaffTxt.trim() == "") {
          that.integrationDetailListForShow = that.integrationDetailList;
          return;
        }
        else {
          var integrationDetailListForShow = [];
          var re = new RegExp(that.selectStaffTxt);
          for (var i=0; i<that.integrationDetailList.length; i++) {
            if (re.test(that.integrationDetailList[i].empname)) {
              integrationDetailListForShow.push(that.integrationDetailList[i]);
            }
          }
          that.integrationDetailListForShow = integrationDetailListForShow;
        }
      });
    },
  },
  created: function() {
    var that = this;
    var that = this;
    this.$http.get(this.seieiURL + "/estapi/api/Integral/getAllIntegralDetail?stime=" + this.stimeTxt +  "&etime=" + this.addOneDay(this.etimeTxt))
      .then(resp => {
        that.integrationDetailList = resp.body.slice(0, resp.body.length);
        that.integrationDetailListForShow = resp.body.slice(0,resp.body.length);
      });
  }
};
</script>

<style scoped>
.contentWrapper {
  margin-top: 48px;
}
.topBar {
  position: fixed;
  flex-wrap: wrap;
  top: 92px;
  display: flex;
  width: 100%;
  justify-content: space-around;
  z-index: 1;
}
.topBar .item {
  box-sizing: border-box;
  flex-grow: 1;
  font-size: 16px;
  line-height: 2.5em;
  color: #444;
  background-color: #fff;
  border: 1px solid #eee;
  text-align: center;
  border-top: none;
}
.contentBlock {
  margin-top: 150px;
}
.weui-form-preview__value {
  padding-left: 1em;
  color: #444;
  text-align: left;
}
.greenTxt {
  color: #6fb27c;
  font-weight: bold;
}
.redFont {
  font-weight: bold;
  color: red;
}
.weui-form-preview__groupItem {
  display: flex;
  justify-content: space-between;
  text-align: left;
}
.weui-form-preview__groupItem .item {
  display: inline-block;
  vertical-align: top;
}
.weui-form-preview__groupItem .item .title {
  display: inline-block;
  margin-right: 1em;
  min-width: 4em;
  color: #999999;
  text-align: justify;
  text-align-last: justify;
}
.weui-form-preview__groupItem .item .value {
  display: inline-block;
  padding-left: 1em;
  min-width: 2em;
  color: #444;
}
.searchBar {
  box-sizing: border-box;
  position: fixed;
  top: 48px;
  left: 0;
  right: 0;
  height: 44px;
  z-index: 1;
  border-bottom: 1px solid #eee;
  font-size: 0;
}
.searchBar .item {
  box-sizing: border-box;
  display: inline-block;
  width: 50%;
  vertical-align: top;
}
.searchBar .item input {
  box-sizing: border-box;
  width: 100%;
  height: 43px;
  line-height: 43px;
  padding-left: 1em;
  font-size: 16px;
}
</style>