<template>
  <div class="myAuditOfIntegration-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack">
        <i class="icon-chevron-left"></i>
        <span>返回</span>
      </a>
      <div>我的审核</div>
    </div>
    <div class="contentWrapper">
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
        <div class="weui-form-preview" style="margin-bottom: 10px;">
          <div class="weui-form-preview__hd">
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">日期</label>
              <em class="weui-form-preview__value" style="color: #999;">2019-05-23</em>
            </div>
          </div>
          <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">事件</label>
              <span class="weui-form-preview__value">很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">奖扣分</label>
              <span class="weui-form-preview__value">1000</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">状态</label>
              <span class="weui-form-preview__value">已通过</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">员工</label>
              <span class="weui-form-preview__value">王五</span>
            </div>
          </div>
          <div class="weui-form-preview__ft">
            <a class="weui-form-preview__btn weui-form-preview__btn_default" href="javascript:">不通过</a>
            <button
              type="submit"
              class="weui-form-preview__btn weui-form-preview__btn_primary"
              href="javascript:"
            >通过</button>
          </div>
        </div>
        <div class="weui-form-preview" style="margin-bottom: 10px;">
          <div class="weui-form-preview__hd">
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">日期</label>
              <em class="weui-form-preview__value" style="color: #999;">2019-05-23</em>
            </div>
          </div>
          <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">事件</label>
              <span class="weui-form-preview__value">很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">奖扣分</label>
              <span class="weui-form-preview__value">1000</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">状态</label>
              <span class="weui-form-preview__value">已通过</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">员工</label>
              <span class="weui-form-preview__value">王五</span>
            </div>
          </div>
          <div class="weui-form-preview__ft">
            <a class="weui-form-preview__btn weui-form-preview__btn_default" href="javascript:">不通过</a>
            <button
              type="submit"
              class="weui-form-preview__btn weui-form-preview__btn_primary"
              href="javascript:"
            >通过</button>
          </div>
        </div>
        <div class="weui-form-preview" style="margin-bottom: 10px;">
          <div class="weui-form-preview__hd">
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">日期</label>
              <em class="weui-form-preview__value" style="color: #999;">2019-05-23</em>
            </div>
          </div>
          <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">事件</label>
              <span class="weui-form-preview__value">很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">奖扣分</label>
              <span class="weui-form-preview__value">1000</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">状态</label>
              <span class="weui-form-preview__value">已通过</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">员工</label>
              <span class="weui-form-preview__value">王五</span>
            </div>
          </div>
          <div class="weui-form-preview__ft">
            <a class="weui-form-preview__btn weui-form-preview__btn_default" href="javascript:">不通过</a>
            <button
              type="submit"
              class="weui-form-preview__btn weui-form-preview__btn_primary"
              href="javascript:"
            >通过</button>
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
export default {
  data: function() {
    return {
      timePicker: {
        title: "选择日期"
      },
      statusPicker: {
        title: "选择状态",
        data: [["全部状态" , "通过", "未通过"]]
      },
      stimeTxt: now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate(),
      etimeTxt: now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate(),
      statusTxt: "全部状态"
    }
  },
  methods: {
    showsTimePicker: function() {
      this.$refs.stimePicker.show();
    },
    showeTimePicker: function() {
      this.$refs.etimePicker.show();
    },
    etimePickerConfirm: function(data) {
      console.log(data);
      this.etimeTxt = data[0].value.split("年")[0] + "-" + data[1].value.split("月")[0] + "-" + data[2].value.split("日")[0];
    },
    stimePickerConfirm: function(data) {
      console.log(data);
      this.stimeTxt = data[0].value.split("年")[0] + "-" + data[1].value.split("月")[0] + "-" + data[2].value.split("日")[0];
    },
    showStatusPicker: function() {
      this.$refs.statusPicker.show();
    },
    statusPickerConfirm: function(data) {
      console.log(data);
      this.statusTxt = data[0].value;
    },

  }

};
</script>

<style scoped>
.contentWrapper {
  margin-top: 48px;
}
.topBar {
  position: fixed;
  top: 48px;
  display: flex;
  flex-wrap: wrap;
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
}
.contentBlock {
  margin-top: 140px;
}
</style>