<template>
  <div class="integrationMission-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack">
        <i class="icon-chevron-left"></i>
        <span>返回</span>
      </a>
      <div>任务大厅</div>
    </div>
    <div class="contentWrapper">
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
    <div class="addMission">
      <span class="icon-plus" style="margin-left: 1em;"></span> 新增任务
    </div>
  </div>
</template>

<script>
export default {};
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
  background-color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 3em;
}
</style>