<template>
	<div class="timeCard-component">
		<div class="top_title">
    	    <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i>返回</a>
    	    <div>考勤查询</div>
    	</div>
		<!-- 考勤 -->
		<div class="">
			<div class="headerWrapper">
				<div class="inputWrapper">
					<label for="personID">工号：</label><input type="text" id="personID">

					<div class="selectDate">
						<!-- start 开始日期 -->
						<div @click="selectSDate">
							开始日期：<span class="selectSDate">{{sdate}}</span>
						</div>
						<calendar
							v-model="sDateCalendarShow"
							:defaultDate="defaultsDate"
							@change="sDateChange">
						</calendar>
						<!-- end 开始日期 -->
	
						<!-- start 结束日期 -->
						<div @click="selectEDate">
							开始日期：<span class="selectEDate">{{edate}}</span>
						</div>
						<calendar
							v-model="eDateCalendarShow"
							:defaultDate="defaulteDate"
							@change="eDateChange">
						</calendar>
						<!-- end 结束日期 -->
					</div>
					<button class="submit">查询</button>
				</div>
			</div>
			<div class="timeCardTable">
				<table cellspacing="0" cellpadding="0">
					<tr>
						<td class="personMsg" colspan="7">
							<div>工号：91548</div>
							<div style="margin: 0 1em;">姓名：梁智承</div>
							<div>部门：电脑部</div>
						</td>
					</tr>
					<tr>
						<th>日期</th>
						<th>时间段一</th>
						<th>时间段二</th>
						<th>时间段三</th>
						<th>上班</th>
						<th>旷工</th>
						<th>请假</th>
					</tr>
					<tr>
						<td rowspan="2">
							2018-04-07
						</td>
						<td>
							8:30
						</td>
						<td>
							02:00
						</td>
						<td>
							
						</td>
						<td rowspan="2">
							7.00
						</td>
						<td rowspan="2">
							0.00
						</td>
						<td rowspan="2">
							
						</td>
					</tr>
					<tr>
						<td>
							12:00
						</td>
						<td>
							5:30
						</td>
						<td>
							
						</td>
					</tr>
					<tr>
						<td rowspan="2">
							2018-04-08
						</td>
						<td>
							8:30
						</td>
						<td>
							02:00
						</td>
						<td>
							
						</td>
						<td rowspan="2">
							7.00
						</td>
						<td rowspan="2">
							0.00
						</td>
						<td rowspan="2">
							
						</td>
					</tr>
					<tr>
						<td>
							12:00
						</td>
						<td>
							5:30
						</td>
						<td>
							
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import Calendar from 'vue-mobile-calendar';
import Vue from 'vue';

Vue.use(Calendar);

function dateFormat(date, fmt) {
	var o = {
		"M+": date.getMonth() + 1,
		"d+": date.getDate()
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

export default {
	data: function() {
		return {
			sdate: dateFormat(new Date(), "yyyy-MM-dd"),
			sDateCalendarShow: false,
			defaultsDate: new Date(),
			edate: dateFormat(new Date((new Date()).getTime() + 604800000), "yyyy-MM-dd"),
			eDateCalendarShow: false,
			defaulteDate: new Date(),
		}
	},
	methods: {
		sDateChange: function(date, formatDate) {
			this.sdate = formatDate;
		},
		selectSDate: function() {
			this.sDateCalendarShow = true;
		},
		eDateChange: function(date, formatDate) {
			this.edate = formatDate;
		},
		selectEDate: function() {
			this.eDateCalendarShow = true;
		}
	}
}
</script>

<style scoped>
.timeCard-component {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
    overflow: scroll;
	background-color: #f5f5f5;
	z-index: 1;
}
.headerWrapper {
	background-color: #fff;
	border-bottom: 1px solid rgba(0,0,0,0.1)
}
.inputWrapper {
	padding: 15px 0;
	text-align: center
}
#personID {
	width: 40%;
	border: 1px solid #999;
	border-radius: 2px;
}
.selectDate {
	margin: 1em 0;
	display: flex;
	display: -webkit-flex;
	justify-content: space-around;
	-webkit-justify-content: space-around;
}
.selectDate .selectSDate,
.selectDate .selectEDate {
	padding: 0 0.4em;
	border: 1px solid #999;
	border-radius: 2px;
}
.inputWrapper .submit {
	display: inline-block;
	padding: 5px 40px;
	background-color: #3880e3;
	color: #fff;
	border-radius: 5px
}
/* 表格 */
.timeCardTable {
	margin-top: 5px;
	text-align: center;
}
.timeCardTable table {
	margin: auto;
	width: 98%;
	border: 1px solid #ddd;
	border-collapse: collapse;
	background-color: #fff;
}
.personMsg div{
	display: inline-block;
	line-height: 2em
}
.timeCardTable table th {
	font-weight: normal;
	border: 1px solid #ddd;
}
.timeCardTable table tr,
.timeCardTable table td {
	border: 1px solid #ddd;
}
</style>