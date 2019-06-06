<template>
  <div class="myIntegrationDetail-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack">
        <i class="icon-chevron-left"></i>
        <span>返回</span>
      </a>
      <div>{{title}}</div>
    </div>
    <!-- 奖分详情 -->
    <div class="contentWrapper" v-if="isNormal">
      <div class="weui-search-bar" id="searchBar" style="position: fixed;top: 48px;left: 0;right: 0;z-index: 1;">
        <form class="weui-search-bar__form">
          <div class="weui-search-bar__box">
            <i class="weui-icon-search"></i>
            <input
              type="search"
              class="weui-search-bar__input"
              id="searchInput"
              placeholder="事件模糊查找"
              required
              v-on:input="watchSelectEventInput"
              v-model="searchSelectTxt"
            >
            <a href="javascript:void(0);" class="weui-icon-clear" id="searchClear"></a>
          </div>
          <label class="weui-search-bar__label" id="searchText">
            <i class="weui-icon-search"></i>
            <span style="line-height:32px">事件模糊查找</span>
          </label>
        </form>
        <a href="javascript:void(0);" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
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
        <div class="item" style="width: 100%;border-top: none;" @click="showStatusPicker">
          {{statusTxt}}
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
                v-bind:class="{ 'greenTxt': item.addintegral && item.addintegral !=0, 'redFont': item.deductintegral && item.deductintegral !=0 }"
              >{{item.addintegral && item.addintegral !=0 ? item.addintegral : "- " + item.deductintegral}}</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">状态</label>
              <span
                class="weui-form-preview__value"
              >{{item.checkedBoolean && item.approve && !item.cancellation ? "已通过" : "未通过"}}</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">姓名</label>
              <span class="weui-form-preview__value">{{item.empname}}</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">审核人</label>
              <span class="weui-form-preview__value">{{item.checker}}</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">审批人</label>
              <span class="weui-form-preview__value">{{item.directorname}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 固定奖分详情 -->
    <div v-if="isFixed" style="margin-top: 60px;">
      <div
        class="weui-form-preview"
        style="margin-bottom: 10px;"
        v-for="(item, index) in fixedIntegrationList"
        v-bind:key="index"
      >
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目类型</label>
            <span class="weui-form-preview__value">{{item.kind}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目名称</label>
            <span class="weui-form-preview__value">{{item.name}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">固定分</label>
            <span class="weui-form-preview__value greenTxt">{{item.integral}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 每月奖分详情 -->
    <div v-if="isEachMonth" style="margin-top: 60px;">
      <div class="weui-form-preview" style="margin-bottom: 10px;">
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目类型</label>
            <span class="weui-form-preview__value">系统加分</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目名称</label>
            <span class="weui-form-preview__value">全月上班下班准时，没有迟到早退-自动加分</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">奖扣分</label>
            <span class="weui-form-preview__value greenTxt">
              100
            </span>
          </div>
        </div>
      </div>
      <div class="weui-form-preview" style="margin-bottom: 10px;">
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目类型</label>
            <span class="weui-form-preview__value">系统加分</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目名称</label>
            <span class="weui-form-preview__value">全年上班下班准时，没有迟到早退-自动加分</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">奖扣分</label>
            <span class="weui-form-preview__value greenTxt">
              1000
            </span>
          </div>
        </div>
      </div>
      <div class="weui-form-preview" style="margin-bottom: 10px;">
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目类型</label>
            <span class="weui-form-preview__value">系统加分</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目名称</label>
            <span class="weui-form-preview__value">当月没有任何请假和旷工-自动加分</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">奖扣分</label>
            <span class="weui-form-preview__value greenTxt">
              50
            </span>
          </div>
        </div>
      </div>
      <div class="weui-form-preview" style="margin-bottom: 10px;">
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目类型</label>
            <span class="weui-form-preview__value">系统加分</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目名称</label>
            <span class="weui-form-preview__value">车位、烫衣员、车办员超产奖分（等于超产总额/10）-自动加分</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">奖扣分</label>
            <span class="weui-form-preview__value greenTxt">
              0 - 400
            </span>
          </div>
        </div>
      </div>
      <div class="weui-form-preview" style="margin-bottom: 10px;">
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目类型</label>
            <span class="weui-form-preview__value">系统加分</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目名称</label>
            <span class="weui-form-preview__value">员工生日当天-自动加分</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">奖扣分</label>
            <span class="weui-form-preview__value greenTxt">
              100
            </span>
          </div>
        </div>
      </div>
      <div class="weui-form-preview" style="margin-bottom: 10px;">
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目类型</label>
            <span class="weui-form-preview__value">系统加分</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目名称</label>
            <span class="weui-form-preview__value">当月部门PK得到金牌者-自动加分</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">奖扣分</label>
            <span class="weui-form-preview__value greenTxt">
              1000
            </span>
          </div>
        </div>
      </div>
      <div class="weui-form-preview" style="margin-bottom: 10px;">
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目类型</label>
            <span class="weui-form-preview__value">系统加分</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目名称</label>
            <span class="weui-form-preview__value">当月部门PK得到银牌者-自动加分</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">奖扣分</label>
            <span class="weui-form-preview__value greenTxt">
              800
            </span>
          </div>
        </div>
      </div>
      <div class="weui-form-preview" style="margin-bottom: 10px;">
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目类型</label>
            <span class="weui-form-preview__value">系统加分</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目名称</label>
            <span class="weui-form-preview__value">当月部门PK得到铜牌者-自动加分</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">奖扣分</label>
            <span class="weui-form-preview__value greenTxt">
              500
            </span>
          </div>
        </div>
      </div>
      <div class="weui-form-preview" style="margin-bottom: 10px;" v-for="(item, index) in eachMonthIntegrationList" v-bind:key="index">
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目类型</label>
            <span class="weui-form-preview__value">{{item.category}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">项目名称</label>
            <span class="weui-form-preview__value">{{item.eventStr}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">奖扣分</label>
            <span class="weui-form-preview__value greenTxt">
              {{item.addintegral}}
            </span>
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
    <awesome-picker
      ref="statusPicker"
      :data="statusPicker.data"
      :textTitle="statusPicker.title"
      @confirm="statusPickerConfirm"
    ></awesome-picker>
  </div>
</template>

<script>
var now = new Date();
var T;

export default {
  data: function() {
    return {
      title: "", // 页面标题
      isNormal: false, // 页面类型
      isFixed: false, // 页面类型
      isEachMonth: false, // 页面类型
      timePicker: {
        title: "选择日期"
      }, // time Picker 标题
      statusPicker: {
        title: "选择状态",
        data: [["全部状态" , "通过", "未通过"]]
      }, // 奖分详情状态可选列表
      stimeTxt: this.formatTime(now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + "1日"), // 筛选开始时间
      etimeTxt: this.formatTime(now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() + "日"), // 筛选结束时间
      statusTxt: "全部状态", // 已选详情状态
      integrationDetailList: [], // 积分详情源列表
      integrationDetailListForShow: [], // 积分详情用于显示的列表
      userMsgForIntegration: {}, // 用户积分信息
      fixedIntegrationList: [], // 固定积分详情
      eachMonthIntegrationList: [], // 每月积分详情
      searchSelectTxt: "", // 筛选输入事件
    }
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
      console.log(data);
      this.etimeTxt = this.formatTime(data[0].value + data[1].value + data[2].value);
      this.fiterOfIntegrationDetailList(this.stimeTxt, this.etimeTxt, this.statusTxt);
    },
    // 开始时间筛选
    stimePickerConfirm: function(data) {
      console.log(data);
      this.stimeTxt = this.formatTime(data[0].value + data[1].value + data[2].value);
      this.fiterOfIntegrationDetailList(this.stimeTxt, this.etimeTxt, this.statusTxt);
    },
    // 显示状态 Picker
    showStatusPicker: function() {
      this.$refs.statusPicker.show();
    },
    // 确定选择状态
    statusPickerConfirm: function(data) {
      this.statusTxt = data[0].value;
      this.fiterOfIntegrationDetailList(this.stimeTxt, this.etimeTxt, this.statusTxt);
    },
    // 筛选方法
    fiterOfIntegrationDetailList(stimeTxt, etimeTxt, status) {
      var stime = new Date(stimeTxt).getTime();
      etimeTxt = this.addOneDay(etimeTxt);
      var etime = new Date(etimeTxt).getTime();
      var integrationDetailListForShow = [];
      this.integrationDetailList.forEach(item => {
        var itemTime = new Date(item.etime.split("T")[0]).getTime();
        if (stime <= itemTime && itemTime <= etime) {
          if (status == "全部状态") {
            integrationDetailListForShow.push(item);
          }
          else if (status == "通过" && item.approve && !item.cancellation) {
            integrationDetailListForShow.push(item);
          }
          else if (status == "未通过" && (!item.approve || item.cancellation)){
            integrationDetailListForShow.push(item);
          }
        }
      });
      this.integrationDetailListForShow = integrationDetailListForShow;
    },
    // 事件模糊查找
    watchSelectEventInput: function() {
      var that = this;
      clearTimeout(T);
      T = setTimeout(() => {
        if (that.searchSelectTxt.trim() == "") {
          that.integrationDetailListForShow = that.integrationDetailList;
          return;
        }
        else {
          var integrationDetailListForShow = [];
          var re = new RegExp(that.searchSelectTxt);
          for (var i=0; i<that.integrationDetailList.length; i++) {
            if (re.test(that.integrationDetailList[i].eventStr)) {
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
    var usermsg = JSON.parse(this.$store.state.userMsg);
    this.userMsgForIntegration = this.$store.state.userMsgForIntegration;
    this.isNormal = this.$route.params.kind == "normal";
    this.isFixed = this.$route.params.kind == "fixed";
    this.isEachMonth = this.$route.params.kind == "eachMonth";
    /* 奖分详情模块 */
    if (this.isNormal) {
      this.title = "我的奖扣详情";
      this.$http.get(this.seieiURL + "/estapi/api/Integral/getMyIntegralDetailByUserId?userId=" + usermsg.EmployeeNo).then(
        resp => {
          that.integrationDetailList = resp.body.slice(0, resp.body.length);
          that.fiterOfIntegrationDetailList(that.stimeTxt, that.etimeTxt, that.statusTxt);
        }
      );
    }
    /* 固定奖分模块 */
    if (this.isFixed) {
      this.title = "固定奖分规则";
      this.$http.get(this.seieiURL + '/estapi/api/Integral/getFixedIntegralBySerialno?serialno=' + this.userMsgForIntegration.serialno).then(
        resp => {
          that.fixedIntegrationList = resp.body;
        }
      )
    }
    /* 每月奖分模块 */
    if (this.isEachMonth) {
      this.title = "每月奖分规则";
      this.$http.get(this.seieiURL + '/estapi/api/Integral/getEachMonthIntegralByUserId?userId=' + usermsg.EmployeeNo).then(
        resp => {
          that.eachMonthIntegrationList = resp.body;
        }
      );
    }
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
  margin-top: 190px;
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
</style>