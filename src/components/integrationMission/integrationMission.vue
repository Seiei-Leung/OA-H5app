<template>
  <div class="integrationMission-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack">
        <i class="icon-chevron-left"></i>
        <span>返回</span>
      </a>
      <div>任务大厅</div>
    </div>
    <div class="contentWrapper" v-show="!isShowInputBlock">
      <div class="weui-form-preview" style="margin-bottom: 10px;">
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">日期</label>
            <em class="weui-form-preview__value" style="color: #999;">2019-05-23</em>
          </div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">任务事件</label>
            <span class="weui-form-preview__value">清洁大厅</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">奖扣分</label>
            <span class="weui-form-preview__value">1000</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">状态</label>
            <span class="weui-form-preview__value">未认领</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">发布人</label>
            <span class="weui-form-preview__value">王五</span>
          </div>
        </div>
        <div class="weui-form-preview__ft">
          <button
            type="submit"
            class="weui-form-preview__btn weui-form-preview__btn_primary"
            href="javascript:"
          >接受该任务</button>
        </div>
      </div>
    </div>
    <div class="addMission" v-show="!isShowInputBlock" @click="showInputBlock">
      <span class="icon-plus" style="margin-left: 1em;"></span> 新增任务
    </div>
    <!-- 输入任务页面 -->
    <div v-show="isShowInputBlock" class="contentWrapper">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label for="" class="weui-label">日期</label></div>
          <div class="weui-cell__bd" @click="showsTimePicker">
            {{inputTime}} <i class="icon-chevron-down"></i>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label for="" class="weui-label">发布分数</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="number" pattern="[0-9]*" value="weui input error" placeholder="请输入分数">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label for="" class="weui-label">地点</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入地点">
          </div>
        </div>
      </div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cells__title" style="font-size: 17px;color: #444;">任务详情</div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="weui-textarea" placeholder="请输入文本" rows="8"></textarea>
          </div>
        </div>
      </div>
      <div class="weui-btn-area">
        <a class="weui-btn weui-btn_primary" href="javascript:" id="showTooltips">确定</a>
      </div>
    </div>
    <awesome-picker
      ref="timePicker"
      :type="'date'"
      :textTitle="'选择日期'"
      @confirm="timePickerConfirm"
    ></awesome-picker>
  </div>
</template>

<script>
var now = new Date();
export default {
  data: function() {
    return {
      isShowInputBlock: false, // 是否显示发布任务页面
      inputTime: this.formatTime(now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() + "日"), // 时间

    }
  },
  methods: {
    // 显示时间 Picker
    showsTimePicker: function() {
      this.$refs.timePicker.show();
    },
    // 时间确认按钮
    timePickerConfirm: function(data) {
      this.inputTime = this.formatTime(data[0].value + data[1].value + data[2].value);
    },
    // 显示任务发布页面
    showInputBlock: function() {
      console.log(123)
      this.isShowInputBlock = true;
    },
    goBack: function() {
      if (this.isShowInputBlock) {
        this.isShowInputBlock = false;
        return;
      }
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.contentWrapper {
  margin-top: 58px;
}
.addMission {
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  color: #444;
  background-color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 3em;
}
</style>