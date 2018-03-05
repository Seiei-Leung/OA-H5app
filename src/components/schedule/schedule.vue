<template>
	<div class="schedule-component">
      <div class="top_title">
          <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i>返回</a>
          <div>我的日程</div>
      </div>
      <div id = 'calendar'>
      </div>
      <div class="event">
        <div class="event_title">
          我的日程
        </div>
        <div class="added_event" style="height: 20%">
        </div>
        <div class="add_event">
          <a href="javascript:void(0);"><i class="icon-plus"></i></a>
        </div>
      </div>
	</div>
</template>

<script>
import {SimpleCalendar} from '../../common/simple-calendar';

export default {
	created: function() {
		this.$nextTick(() => {
			var myCalendar = new SimpleCalendar('#calendar');
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