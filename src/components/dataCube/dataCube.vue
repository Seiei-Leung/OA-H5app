<template>
	<div class="dataCube-component">
    	<div class="dataTable">
    	    <div class="top_title">
    	        <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i>返回</a>
    	        <div>数据魔方</div>
    	    </div>
    	    <div class="search-wrapper">
    	        <div class="table-item client">
    	            <span>查询客户：</span>
    	            <input type="text" name="" style="" placeholder="请输入要查询的客户">
    	        </div>
    	        <div style="overflow: hidden;margin-top: 0.5em">
    	            <div class="table-item start-year">
    	                <span>开始年份：</span>
    	                <select>
    	                    <option>2017</option>
    	                    <option>2016</option>
    	                </select>
    	            </div>
    	            <div class="table-item end-year">
    	                <span>结束年份：</span>
    	                <select>
    	                    <option>2017</option>
    	                    <option>2016</option>
    	                </select>
    	            </div>
    	        </div>
    	        <div style="overflow: hidden;margin-top: 0.5em">
    	            <div class="table-item table-type">
    	                <span>图标类型：</span>
    	                <select>
    	                    <option>柱状图</option>
    	                    <option>扇形图</option>
    	                </select>
    	            </div>
    	            <div class="order">
    	                <span style="margin-right: 0.5em">顺序</span>
    	                <input type="radio" name="order">
    	                <span style="margin-left: 1em;margin-right: 0.1em">倒序</span>
    	                <input type="radio" name="order">
    	            </div>
    	        </div>
    	        <div class="table-item shownum">
    	            <span>显示前：</span>
    	            <input type="text" name="" style="width:2rem;">
    	            <span>个客户</span>
    	        </div>
    	        <div class="submit-btn" style="margin-top: 1.5em">
    	            <button style="">查 询</button>
    	        </div>
    	    </div>
    	</div>
    	<div id="dataTable" style="width: 10rem;height: 10rem; margin-top:1em" ref="datatablehook">
    	</div>
	</div>
</template>

<script>
import echarts from "echarts";

export default {
  created: function() {
    this.$nextTick(() => {
      let dom = this.$refs.datatablehook
      var myChart = echarts.init(dom);
      // 指定图表的配置项和数据
      var option = {
          title: {
              text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
              data:['销量']
          },
          xAxis: {
              data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
          }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    })
  }
}
</script>

<style scoped>
.dataCube-component {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
    overflow: scroll;
	background-color: #f5f5f5;
	z-index: 1;
}
.dataTable .search-wrapper {
    background-color: #fff;
    padding: 0.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    line-height: 1.8em;
    font-size: 1.2em;
    overflow: hidden;
}
.dataTable .table-item span {
    display: inline-block;
    width: 2.5rem;
    text-align: center;
    float: left;
}
.dataTable .search-wrapper .table-item input {
    display: inline-block;
    height: 2em;
    line-height: 2em;
    width: 6rem;
    float: left;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-left: 1em;
    box-sizing: border-box;
    border-radius: 0;
}
.dataTable .search-wrapper .table-item {
    overflow: hidden;
}
.dataTable .search-wrapper .table-item {
    overflow: hidden;
}
</style>
