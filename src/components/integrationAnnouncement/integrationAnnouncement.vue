<template>
  <div class="integrationAnnouncement-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack">
        <i class="icon-chevron-left"></i>
        <span>返回</span>
      </a>
      <div>公告</div>
    </div>
    <div class="contentWrapper">
      <div class="weui-panel weui-panel_access">
            <div class="weui-panel__hd">2019-05-24</div>
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_text">
                    <h4 class="weui-media-box__title">标题一</h4>
                    <p class="weui-media-box__desc">很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长。</p>
                </div>
            </div>
            <div class="weui-panel__ft">
                <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
                    <div class="weui-cell__bd">查看更多</div>
                    <span class="weui-cell__ft"></span>
                </a>    
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
    };
  },
  methods: {}
};
</script>

<style scoped>
.contentWrapper {
  margin-top: 58px;
}
</style>