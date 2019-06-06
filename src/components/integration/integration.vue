<template>
  <div class="integration-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack">
        <i class="icon-chevron-left"></i>
        <span>返回</span>
      </a>
      <div>快乐有奖分</div>
    </div>
    <!-- 待办事项九宫格 -->
    <div class="weui-grids" style="margin-top: 50px;background-color: #fff;color:#444">
      <a href="javascript:void(0);" class="weui-grid" @click="goMyIntegration">
        <div class="weui-grid__icon">
          <img src="http://www.etscn.com.cn:38080/oa/KQ/img/积分 (1).png">
        </div>
        <p class="weui-grid__label">我的奖分</p>
      </a>
      <a href="javascript:void(0);" class="weui-grid" @click="goMyMedal">
        <div class="weui-grid__icon">
          <img src="http://www.etscn.com.cn:38080/oa/KQ/img/champion.png" style="width:85%">
        </div>
        <p class="weui-grid__label">我的奖牌</p>
      </a>
      <a href="javascript:void(0);" class="weui-grid" @click="goMyCoupon">
        <div class="weui-grid__icon">
          <img src="http://www.etscn.com.cn:38080/oa/KQ/img/奖金.png">
        </div>
        <p class="weui-grid__label">我的奖票</p>
      </a>
      <a href="javascript:void(0);" class="weui-grid" @click="goIntegrationRanking">
        <div class="weui-grid__icon">
          <img src="http://www.etscn.com.cn:38080/oa/KQ/img/排名.png">
        </div>
        <p class="weui-grid__label">奖分排名</p>
      </a>
      <a href="javascript:void(0);" class="weui-grid" @click="goIntegrationDetail">
        <div class="weui-grid__icon">
          <img src="http://www.etscn.com.cn:38080/oa/KQ/img/详情页-分享.png">
        </div>
        <p class="weui-grid__label">奖分详情</p>
      </a>
      <a href="javascript:void(0);" class="weui-grid" @click="goAddOrMinusIntegration">
        <div class="weui-grid__icon">
          <img v-if="!isFRank" src="http://www.etscn.com.cn:38080/oa/KQ/img/增加减少仓位.png">
          <img v-if="isFRank" src="http://www.etscn.com.cn:38080/oa/KQ/img/iNeedIntegral.png">
        </div>
        <p class="weui-grid__label">{{isFRank ? "我要奖分" : "奖分申请"}}</p>
      </a>
      <a href="javascript:void(0);" class="weui-grid" @click="goMyAuditOfIntegration" v-if="!isFRank">
        <div class="weui-grid__icon">
          <img src="http://www.etscn.com.cn:38080/oa/KQ/img/2.png">
    	    <span class="weui-badge">{{auditList.length}}</span>
        </div>
        <p class="weui-grid__label">我的审批</p>
      </a>
      <a href="javascript:void(0);" class="weui-grid" @click="goIntegrationAnnouncement">
        <div class="weui-grid__icon">
          <img src="http://www.etscn.com.cn:38080/oa/KQ/img/喇叭 (1).png">
        </div>
        <p class="weui-grid__label">公告</p>
      </a>
      <a href="javascript:void(0);" class="weui-grid" @click="goIntegrationMission">
        <div class="weui-grid__icon">
          <img src="http://www.etscn.com.cn:38080/oa/KQ/img/案例大厅.png">
        </div>
        <p class="weui-grid__label">任务大厅</p>
      </a>
      <a href="javascript:void(0);" class="weui-grid" @click="goIntegrationAppraise">
        <div class="weui-grid__icon">
          <img src="http://www.etscn.com.cn:38080/oa/KQ/img/0.png">
        </div>
        <p class="weui-grid__label">服务评价</p>
      </a>
      <a href="javascript:void(0);" class="weui-grid" @click="goIntegrationSuggest">
        <div class="weui-grid__icon">
          <img src="http://www.etscn.com.cn:38080/oa/KQ/img/3.png">
        </div>
        <p class="weui-grid__label">改善建议</p>
      </a>
      <a href="javascript:void(0);" class="weui-grid" @click="goAwardMsg">
        <div class="weui-grid__icon">
          <img src="http://www.etscn.com.cn:38080/oa/KQ/img/1.png">
        </div>
        <p class="weui-grid__label">奖项说明</p>
      </a>
      <a href="javascript:void(0);" class="weui-grid" @click="goIntegrationMsg">
        <div class="weui-grid__icon">
          <img src="http://www.etscn.com.cn:38080/oa/KQ/img/5.png">
        </div>
        <p class="weui-grid__label">奖分标准</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isFRank: true, // F级别员工
      auditList: [], // 我的审核列表
    };
  },
  methods: {
    goMyMedal: function() {
      this.$router.push({ name: "myMedal" });
    },
    goIntegrationMsg: function() {
      this.$router.push({ name: "integrationMsg" });
    },
    goAwardMsg: function() {
      this.$router.push({ name: "awardMsg" });
    },
    goIntegrationSuggest: function() {
      this.$router.push({ name: "integrationSuggest" });
    },
    goIntegrationAppraise: function() {
      this.$router.push({ name: "integrationAppraise" });
    },
    goIntegrationMission: function() {
      this.$router.push({ name: "integrationMission" });
    },
    goIntegrationAnnouncement: function() {
      this.$router.push({ name: "integrationAnnouncement" });
    },
    goIntegrationDetail: function() {
      this.$router.push({ name: "integrationDetail" });
    },
    goMyAuditOfIntegration: function() {
      this.$router.push({ name: "myAuditOfIntegration" });
    },
    goIntegrationRanking: function() {
      this.$router.push({
        name: "myIntegration",
        params: { kind: "rankingCenter" }
      });
    },
    goMyIntegration: function() {
      this.$router.push({
        name: "myIntegration",
        params: { kind: "integrationCenter" }
      });
    },
    goAddOrMinusIntegration: function() {
      this.$router.push({ name: "addOrMinusIntegration" });
    },
    goMyCoupon: function() {
      this.$router.push({ name: "myCoupon" });
    }
  },
  created: function() {
    var that = this;
    console.log(this.$store.state.userMsg);
    var usermsg = JSON.parse(this.$store.state.userMsg);
    this.$http.get(this.seieiURL + "/estapi/api/Integral/getUserMsgForIntegration?code=" + usermsg.EmployeeNo).then(
      resp => {
        if (resp.body.status > 0) {
            alert(resp.body.msg);
        }
        that.$store.state.userMsgForIntegration = resp.body;
        that.isFRank = that.$store.state.userMsgForIntegration.rank == "F级";
        console.log(that.$store.state.userMsgForIntegration);
        if (!that.isFRank) {
          that.$http.get(that.seieiURL + "/estapi/api/Integral/getAllAuditOfIntegration?userId=" + usermsg.EmployeeNo).then(
            resp => {
              that.auditList = resp.body;
              localStorage.auditList = JSON.stringify(resp.body);
            },
            response => {
              console.log("发送失败" + response.status + "," + response.statusText);
            }
          );
        }
      }
    );
  }
};
</script>

<style scoped>
.iconImg {
  display: block;
  width: 30px;
  margin-right: 5px;
}
.weui-grid__icon {
	position: relative;
}
.weui-badge {
    position: absolute;
    left: 20px;
    top: -10px;
}
</style>