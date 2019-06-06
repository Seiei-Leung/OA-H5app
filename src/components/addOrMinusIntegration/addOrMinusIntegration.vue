<template>
  <div class="addOrMinusIntegration-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack">
        <i class="icon-chevron-left"></i>
        <span>返回</span>
      </a>
      <div>{{isFRank ? "我要奖分" : "奖分申请"}}</div>
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
        <div class="input" style="width: 30%;" v-if="isFRank">{{applicant.Name}}</div>
        <div class="input" style="width: 30%;" v-if="!isFRank">已勾选了{{selectPersonListForSumbit.length}}人</div>
        <div class="btn" @click="showSelectPerson" v-if="!isFRank">新增</div>
        <div
          class="btn"
          v-show="selectPersonListForSumbit.length>0 && !isFRank"
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
        <div class="btn" @click="submitData">提交</div>
      </div>
    </div>
    <div class="contentWrapper" v-show="isShowSelectEvent">
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
      <div @click="showCategoryPicker" class="categoryPicker">
        {{selectCategoryTxt}}
        <i class="icon-chevron-down"></i>
      </div>
      <div class="selectEventTitle" style="top: 133px;background-color: #e4e4e4;">点击选择奖扣事件</div>
      <ul class="selectWrapper">
        <li
          v-for="(item, index) in eventTxtListForShow"
          :key="index"
          class="selectItem"
          @click="selectEvent(index)"
        >
          <div>{{item.eventStr}}</div>
          <div>奖分：
            <span v-bind:class="{ 'greenFont': item.integral != null && item.integral != 0, 'redFont': item.deductintegral != null && item.deductintegral != 0 }">
              {{item.integral != null && item.integral != 0 ? item.integral : "-" + item.deductintegral}}
            </span>
          </div>
        </li>
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
          <div class="inputItem" style="width: 30%;">
            <div class="title" style="width: 50%;">部门</div>
            <div class="input" style="width: 50%;height: 40px;">
              <input placeholder="部门" v-model="inputDep" v-on:input="watchInput" style="height: 40px;line-height: 40px;">
            </div>
          </div>
          <div class="inputItem" style="width: 30%;">
            <div class="title" style="width: 50%;">车间</div>
            <div class="input" style="width: 50%;height: 40px;vertical-align: top;">
              <input placeholder="车间" v-model="inputWorkShop" v-on:input="watchInput" style="height: 40px;line-height: 40px;">
            </div>
          </div>
          <div class="inputItem" style="width: 40%;">
            <div class="title" style="width: 50%;">生产线</div>
            <div class="input" style="width: 50%;height: 40px;vertical-align: top;">
              <input placeholder="生产线" v-model="inputWorkLine" v-on:input="watchInput" style="height: 40px;line-height: 40px;">
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
    <awesome-picker
      ref="categoryPicker"
      :data="categoryList"
      :textTitle="'选择类型'"
      @confirm="categoryPickerConfirm"
    ></awesome-picker>
    <!-- toast -->
    <v-toast v-bind:text="toast" v-show="isToast"></v-toast>
    <!-- loading 图 -->
    <v-loading v-show="isLoading"></v-loading>
  </div>
</template>

<script>
import Vue from 'vue';
import toast from '../toast/toast';
import loading from '../loading/loading';

var T;
export default {
  data: function() {
    return {
      isShowSelectEvent: false, // 是否显示选择事件窗口
      selectEventTxt: "", // 提交的事件选项
      selectEventIntegration: "", // 已选事件的奖扣分
      eventTxtListForShow: [], // 后台获取的所有可选的事件
      eventTxtList: [], // 后台获取的所有可选的事件
      selectEventIndex: 0, // 已选吼后台事件的索引
      searchSelectTxt: "", // 筛选后台事件列表的模糊查找文本
      isShowSelectPerson: false, // 是否显示选择员工窗口
      inputID: "", // 筛选员工的工号
      inputName: "", // 筛选员工的姓名
      inputDep: "", // 筛选员工的部门
      inputWorkShop: "", // 筛选员工的车间
      inputWorkLine: "", // 筛选员工的生产线
      selectPersonList: [], // 后台可选员工的列表
      selectPersonBtnTxt: "全选", // 用于全选按钮或全不选按钮
      selectPersonListForActive: [], // 用于显示已选员工的视图显示
      selectPersonListForSumbit: [], // 已选员工的列表
      isShowSelectedPerson: false, // 是否显示已选员工编辑窗口
      applicant: "", // 申请人
      serialno: "", // 保存主表主键
      canSumbit: false, // 是否可以点击提交按钮
      isFRank: true, // 是否为 F级别员工
      fUserMsgObj: {}, // 用于 F级别员工提交数据
      toast: '',
      isToast: false,
      isLoading: false, // 是否显示缓冲图
      categoryList: [], // 奖分标准类型
      selectCategoryTxt: "", // 当前奖分标准类型
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
      this.selectEventTxt = this.eventTxtListForShow[index].eventStr;
      this.selectEventIntegration =
        this.eventTxtListForShow[this.selectEventIndex].integral == null && this.eventTxtListForShow[this.selectEventIndex].integral != 0 
          ? "-" + this.eventTxtListForShow[this.selectEventIndex].deductintegral
          : this.eventTxtListForShow[this.selectEventIndex].integral;
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
          that.inputWorkShop +
          "&workline=" +
          that.inputWorkLine;
        that.isLoading = true;
        that.$http.get(url).then(
          resp => {
            that.selectPersonList = resp.body;
            that.isLoading = false;
          },
          response => {
            that.isLoading = false;
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
        if (that.searchSelectTxt.trim() == "") {
          that.eventTxtListForShow = that.eventTxtList;
          return;
        }
        else {
          var eventTxtListForShow = [];
          var re = new RegExp(that.searchSelectTxt);
          for (var i=0; i<that.eventTxtList.length; i++) {
            if (re.test(that.eventTxtList[i].eventStr)) {
              eventTxtListForShow.push(that.eventTxtList[i]);
            }
          }
          that.eventTxtListForShow = eventTxtListForShow;
        }
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
    // 提交按钮
    submitData: function() {
      var that = this;
      var obj = {};
      obj.serialno = this.serialno;
      obj.eventString = this.selectEventTxt;
      obj.code = this.applicant.Code;
      if (this.eventTxtListForShow[this.selectEventIndex] && this.eventTxtListForShow[this.selectEventIndex].eventStr == this.selectEventTxt) {
        obj.frequency = this.eventTxtListForShow[this.selectEventIndex].frequency ? this.eventTxtListForShow[this.selectEventIndex].frequency : "";
      } else {
        obj.frequency = "";
      }
      
      var reg = /^\-?\d*$/; // 分数正则表达式
      if ((!this.isFRank && this.selectPersonListForSumbit.length == 0) || this.selectEventTxt == "" || !reg.test(this.selectEventIntegration)) {
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
      obj.employeeNo = this.applicant.EmployeeNo;
      var personObjList = [];
      if (!this.isFRank) {
        for (var i=0; i<this.selectPersonListForSumbit.length; i++) {
          var personObj = {};
          personObj.empno = this.selectPersonListForSumbit[i].code;
          personObj.empname = this.selectPersonListForSumbit[i].name;
          personObj.position = this.selectPersonListForSumbit[i].position;
          personObj.dept = this.selectPersonListForSumbit[i].departname;
          personObj.workshop = this.selectPersonListForSumbit[i].workshop ? this.selectPersonListForSumbit[i].workshop : "";
          personObj.workgroup = this.selectPersonListForSumbit[i].zhubie ? this.selectPersonListForSumbit[i].zhubie : "";
          personObjList.push(personObj);
        }
      } else {
          var personObj = {};
          personObj.empno = this.fUserMsgObj.code;
          personObj.empname = this.fUserMsgObj.name;
          personObj.dept = this.fUserMsgObj.departname;
          personObj.workshop = this.fUserMsgObj.workshop ? this.fUserMsgObj.workshop : "";
          personObj.workgroup = this.fUserMsgObj.zhubie ? this.fUserMsgObj.zhubie : "";
          personObj.position = this.fUserMsgObj.position;
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
          that.toast = '提交成功';
          that.isToast = true;
          setTimeout(() => {
            that.isToast = false;
          }, 2000);
        },
        response => {
          console.log("发送失败" + response.status + "," + response.statusText);
        }
      );
    },
    showCategoryPicker: function() {
      this.$refs.categoryPicker.show();
    },
    categoryPickerConfirm: function(data) {
      console.log(data[0].value);
      this.selectCategoryTxt = data[0].value;
      var that = this;
      if (data[0].value != "部门标准") {
        this.$http.get(this.seieiURL + "/estapi/api/Integral/getStandardByCategory?category=" + data[0].value).then(
          resp => {
            that.eventTxtListForShow = resp.body;
            that.eventTxtList = resp.body;
          }
        );
      } else {
        this.$http.get(this.seieiURL + "/estapi/api/Integral/getStandardByDept").then(
          resp => {
            that.eventTxtListForShow = resp.body;
            that.eventTxtList = resp.body;
          }
        );
      }
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
    var that = this;
    this.applicant = JSON.parse(this.$store.state.userMsg);
    this.isFRank = this.$store.state.userMsgForIntegration.rank == "F级";
    console.log(this.applicant);
    that.$http.get(that.seieiURL + "/estapi/api/Integral/getCategoryForIntegral").then(
      resp => {
        that.categoryList.push(resp.body.categoryList);
        that.selectCategoryTxt = resp.body.categoryList[0];
        if (resp.body.categoryList[0] != "部门标准") {
          that.$http.get(that.seieiURL + "/estapi/api/Integral/getStandardByCategory?category=" + that.selectCategoryTxt).then(
            resp => {
              that.eventTxtListForShow = resp.body;
              that.eventTxtList = resp.body;
              if (that.isFRank) {
                that.$http.get(that.seieiURL + "/estapi/api/Integral/getStaff?id=" + that.applicant.EmployeeNo + "&name=&dep=&workshop=&workline").then(
                  resp => {
                    that.fUserMsgObj = resp.body[0];
                  },
                  response => {
                    console.log("发送失败" + response.status + "," + response.statusText);
                  }
                );
              }
            }
          );
        } else {
          that.$http.get(that.seieiURL + "/estapi/api/Integral/getStandardByPosition?position=" + that.selectCategoryTxt).then(
            resp => {
              that.eventTxtListForShow = resp.body;
              that.eventTxtList = resp.body;
              if (that.isFRank) {
                that.$http.get(that.seieiURL + "/estapi/api/Integral/getStaff?id=" + that.applicant.EmployeeNo + "&name=&dep=&workshop=").then(
                  resp => {
                    that.fUserMsgObj = resp.body[0];
                  },
                  response => {
                    console.log("发送失败" + response.status + "," + response.statusText);
                  }
                );
              }
            }
          );
        }
      }
    );
  },
  components: {
    'v-toast': toast,
    'v-loading': loading
  }
};
</script>

<style scoped>
.categoryPicker {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 2.5em;
  color: #444;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  text-align: center;
  z-index: 1;
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
  padding: 115px 0 55px 0;
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
  vertical-align: top;
  border-right: 1px solid #ddd;
}
.selectPersonWrapper .inputBar .inputItem .input input {
  box-sizing: border-box;
  padding-left: 0.5em;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
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
.greenFont {
  text-align: left;
  font-weight: bold;
  color: #42b983;
}
.redFont {
  text-align: left;
  font-weight: bold;
  color: red;
}
</style>
