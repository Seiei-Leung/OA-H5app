<template>
	<div class="dataCube-component">
    	<div class="dataTable">
    	    <div class="top_title">
    	        <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i><span>返回</span></a>
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
                <!-- 扇形图和柱状图 -->
<!--     	        <div style="overflow: hidden;margin-top: 0.5em">
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
    	        </div> -->
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
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require("echarts/lib/component/legendScroll");

export default {
  created: function() {
    this.$nextTick(() => {
      let dom = this.$refs.datatablehook
      var myChart = echarts.init(dom);
      // 指定图表的配置项和数据
    	var option = {
    	    title: {
    	        text: 'DP',
    	        left: 'left',
    	        textStyle: { 'fontSize': 12 }
    	    },
    	    grid: {
    	        left: '12%'
    	    },
    	    tooltip: {
    	        trigger: 'axis'
    	    },
    	    legend: {
    	        data: ['2017年', '2016年'],
    	        right: 'right'
    	    },
    	    toolbox: {
    	        show: false,
    	        feature: {
    	            dataView: { show: true, readOnly: false },
    	            magicType: { show: true, type: ['line', 'bar'] },
    	            restore: { show: true },
    	            saveAsImage: { show: true }
    	        }
    	    },
    	    calculable: true,
    	    xAxis: [{
    	        type: 'category',
    	        data: ['斐乐', 'SM', '安踏集团', 'BW1', '安踏厦门', '荷马', '菲浦', '莘威', '茵宝', '海澜之家'],
    	        nameLocation: 'middle',
    	        axisLabel: { interval: 0, rotate: 45 }
    	    }],
    	    yAxis: [{
    	        type: 'value',
    	        axisLabel: {
    	            rotate: 60,
    	            formatter: function(value, index) {
    	                value = index == 0 ? '0' : (value / 10000000 + '千万');
    	                return value
    	            }
    	        }
    	    }],
    	    series: [{
    	            name: '2017年',
    	            type: 'bar',
    	            data: [140213129.16, 88471613.09, 64991634.71, 55483589.93, 16418747.49, 13770836.33, 13730612.3, 13377539.97, 	10087426.97, 4193619.52]
    	            // ,
    	            // markPoint: {
    	            //     data: [
    	            //         { type: 'max', name: '最大值' },
    	            //         { type: 'min', name: '最小值' }
    	            //     ]
    	            // },
    	            // markLine: {
    	            //     data: [
    	            //         { type: 'average', name: '平均值' }
    	            //     ]
    	            // }
    	        },
    	        {
    	            name: '2016年',
    	            type: 'bar',
    	            data: [105720961.73, 101196117.65, 33556517.63, 77983276.83, 7494073.57, 130460.15, 0, 42890853.85, 3016414.24, 27614523.43]
    	            // ,
    	            // markPoint: {
    	            //     data: [
    	            //         { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
    	            //         { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
    	            //     ]
    	            // },
    	            // markLine: {
    	            //     data: [
    	            //         { type: 'average', name: '平均值' }
    	            //     ]
    	            // }
    	        }
    	    ]
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
.dataTable .start-year {
    float: left;
}
.dataTable .end-year {
    float: right;
}
.dataTable select {
    border: 1px solid #e5e5e5;
    border-radius: 0;
    background-color: #fff;
}
.dataTable .table-type {
    float: left;
    width: 5rem;
    height: 2em;
    line-height: 2em;
}
.dataTable .search-wrapper .table-item {
    overflow: hidden;
}
.dataTable .search-wrapper .table-item {
    overflow: hidden;
}
.dataTable .submit-btn button {
    display: block;
    width: 5rem;
    height: 1rem;
    line-height: 1rem;
    font-size: 1.2em;
    margin: auto;
    background-color: #169fe6;
    border-radius: 10px;
    color: #fff;
}
</style>
