<template>
  <div class="integrationSuggest-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack">
        <i class="icon-chevron-left"></i>
        <span>返回</span>
      </a>
      <div>改善建议</div>
    </div>
    <div class="contentWrapper" v-show="!isARank">
      <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea" placeholder="请输入改善建议" rows="10"></textarea>
                </div>
            </div>
        </div>
        <div>
          <a href="javascript:;" class="weui-btn weui-btn_primary">提 交 建 议</a>
        </div>
    </div>
    <div class="contentWrapper" v-show="isARank">
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isARank: false,
    }
  }
};
</script>

<style scoped>
.contentWrapper {
  margin-top: 48px;
}
.weui-btn {
  width: 90%;
  margin: auto;
  margin-top: 30px;
}
</style>