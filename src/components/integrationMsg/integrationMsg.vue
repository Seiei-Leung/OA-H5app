<template>
  <div class="integrationMsg-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack">
        <i class="icon-chevron-left"></i>
        <span>返回</span>
      </a>
      <div>奖分标准</div>
    </div>
    <div class="contentWrapper">
      <div @click="showCategoryPicker" class="categoryPicker">
        {{selectCategoryTxt}}
        <i class="icon-chevron-down"></i>
      </div>
      <div class="contentBlock">
        <div class="weui-form-preview" style="margin-bottom: 10px;" v-for="(item, index) in msgList" v-bind:key="index">
          <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item" v-if="item.position">
              <label class="weui-form-preview__label">职位</label>
              <span class="weui-form-preview__value" style="text-align: left;">{{item.position}}</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">事件</label>
              <span class="weui-form-preview__value" style="text-align: left;">{{item.eventStr}}</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">频率</label>
              <span class="weui-form-preview__value" style="text-align: left;">{{item.frequency}}</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">奖扣分</label>
              <span class="weui-form-preview__value" v-bind:class="{ 'greenFont': item.integral != null && item.integral != 0, 'redFont': item.deductintegral != null && item.deductintegral != 0 }">
                {{item.integral != null && item.integral != 0 ? item.integral : "-" + item.deductintegral}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <awesome-picker
      ref="categoryPicker"
      :data="categoryList"
      :textTitle="'选择类型'"
      @confirm="categoryPickerConfirm"
    ></awesome-picker>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      categoryList: [], // 奖分标准类型
      selectCategoryTxt: "", // picker显示的文字
      msgList: [], // 奖分标准信息列表
    }
  },
  methods: {
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
            that.msgList = resp.body;
          }
        );
      } else {
        this.$http.get(this.seieiURL + "/estapi/api/Integral/getStandardByDept").then(
          resp => {
            that.msgList = resp.body;
          }
        );
      }
    }
  },
  created: function() {
    var that = this;
    this.categoryList = [];
    this.$http.get(this.seieiURL + "/estapi/api/Integral/getCategoryForIntegral").then(
        resp => {
          that.categoryList.push(resp.body.categoryList);
          that.selectCategoryTxt = resp.body.categoryList[0];
          if (resp.body.categoryList[0] != "部门标准") {
            that.$http.get(that.seieiURL + "/estapi/api/Integral/getStandardByCategory?category=" + resp.body.categoryList[0]).then(
              resp => {
                that.msgList = resp.body;
              }
            );
          } else {
            that.$http.get(that.seieiURL + "/estapi/api/Integral/getStandardByPosition?position=" + resp.body.categoryList[0]).then(
              resp => {
                that.msgList = resp.body;
              }
            );
          }
        }
      );
  }
};
</script>

<style scoped>
.contentWrapper {
  margin-top: 100px;
}
.categoryPicker {
  position: fixed;
  top: 48px;
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
.weui-form-preview__bd,
.weui-form-preview__label {
  color: #444;
  font-size: 16px;
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