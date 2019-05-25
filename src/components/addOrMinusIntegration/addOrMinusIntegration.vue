<template>
  <div class="addOrMinusIntegration-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack">
        <i class="icon-chevron-left"></i>
        <span>返回</span>
      </a>
      <div>奖分奖扣</div>
    </div>
    <div
      class="contentWrapper"
      v-show="!isShowSelectEvent && !isShowSelectPerson && !isShowSelectedPerson"
    >
      <div class="inputWrapper">
        <div class="title">奖分事项</div>
        <div class="input">
          <input placeholder="请输入事项说明" v-model="selectEventTxt">
        </div>
        <div class="btn" @click="showSelectEvent">选择</div>
      </div>
      <div class="inputWrapper">
        <div class="title">奖扣对象</div>
        <div class="input" style="width: 30%;">已勾选了{{selectPersonListForSumbit.length}}人</div>
        <div class="btn" @click="showSelectPerson">新增</div>
        <div
          class="btn"
          v-show="selectPersonListForSumbit.length>0"
          @click="showSelectedPerson"
        >查看已选</div>
      </div>
      <div class="inputWrapper">
        <div class="title">奖扣分值</div>
        <div class="input">
          <input placeholder="请输入奖扣分值" v-model="selectEventIntegration">
        </div>
      </div>
      <div class="inputWrapper" style="margin-top: 10px;border-top: 1px solid #ddd;">
        <div class="title">申请人</div>
        <div class="input">{{applicant.Name}}</div>
      </div>
      <div class="inputWrapper">
        <div class="title">审批人</div>
        <div class="input"></div>
      </div>
      <div class="btnWrapper">
        <!-- <div class="btn" @click="saveData">保存</div> -->
        <div class="btn" @click="submitData">提交</div>
      </div>
    </div>
    <div class="contentWrapper" v-show="isShowSelectEvent">
      <div class="selectEventTitle" style="top: 92px;background-color: #e4e4e4;">点击选择奖扣事件</div>
      <div class="weui-search-bar" id="searchBar" style="position: fixed;top: 48px;left: 0;right: 0;">
        <form class="weui-search-bar__form">
          <div class="weui-search-bar__box">
            <i class="weui-icon-search"></i>
            <input
              type="search"
              class="weui-search-bar__input"
              id="searchInput"
              placeholder="搜索"
              required
              v-on:input="watchSelectEventInput"
              v-model="searchSelectTxt"
            >
            <a href="javascript:void(0);" class="weui-icon-clear" id="searchClear"></a>
          </div>
          <label class="weui-search-bar__label" id="searchText">
            <i class="weui-icon-search"></i>
            <span style="line-height:32px">搜索</span>
          </label>
        </form>
        <a href="javascript:void(0);" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
      </div>
      <ul class="selectWrapper">
        <li
          v-for="(item, index) in eventTxtList"
          :key="index"
          class="selectItem"
          @click="selectEvent(index)"
        >{{item.eventString}}</li>
      </ul>
      <div class="cancelWrapper">
        <div class="btn" @click="hideSelectEvent">取消</div>
      </div>
    </div>
    <div class="contentWrapper selectPersonWrapper" v-show="isShowSelectPerson">
      <div class="inputBlock">
        <div class="inputBar">
          <div class="inputItem">
            <div class="title">工号</div>
            <div class="input">
              <input placeholder="输入工号" v-model="inputID" v-on:input="watchInput">
            </div>
          </div>
          <div class="inputItem">
            <div class="title">姓名</div>
            <div class="input">
              <input placeholder="输入姓名" v-model="inputName" v-on:input="watchInput">
            </div>
          </div>
        </div>
        <div class="inputBar">
          <div class="inputItem">
            <div class="title">部门</div>
            <div class="input">
              <input placeholder="输入部门" v-model="inputDep" v-on:input="watchInput">
            </div>
          </div>
          <div class="inputItem">
            <div class="title">车间</div>
            <div class="input">
              <input placeholder="输入车间" v-model="inputWorkShop" v-on:input="watchInput">
            </div>
          </div>
        </div>
      </div>
      <div class="selectContent">
        <div v-for="(item, index) in selectPersonList" v-bind:key="index">
          <div
            class="selectItemForPerson"
            v-bind:class="{active : isActiveForSelectPerson(item.code)}"
            @click="selectOnePerson(item)"
          >{{item.name}}</div>
        </div>
      </div>
      <div class="btnWrapper">
        <div class="btn" @click="toggleSelectAllPerson">{{selectPersonBtnTxt}}</div>
        <div class="btn" @click="submitSelectPerson">确定</div>
        <div class="btn" @click="hideSelectPerson">取消</div>
      </div>
    </div>
    <div class="contentWrapper selectPersonWrapper" v-show="isShowSelectedPerson">
      <div class="selectEventTitle">点击移除选择对象</div>
      <div class="selectContent" style="padding-top: 35px;">
        <div v-for="(item, index) in selectPersonListForSumbit" v-bind:key="index">
          <div
            class="selectItemForPerson"
            v-bind:class="{active : isActiveForSelectPerson(item.code)}"
            @click="selectOnePerson(item)"
          >{{item.name}}</div>
        </div>
      </div>
      <div class="btnWrapper">
        <div class="btn" @click="submitSelectPerson">确定</div>
        <div class="btn" @click="hideSelectPerson">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

var T;
export default {
  data: function() {
    return {
      isShowSelectEvent: false, // 是否显示选择事件窗口
      selectEventTxt: "", // 提交的事件选项
      selectEventIntegration: "", // 已选事件的奖扣分
      eventTxtList: [], // 后台获取的所有可选的事件
      selectEventIndex: 0, // 已选吼后台事件的索引
      searchSelectTxt: "", // 筛选后台事件列表的模糊查找文本
      isShowSelectPerson: false, // 是否显示选择员工窗口
      inputID: "", // 筛选员工的工号
      inputName: "", // 筛选员工的姓名
      inputDep: "", // 筛选员工的部门
      inputWorkShop: "", // 筛选员工的车间
      selectPersonList: [], // 后台可选员工的列表
      selectPersonBtnTxt: "全选", // 用于全选按钮或全不选按钮
      selectPersonListForActive: [], // 用于显示已选员工的视图显示
      selectPersonListForSumbit: [], // 已选员工的列表
      isShowSelectedPerson: false, // 是否显示已选员工编辑窗口
      applicant: "", // 申请人
      serialno: "", // 保存主表主键
      canSumbit: false, // 是否可以点击提交按钮
    };
  },
  methods: {
    // 显示选择事件窗口
    showSelectEvent: function() {
      this.isShowSelectEvent = true;
    },
    // 选择事件
    selectEvent: function(index) {
      this.selectEventIndex = index;
      this.isShowSelectEvent = false;
      this.selectEventTxt = this.eventTxtList[index].eventString;
      this.selectEventIntegration =
        this.eventTxtList[this.selectEventIndex].integral == null
          ? "-" + this.eventTxtList[this.selectEventIndex].deductintegral
          : this.eventTxtList[this.selectEventIndex].integral;
    },
    // 显示选择人员窗口
    showSelectPerson: function() {
      this.selectPersonListForActive = this.selectPersonListForSumbit.slice(
        0,
        this.selectPersonListForSumbit.length
      );
      this.isShowSelectPerson = true;
    },
    // 选择人员窗口取消按钮
    hideSelectPerson: function() {
      this.isShowSelectedPerson = false;
      this.selectPersonBtnTxt = "全选";
      this.isShowSelectPerson = false;
      this.selectPersonList = [];
      this.selectPersonListForActive = [];
      this.inputID = "";
      this.inputName = "";
      this.inputDep = "";
      this.inputWorkShop = "";
    },
    // 全选按钮
    toggleSelectAllPerson: function() {
      if (this.selectPersonBtnTxt == "全选") {
        for (var i = 0; i < this.selectPersonList.length; i++) {
          var isHadCode = false;
          for (var n = 0; n < this.selectPersonListForActive.length; n++) {
            if (
              this.selectPersonListForActive[n].code ==
              this.selectPersonList[i].code
            ) {
              isHadCode = true;
            }
          }
          if (!isHadCode) {
            this.selectPersonListForActive.push(this.selectPersonList[i]);
          }
        }
        this.selectPersonBtnTxt = "全不选";
      } else {
        var list = this.selectPersonListForActive.slice(
          0,
          this.selectPersonListForActive.length
        );
        for (var i = 0; i < this.selectPersonList.length; i++) {
          for (var n = 0; n < list.length; n++) {
            if (list[n].code == this.selectPersonList[i].code) {
              list.splice(n, 1);
              break;
            }
          }
        }
        this.selectPersonListForActive = list;
        this.selectPersonBtnTxt = "全选";
      }
    },
    // 是否为已选人员
    isActiveForSelectPerson: function(code) {
      var isActiveForSelectPerson = false;
      for (var i = 0; i < this.selectPersonListForActive.length; i++) {
        if (this.selectPersonListForActive[i].code == code) {
          isActiveForSelectPerson = true;
        }
      }
      return isActiveForSelectPerson;
    },
    // 点击选择人员
    selectOnePerson: function(item) {
      var index;
      var list = this.selectPersonListForActive.slice(
        0,
        this.selectPersonListForActive.length
      );
      for (var i = 0; i < this.selectPersonListForActive.length; i++) {
        if (this.selectPersonListForActive[i].code == item.code) {
          index = i;
        }
      }
      if (index != undefined) {
        list.splice(index, 1);
        this.selectPersonListForActive = list;
      } else {
        this.selectPersonListForActive.push(item);
      }
    },
    // 点击选择人员
    submitSelectPerson: function() {
      this.isShowSelectPerson = false;
      this.isShowSelectedPerson = false;
      this.selectPersonListForSumbit = this.selectPersonListForActive.slice(
        0,
        this.selectPersonListForActive.length
      );
    },
    // 检查人员筛选输入事件
    watchInput: function() {
      var that = this;
      clearTimeout(T);
      T = setTimeout(() => {
        var url =
          that.seieiURL +
          "/estapi/api/Integral/getStaff?id=" +
          that.inputID +
          "&name=" +
          that.inputName +
          "&dep=" +
          that.inputDep +
          "&workshop=" +
          that.inputWorkShop;
        that.$http.get(url).then(
          resp => {
            that.selectPersonList = resp.body;
          },
          response => {
            console.log(
              "发送失败" + response.status + "," + response.statusText
            );
          }
        );
      }, 1500);
    },
    // 监测选择事件输入框
    watchSelectEventInput: function() {
      var that = this;
      clearTimeout(T);
      T = setTimeout(() => {
        var url =
          that.seieiURL +
          "/estapi/api/Integral/getEventByCondition?eventStr=" +
          that.searchSelectTxt;
        that.$http.get(url).then(
          resp => {
            that.eventTxtList = resp.body;
          },
          response => {
            console.log(
              "发送失败" + response.status + "," + response.statusText
            );
          }
        );
      }, 1500);
    },
    // 显示选择人员窗口
    showSelectedPerson: function() {
      this.isShowSelectedPerson = true;
      this.selectPersonListForActive = this.selectPersonListForSumbit.slice(
        0,
        this.selectPersonListForSumbit.length
      );
    },
    // 选择事件的取消按钮
    hideSelectEvent: function() {
      this.isShowSelectEvent = false;
      this.selectEventTxt = this.searchSelectTxt;
    },
    // 保存按钮
    saveData: function() {
      var reg = /^\-?\d*$/; // 分数正则表达式
      console.log(this.selectPersonListForSumbit.length);
      console.log(this.selectEventTxt);
      console.log(this.selectEventIntegration);
      console.log(reg.test(this.selectEventIntegration));
      if (this.selectPersonListForSumbit.length == 0 || this.selectEventTxt == "" || !reg.test(this.selectEventIntegration)) {
        alert("请选择奖扣事件、奖扣对象或输入正确格式的分数值");
        return;
      }
      var that = this;
      this.$http.get(this.seieiURL + "/estapi/api/Integral/saveMainTableForIntegral?code=" + that.applicant.Code).then(
        resp => {
          this.serialno = resp.body.guid;
          this.canSumbit = true;
          alert("保存成功");
        },
        response => {
          console.log("发送失败" + response.status + "," + response.statusText);
        }
      );
    },
    // 提交按钮
    submitData: function() {
/*       if (!this.canSumbit && this.serialno) {
        alert("请先保存数据后再点击提交");
        return;
      } */
      var that = this;
      var obj = {};
      obj.serialno = this.serialno;
      obj.eventString = this.selectEventTxt;
      obj.code = this.applicant.Code;
      if (this.eventTxtList[this.selectEventIndex] && this.eventTxtList[this.selectEventIndex].eventString == this.selectEventTxt) {
        obj.frequency = this.eventTxtList[this.selectEventIndex].frequency ? this.eventTxtList[this.selectEventIndex].frequency : "";
      } else {
        obj.frequency = "";
      }
      
      var reg = /^\-?\d*$/; // 分数正则表达式
      if (this.selectPersonListForSumbit.length == 0 || this.selectEventTxt == "" || !reg.test(this.selectEventIntegration)) {
        alert("请选择奖扣事件、奖扣对象或输入正确格式的分数值");
        return;
      }

      // 输入的分数为负数
      if (this.selectEventIntegration[0] == "-") {
        obj.deductintegral = this.selectEventIntegration.split("-")[1];
      } else {
        obj.addintegral = this.selectEventIntegration;
      }

      obj.buser = this.applicant.Code;
      var personObjList = [];
      for (var i=0; i<this.selectPersonListForSumbit.length; i++) {
        var personObj = {};
        personObj.empno = this.selectPersonListForSumbit[i].code;
        personObj.empname = this.selectPersonListForSumbit[i].name;
        personObj.dept = this.selectPersonListForSumbit[i].departname;
        personObj.workshop = this.selectPersonListForSumbit[i].workshop ? this.selectPersonListForSumbit[i].workshop : "";
        personObj.workgroup = this.selectPersonListForSumbit[i].zhubie ? this.selectPersonListForSumbit[i].zhubie : "";
        personObjList.push(personObj);
      }
      obj.personObjList = personObjList;
      var form = "=" + JSON.stringify(obj);
      // 传递 Form-Data 数据
      Vue.http.options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      };
      this.$http.post(this.seieiURL + "/estapi/api/Integral/saveSubtablesForIntegral", form).then(
        resp => {
          that.canSumbit = false;
          that.selectEventTxt = "";
          that.selectEventIntegration = "";
          that.selectPersonListForSumbit = [];
          alert("提交成功");
        },
        response => {
          console.log("发送失败" + response.status + "," + response.statusText);
        }
      );
    },
    // 返回按钮
    goBack: function() {
      // 如果当前正在选择事件
      if (this.isShowSelectEvent) {
        this.selectEventTxt = this.searchSelectTxt;
        this.isShowSelectEvent = false;
      }
      // 如果当前正在选择员工
      else if (this.isShowSelectPerson) {
        this.isShowSelectedPerson = false;
        this.selectPersonBtnTxt = "全选";
        this.isShowSelectPerson = false;
        this.selectPersonList = [];
        this.selectPersonListForActive = [];
        this.inputID = "";
        this.inputName = "";
        this.inputDep = "";
        this.inputWorkShop = "";
      }
      // 如果当前正在编辑已选员工
      else if (this.isShowSelectedPerson) {
        this.isShowSelectedPerson = false;
      }
      // 否则返回之前页面
      else {
        this.$router.go(-1);
      }
    },
  },
  created: function() {
    this.applicant = JSON.parse(this.$store.state.userMsg);
    console.log(this.applicant);
    this.$http.get(this.seieiURL + "/estapi/api/Integral/getAllEvent").then(
      resp => {
        this.eventTxtList = resp.body;
      },
      response => {
        console.log("发送失败" + response.status + "," + response.statusText);
      }
    );
  }
};
</script>

<style scoped>
.addOrMinusIntegration-component {
}
.contentWrapper {
  margin-top: 48px;
}
.inputWrapper {
  padding-left: 10px;
  font-size: 0;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}
.inputWrapper .title {
  display: inline-block;
  padding: 0 4px;
  font-size: 16px;
  vertical-align: top;
}
.inputWrapper .input {
  box-sizing: border-box;
  padding: 0 10px;
  display: inline-block;
  font-size: 12px;
  width: 60%;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 40px;
  white-space: nowrap;
  color: #929292;
}
.inputWrapper .input input {
  width: 100%;
  color: #929292;
}
.inputWrapper .btn {
  float: right;
  display: inline-block;
  margin: 5px 10px 0 0;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  border-radius: 4px;
  background-color: #6094d6;
  color: #fff;
}
.selectWrapper {
  padding: 72px 0 55px 0;
}
.selectEventTitle {
  position: fixed;
  top: 48px;
  left: 0px;
  right: 0px;
  padding-left: 10px;
  line-height: 1.8em;
  font-size: 16px;
  color: #444;
  background-color: #ddd;
}
.selectWrapper .selectItem {
  box-sizing: border-box;
  margin: 10px auto;
  width: 95%;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #444;
}
.cancelWrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background-color: #fff;
}
.cancelWrapper .btn {
  margin: auto;
  margin-top: 4px;
  text-align: center;
  width: 80%;
  height: 40px;
  font-size: 24px;
  line-height: 40px;
  color: #fff;
  background-color: #bdbdbd;
  border-radius: 4px;
}
.selectPersonWrapper {
}
.selectPersonWrapper .inputBlock {
  position: fixed;
  top: 48px;
  left: 0;
  right: 0px;
}
.selectPersonWrapper .inputBar {
  font-size: 0px;
  border-bottom: #ddd solid 1px;
}
.selectPersonWrapper .inputBar .inputItem {
  display: inline-block;
  width: 50%;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.selectPersonWrapper .inputBar .inputItem .title {
  box-sizing: border-box;
  display: inline-block;
  width: 30%;
  text-align: center;
  font-size: 16px;
  border-right: 1px solid #ddd;
}
.selectPersonWrapper .inputBar .inputItem .input {
  box-sizing: border-box;
  display: inline-block;
  width: 70%;
  font-size: 16px;
  border-right: 1px solid #ddd;
}
.selectPersonWrapper .inputBar .inputItem .input input {
  box-sizing: border-box;
  padding-left: 0.5em;
  width: 100%;
}
.selectPersonWrapper .selectContent {
  padding: 100px 0 55px 15px;
}
.selectPersonWrapper .selectContent .selectItemForPerson {
  display: inline-block;
  padding: 4px;
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: #ddd;
  color: #444;
}
.selectPersonWrapper .selectContent .active {
  background-color: #42b983;
  color: #fff;
}
.contentWrapper .btnWrapper {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 48px;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #ddd;
  background-color: #fff;
}
.contentWrapper .btnWrapper .btn {
  margin-top: 9px;
  width: 70px;
  border-radius: 4px;
  color: #fff;
  background-color: #3385ff;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.contentWrapper .btnWrapper .disable {
  background-color: #a6a6a6;
}
</style>
