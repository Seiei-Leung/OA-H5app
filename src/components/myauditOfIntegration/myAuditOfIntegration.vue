<template>
  <div class="myAuditOfIntegration-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack">
        <i class="icon-chevron-left"></i>
        <span>返回</span>
      </a>
      <div>我的审批</div>
    </div>
    <div class="contentWrapper workdetail-page" ref="findHook">
      <div class="table-item" v-for="(content, index1) in auditList" v-bind:ref="'table-item' + index1" v-bind:key="index1">
        <div class="main-table">
            <!-- 主表 -->
            <div style="position:relative;padding-bottom: 1em;border-bottom: 1px dotted #ddd;">
                <div class="titlehook">
                    <span>单据号：</span>
                    <span style="color: #999;">{{content.orderNo}}</span>
                </div>
                <div class="titlehook">
                    <span>建档人：</span>
                    <span style="color: #999;">{{content.tableMaker}}</span>
                </div>
                <div class="titlehook">
                    <span>日期：</span>
                    <span style="color: #999;">{{content.orderDate.split("T")[0]}}</span>
                </div>
                <div class="titlehook">
                    <span>具体明细如下：</span>
                </div>
                <div class="checkbox" @click="select" v-bind:data-serialno="content.serialno"></div>
            </div>
            <div v-for="(item, index2) in content.detailList" class="detailWrapper" v-bind:key="index2">
                <div class="detailItem">
                    <div class="titlehook">
                        <span class="itemTitle">
                          部门:
                        </span>
                        <span style="color: #999;">
                          {{item.departname}}
                        </span>
                    </div>
                    <div class="titlehook">
                        <span class="itemTitle">
                          车间:
                        </span>
                        <span style="color: #999;">
                          {{item.workshop}}
                        </span>
                    </div>
                    <div class="titlehook">
                        <span class="itemTitle">
                          生产线:
                        </span>
                        <span style="color: #999;">
                          {{item.workline}}
                        </span>
                    </div>
                    <div class="titlehook">
                        <span class="itemTitle">
                          姓名:
                        </span>
                        <span style="color: #999;">
                          {{item.userName}}
                        </span>
                    </div>
                    <div class="titlehook">
                        <span class="itemTitle">
                          事件:
                        </span>
                        <span style="color: #999;">
                          {{item.eventString}}
                        </span>
                    </div>
                    <div class="titlehook" v-if="item.addIntegral != null && Number(item.addIntegral) != 0">
                        <span class="itemTitle">
                          奖分:
                        </span>
                        <span style="color: #999;">
                          {{item.addIntegral}}
                        </span>
                    </div>
                    <div class="titlehook" v-else>
                        <span class="itemTitle">
                          扣分:
                        </span>
                        <span style="color: #999;">
                          -{{item.deductIntegral}}
                        </span>
                    </div>
                </div>
            </div>
            <!-- 副表 -->
        </div>
        <div class="passbtn-wrapper">
          <div class="passbtn" @click="approval(content.serialno)">
            <span>审批</span>
          </div>
          <div class="passbtn" style="background-color: #FA5151;" @click="reject(content.serialno)">
            <span>退回</span>
          </div>
        </div>
    	</div>
    </div>
    <div class="footerBar">
        <div class="btn" @click="selectAll">全选</div>
        <div class="btn" @click="selectNone">全不选</div>
        <div class="btn" @click="batchApproval">批量审批</div>
    </div>
    <!-- loading 图 -->
    <v-loading v-show="isLoading"></v-loading>
    <!-- toast -->
    <v-toast v-bind:text="toast" v-show="isToast"></v-toast>
  </div>
</template>

<script>
import loading from '../loading/loading';
import toast from '../toast/toast';
import Vue from 'vue';

export default {
  data: function() {
    return {
      applicant: {}, // 用户信息
      auditList: [], // 审核单信息
      isLoading: false, // 是否显示缓冲图
      toast: '',
      isToast: false,
    }
  },
  methods: {
    // 单选
    select: function() {
      if (event.target.className == "checkbox") {
          event.target.className += " active";
      } else {
          event.target.className = "checkbox";
      }
    },
    // 单个审批
    approval: function(serialno) {
      var that = this;
      this.isLoading = true;
      var data = {};
      data.serialnoList = [];
      data.serialnoList.push(serialno);
      data.useId = that.applicant.EmployeeNo;
      var form = "=" + JSON.stringify(data);
      Vue.http.options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      };
       this.$http.post(this.seieiURL + "/estapi/api/Integral/approvalIntegral", form).then(
        resp => {
          that.isLoading = false;
          that.toast = '审批成功';
          that.isToast = true;
          setTimeout(() => {
            that.isToast = false;
          }, 2000);
          that.reloadData();
        }
      );
    },
    // 全选
    selectAll: function() {
      var elementList = this.$refs.findHook.getElementsByClassName("checkbox");
      for (var i=0; i<elementList.length; i++){
          if (elementList[i].className == "checkbox"){
              elementList[i].className += " active";
          }
      }
    },
    // 全不选
    selectNone: function() {
      var elementList = this.$refs.findHook.getElementsByClassName("checkbox");
      for (var i=0; i<elementList.length; i++){
          elementList[i].className = "checkbox";
      }
    },
    // 批量审批
    batchApproval: function() {
      var that = this;
      var elementList = this.$refs.findHook.getElementsByClassName("active");
      if (elementList.length == 0) {
          this.toast = '请选择要审批的项目';
          this.isToast = true;
          setTimeout(() => {
              this.isToast = false;
          }, 2000);
      } else {
        this.isLoading = true;
        var data = {};
        data.serialnoList = [];
        data.useId = that.applicant.EmployeeNo;
        for (var i=0; i<elementList.length; i++) {
          data.serialnoList.push(elementList[i].getAttribute("data-serialno"));
        }
        var form = "=" + JSON.stringify(data);
        Vue.http.options.headers = {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };
         this.$http.post(this.seieiURL + "/estapi/api/Integral/approvalIntegral", form).then(
          resp => {
            that.isLoading = false;
            that.toast = '审批成功';
            that.isToast = true;
            setTimeout(() => {
              that.isToast = false;
            }, 2000);
            that.reloadData();
          }
        );
      }
    },
    reloadData: function() {
      var that = this;
      this.$http.get(this.seieiURL + "/estapi/api/Integral/getAllAuditOfIntegration?userId=" + that.applicant.EmployeeNo).then(
        resp => {
          that.auditList = resp.body;
        },
        response => {
          console.log("发送失败" + response.status + "," + response.statusText);
        }
      );
    },
    reject: function(serialno) {
      var that = this;
      this.isLoading = true;
      this.$http.get(this.seieiURL + "/estapi/api/Integral/rejectIntegral?serialno=" + serialno).then(
        resp => {
          that.isLoading = false;
          that.toast = '退回成功';
          that.isToast = true;
          setTimeout(() => {
            that.isToast = false;
          }, 2000);
          that.reloadData();
        },
        response => {
          console.log("发送失败" + response.status + "," + response.statusText);
        }
      );
    }
  },
  created: function() {
    var that = this;
    this.applicant = JSON.parse(this.$store.state.userMsg);
    this.auditList = JSON.parse(localStorage.auditList);
/*     this.$http.get(this.seieiURL + "/estapi/api/Integral/getAllAuditOfIntegration?userId=" + that.applicant.EmployeeNo).then(
      resp => {
        that.auditList = resp.body;
      },
      response => {
        console.log("发送失败" + response.status + "," + response.statusText);
      }
    ); */
  },
  components: {
    'v-toast': toast,
    'v-loading': loading
  }
};
</script>

<style scoped>
.contentWrapper {
  margin: 60px 0;
}
.checkbox {
    position: absolute;
    left: -28px;
    top: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    background-image: url("./img/badge-circle.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.checkbox.active {
    background-image: url("./img/select.png");
}
.titlehook span:first-child {
    display: inline-block;
    min-width: 7em;
}
.workdetail-page .table-item {
	box-sizing: border-box;
    width: 9.5rem;
    margin: 0.3rem auto;
    padding: 0.5em;
    background-color: #fff;
    border-radius: 10px;
}
.workdetail-page .table-item .main-table {
    position: relative;
    padding-left: 30px;
    padding-bottom: 0.5em;
    color: #169fe6;
    line-height: 1.4
}
.workdetail-page .subtable-title {
    font-size: 1.5em;
    margin: 0.2em 0 0.2em 0;
}
.workdetail-page .subtable {
    padding: 0.3em 0;
    border-bottom: 1px dashed #e5e5e5;
    border-top: 1px dashed #e5e5e5;
}
.workdetail-page .subtable {
    padding: 0.3em 0;
    border-top: 1px dashed #e5e5e5;
}
.passbtn-wrapper {
    display: flex;
    padding-top: 0.5em;
    border-top: 1px dashed #e5e5e5;
}
.workdetail-page .passbtn {
    margin-left: 30px;
    width: 1.5rem;
    text-align: center;
    line-height: 1;
    font-size: 14px;
    padding: 0.5em;
    background-color: #169fe6;
    border-radius: 10px;
    color: #fff;
}
.footerBar {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px 0;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    background-color: #e5e5e5;
    border-top: 1px solid #ddd
}
.footerBar .btn {
    box-sizing: border-box;
    min-width: 5em;
    padding: 0.5em;
    line-height: 1;
    text-align: center;
    font-size: 14px;
    background-color: #169fe6;
    border-radius: 10px;
    color: #fff;
}
.border {
    margin-top: 1em;
    position:absolute;
    left: 0;
    width:100%;
    border-top:2px #ddd dotted
}
.detailItem {
    padding:1em 0;
    border-bottom:1px dotted #ddd;
}
.detailItem {
    padding:1em 0;
    border-bottom:1px dotted #ddd;
}
.detailWrapper:last-child .detailItem{
    border-bottom: none
}

</style>