<template>
	<div class="schedule-component">
      <div class="top_title">
          <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i>返回</a>
          <div>考勤查询</div>
      </div>
      <div id = 'calendar'>
      </div>
      <div class="event">
        <div class="event_title">
          我的考勤
        </div>
        <div>
          9月17日 星期二
        </div>
        <div>
          时段一|上班：8:30
        </div>
      </div>
	</div>
</template>

<script>
import {SimpleCalendar} from '../../common/simple-calendar';

var myCalendar;
export default {
	created: function() {
		this.$nextTick(() => {
			myCalendar = new SimpleCalendar('#calendar');
		})
	}
}
</script>

<style>
.schedule-component {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
    overflow: scroll;
	background-color: #f5f5f5;
	z-index: 1;
}
</style>