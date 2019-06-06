<template>
  <div class="visitMsg-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i><span>返回</span></a>
      <div>来访登记查询</div>
      <i class="rightButton" @click="showToast">筛选</i>
    </div>
    <div class="tableWrapper" ref="tableWrapper" v-if="!isShowToast">
      <div v-for="item, index in dataList" style="padding: 5px;margin: 5px 0;border: #ccc 1px solid;border-radius: 4px;font-size: 0px;">
        <div class="left" style="display: inline-block;width: 25%;margin-top: 38px;vertical-align: top;">
          <img v-bind:src="item.headurl" style="width: 100%;border-radius: 4px;">
        </div>
          <div class="right" style="display:inline-block;box-sizing: border-box;padding: 0px 5px;width: 75%;">
            <div class="txt">来访单位：{{item.company}}</div>
            <div class="txt">微信昵称：{{item.wechatnick}}</div>
            <div class="txt">手机号码：{{item.mobile}}</div>
            <div class="txt">来访车牌：{{item.platenum}}</div>
            <div class="txt">来访人数：{{item.numofp}}</div>
            <div class="txt">来访事由：{{item.cause}}</div>
            <div class="txt">会见部门：{{item.interviewee_dept}}</div>
            <div class="txt">会见人员：{{item.interviewee}}</div>
            <div class="txt">入厂时间：{{item.btime ? item.btime.split('T')[0] + " " + item.btime.split('T')[1].slice(0, 5) : ''}}</div>
            <div class="txt">出厂时间：{{item.outtime ? item.outtime.split('T')[0] + " " + item.outtime.split('T')[1].slice(0, 5) : ''}}</div>
            <div class="txt" v-if="item.kind">类型：{{item.kind}}</div>
            <div class="txt" v-if="item.visitorname">来访人姓名：{{item.visitorname}}</div>
          </div>
        </div>
      </div>
      <div id="searchMonthWrapper" v-show="isShowToast">
        <div class="title" style="">请选择筛选条件</div>
        <div ref="cssHook" style="overflow: scroll;">
          <div style="width: 100%;">
            <div class="selectWrapper">
              <div class="selectTitle">操作：</div>
              <div class="selectContainer">
                <div class="item" @click="clear">清空选择</div>
              </div>
            </div>
            <div class="selectWrapper">
              <div class="selectTitle">年月：</div>
              <div class="selectContainer">
                <div class="item" v-bind:class="{active : sendObj.dateKind == 1}" @click="getTodayData">今天</div>
                <div class="item" v-bind:class="{active : sendObj.dateKind == 2}" @click="getWeekData">今周</div>
                <div class="item" v-bind:class="{active : sendObj.dateKind == 3}" @click="getPreMonthData">{{preMonth}}</div>
                <div class="item" v-bind:class="{active : sendObj.dateKind == 4}" @click="getNowMonthData">{{nowMonth}}</div>
                <div class="item" v-bind:class="{active : sendObj.dateKind == 5}" @click="getResetDayData">自定义日期<span v-show="sendObj.dateKind == 5">：{{sendObj.sworkdate}}</span></div>
              </div>
            </div>
            <div class="selectWrapper">
              <div class="selectTitle">来访事由：</div>
              <div class="selectContainer">
                <div class="item" v-bind:class="{active : sendObj.cause == item}" v-for="item in visitResultArray" v-bind:data-visitresult="item" @click="selectVisitResult">
                  {{item}}
                </div>
              </div>
            </div>
            <div class="selectWrapper">
              <div class="selectTitle">会见人员：</div>
              <div class="selectContainer">
                <div class="item" v-bind:class="{active : sendObj.interviewee == item.interviewee}" v-for="item in intervieweeList" v-bind:data-interviewee="item.interviewee" @click="selectInterviewee">
                  {{item.interviewee}}
                </div>
              </div>
            </div>
            <div class="selectWrapper">
              <div class="selectTitle">公司名：<input type="type" v-model="selectCompanyName" v-on:input="watchInput" style="box-sizing: border-box;width: 170px;padding-left: 4px;border: 1px solid #444;" placeholder="筛选公司名称"></div>
              <div class="selectContainer">
                <div class="item" v-bind:class="{active : sendObj.company == item.company}" v-for="item in companyList" v-bind:data-company="item.company" @click="selectCompany">
                  {{item.company}}
                </div>
              </div>
            </div>
            <div class="selectWrapper">
              <div class="selectTitle">昵称：</div>
              <div class="selectContainer">
                <div class="item" v-bind:class="{active : sendObj.wechatnick == item.wechatnick}" v-for="item in wechatnickList" v-bind:data-wechatnick="item.wechatnick" @click="selectVisitor">
                  {{item.wechatnick}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex;margin-top: 7px;">
          <button class="weui-btn weui-btn_primary" style="width:45%;margin-top:0;vertical-align:top;" @click="sendData">确定</button>
          <button class="weui-btn weui-btn_primary cancel" style="width:45%;margin-top:0;vertical-align:top;background-color: #ccc;" @click="hideToast">取消</button>
        </div>
        <calendar v-show="isShowCalendar" :mode="mode" @change="onChange"/>
      </div>
    </div>
</template>
<script>
var T;

import BScroll from 'better-scroll';
import calendar from '../calendar/calendar';
export default {
  data: function() {
    return {
      dataList: [],
      dataListResource: [],
      isShowToast: false,
      preMonth: "",
      nowMonth: "",
      intervieweeList: [],
      companyList: [],
      wechatnickList: [],
      isnow: true,
      selectCompanyName: "",
      visitResultArray: ["业务", "工程", "拜访", "快递", "面试", "送货", "提货"],
      sendObj: {
        cause: "",
        interviewee: "",
        company: "",
        wechatnick: "",
        sworkdate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-1",
        eworkdate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date(new Date().getFullYear(), (new Date().getMonth() + 1), 0).getDate(),
        dateKind: 4
      },
      isShowCalendar: false,
      mode: 'single',
    }
  },
  methods: {
    reload: function(startDate, endDate) {
      var that = this;
      var url = this.seieiURL + "/estapi/api/VisitCheckIn/CheckIn_YM?sworkdate=" + startDate + "&eworkdate=" + endDate;
      this.$http.get(url).then(resp => {
        that.dataListResource = resp.body;
        that.dataList = resp.body;
        that.isShowToast = false;
      });
    },
    showToast: function() {
      this.isShowToast = true;
    },
    hideToast: function() {
      this.isShowToast = false;
      this.$set(this.sendObj, "cause", "");
      this.$set(this.sendObj, "interviewee", "");
      this.$set(this.sendObj, "company", "");
      this.$set(this.sendObj, "wechatnick", "");
    },
    getPreMonthData: function() {
      this.isnow = false;
      var
        list = this.preMonth.split("-"),
        startDate = this.preMonth + "-" + 1,
        templ = new Date(new Date(this.preMonth + "-" + new Date(list[0], list[1], 0).getDate()).getTime() + 24*60*60*1000),
        endDate = templ.getFullYear() + "-" + (templ.getMonth() +1) + "-" + templ.getDate();

      this.$set(this.sendObj, "sworkdate", startDate);
      this.$set(this.sendObj, "eworkdate", endDate);
      this.$set(this.sendObj, "dateKind", 3);
    },
    getNowMonthData: function() {
      this.isnow = true;
      var
        list = this.nowMonth.split("-"),
        startDate = this.nowMonth + "-" + 1,
        templ = new Date(new Date(this.nowMonth + "-" + new Date(list[0], list[1], 0).getDate()).getTime() + 24*60*60*1000),
        endDate = templ.getFullYear() + "-" + (templ.getMonth() +1) + "-" + templ.getDate();

      this.$set(this.sendObj, "sworkdate", startDate);
      this.$set(this.sendObj, "eworkdate", endDate);
      this.$set(this.sendObj, "dateKind", 4);
    },
    getTodayData: function() {
      var
        date = new Date(),
        startDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        endDate = new Date(new Date().getTime() + 24*60*60*1000),
        endDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
      this.$set(this.sendObj, "sworkdate", startDate);
      this.$set(this.sendObj, "eworkdate", endDate);
      this.$set(this.sendObj, "dateKind", 1);
    },
    getWeekData: function() {
      var
        now = new Date(),
        templForE = new Date(now.getTime() + 24*60*60*1000),
        year = now.getFullYear(),
        month = now.getMonth(),
        date = now.getDate(),
        endDate = templForE.getFullYear() + "-" + (templForE.getMonth() + 1) + "-" + templForE.getDate(),
        weekday = now.getDay() == 0 ? 7 : now.getDay(),
        templ = (weekday - 1) * 24 * 60 * 60 * 1000,
        timeStamp = now.getTime() - templ,
        startDate = new Date(timeStamp).getFullYear() + "-" + (new Date(timeStamp).getMonth() + 1) + "-" + new Date(timeStamp).getDate();
      this.$set(this.sendObj, "sworkdate", startDate);
      this.$set(this.sendObj, "eworkdate", endDate);
      this.$set(this.sendObj, "dateKind", 2);
    },
    getResetDayData: function() {
      this.$set(this.sendObj, "dateKind", 5);
      this.isShowCalendar = !this.isShowCalendar;
    },
    selectVisitResult: function(e) {
      this.$set(this.sendObj, "cause", e.target.dataset.visitresult);
    },
    selectInterviewee: function(e) {
      this.$set(this.sendObj, "interviewee", e.target.dataset.interviewee);
    },
    selectCompany: function(e) {
      this.$set(this.sendObj, "company", e.target.dataset.company);
    },
    selectVisitor: function(e) {
      this.$set(this.sendObj, "wechatnick", e.target.dataset.wechatnick);
    },
    watchInput: function() {
      var that = this;
      clearTimeout(T);
      T = setTimeout(() => {
        var url = that.seieiURL + "/estapi/api/VisitCheckIn/FilterCompany?keyword=" + that.selectCompanyName;
        that.$http.get(url).then(resp => {
          that.companyList = resp.body;
        }, response => {
          console.log("发送失败"+response.status+","+response.statusText);
        });
      }, 1500);
    },
    sendData: function() {
      var url = this.seieiURL + "/estapi/api/VisitCheckIn/MutilSearch?wechatnick=" + this.sendObj.wechatnick +"&company=" + this.sendObj.company + "&interviewee=" + this.sendObj.interviewee +"&cause=" + this.sendObj.cause + "&sworkdate=" + this.sendObj.sworkdate + "&eworkdate=" + this.sendObj.eworkdate;
      var that = this;
      this.$http.get(url).then((resp) => {
        that.dataListResource = resp.body;
        that.dataList = resp.body;
        that.isShowToast = false;
      })
    },
    clear: function() {
      this.sendObj = {
        cause: "",
        interviewee: "",
        company: "",
        wechatnick: "",
        sworkdate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-1",
        eworkdate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date(new Date().getFullYear(), (new Date().getMonth() + 1), 0).getDate(),
        dateKind: 4
      }
    },
    onChange(date) {
      this.isShowCalendar = false;
      var
        startDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        templ = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate(),
        endDate = new Date(new Date(templ).getTime() + 24*60*60*1000),
        endDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
      this.$set(this.sendObj, "sworkdate", startDate);
      this.$set(this.sendObj, "eworkdate", endDate);
    },
  },
  created: function() {
    var
      that = this,
      date = new Date(),
      startDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-1",
      endDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + new Date(date.getFullYear(), (date.getMonth() + 1), 0).getDate();
    this.nowMonth = date.getFullYear() + "-" + (date.getMonth() + 1);
    this.endDay = new Date(date.getFullYear(), (date.getMonth() + 1), 0).getDate();
    if ((date.getMonth() + 1) == 1) {
      this.preMonth = (date.getFullYear() - 1) + "-12";
    } else {
      this.preMonth = date.getFullYear() + "-" + date.getMonth();
    }
    this.reload(startDate, endDate);
    this.$http.get(this.seieiURL + "/estapi/api/VisitCheckIn/IntervieweeItem").then((resp) => {
      that.intervieweeList = resp.body;
      that.$http.get(that.seieiURL + "/estapi/api/VisitCheckIn/CompanyItem").then((resp1) => {
        that.companyList = resp1.body;
        that.$http.get(that.seieiURL + "/estapi/api/VisitCheckIn/WechatnickItem").then((resp2) => {
          that.wechatnickList = resp2.body;
          that.$nextTick(function() {
            var cssHook = that.$refs['cssHook'];
            cssHook.style.height = window.innerHeight - 43 - 50 + "px";
            that.$refs['tableWrapper'].style.height = window.innerHeight - 48 + "px";
            // new BScroll(cssHook, {click: true});
          })
        });
      });
    });
  },
  components: {
    "calendar": calendar
  }
}

</script>
<style scoped>
.visitMsg-component .tableWrapper {
  margin-top: 48px;
  overflow: scroll;
  white-space: nowrap;
}

.visitMsg-component .rightButton {
  display: inline-block;
  position: absolute;
  top: 0;
  right: 1em;
  line-height: 48px;
  font-size: 12px
}

.visitMsg-component #searchMonthWrapper {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 10000000;
}

.visitMsg-component #searchMonthWrapper .title {
  font-size: 24px;
  text-align: center;
  line-height: 1.8em
}

.visitMsg-component .selectWrapper {
  padding: 10px 0 5px 0;
  border-top: 1px solid #ddd;
}

.visitMsg-component .selectTitle {
  font-size: 16px;
  padding-left: 1em;
}

.visitMsg-component .selectContainer {
  padding-left: 10px
}

.visitMsg-component .selectContainer .item {
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
  line-height: 1;
  background-color: #ddd;
  border-radius: 4px;
}

.visitMsg-component #searchMonthWrapper .enableFalse {
  background-color: #a0a0a0
}

.visitMsg-component .weui-btn_primary {
  background-color: #1AAD19;
}

.visitMsg-component button.weui-btn,
.visitMsg-component input.weui-btn {
  width: 100%;
  border-width: 0;
  outline: 0;
  -webkit-appearance: none;
}

.visitMsg-component .weui-btn {
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-left: 14px;
  padding-right: 14px;
  box-sizing: border-box;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  color: #FFFFFF;
  line-height: 2;
  border-radius: 5px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  overflow: hidden;
}

.visitMsg-component .weui-btn:after {
  content: " ";
  width: 200%;
  height: 200%;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  box-sizing: border-box;
  border-radius: 10px;
}

.visitMsg-component .right .txt {
  font-size: 12px;
  line-height: 1.4;
  color: #444;
}

.visitMsg-component .active {
  color: #fff;
  background-color: #1aad19!important
}

.visitMsg-component .modal {
  opacity: 1!important;
}
.visitMsg-component .calendar {
  display: block!important;
}
</style>
