<template>
	<div class="cuttingbedReport-component">
		<div class="top_title">
    	    <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i><span>返回</span></a>
    	    <div>裁床报表</div>
    	</div>
        <div class="weui-search-bar" id="searchBar">
            <form class="weui-search-bar__form">
                <div class="weui-search-bar__box">
                    <i class="weui-icon-search"></i>
                    <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索" required="" v-on:input="watchInput" v-model="searchTxt">
                    <a href="javascript:void(0);" class="weui-icon-clear" id="searchClear"></a>
                </div>
                <label class="weui-search-bar__label" id="searchText">
                    <i class="weui-icon-search"></i>
                    <span style="line-height:32px">搜索</span>
                </label>
            </form>
            <a href="javascript:;" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
        </div>
        <!-- 搜索结果表单号 -->
        <div style="margin-top: 96px;width: 100%;overflow: scroll;-webkit-overflow-scrolling : touch;" ref="resultListwrapper" v-show="!(isShowDetailTable)">
       		<div class="resultList-wrapper">
       			<div v-for="item in resultList">
       				<div @click="godetail(item.serialno,item.orderno,item.custname,item.quantity)" class="resultItem">
       					<span>{{item.orderno}} </span>
       					<span> {{item.custname}}</span>
       				</div>
       			</div>
       		</div>
    	</div>
		<div class="" v-show="isShowDetailTable">
			<div class="header-Title">
				{{orderno}} | {{custname}} | {{ordernonum}}
			</div>
			<div class="contentWrapper">
				<div class="contentTable" ref="cssHook">
					<div ref="overflowHook" style="padding-bottom: 30px;">
						<table class="table">
						<tr class="header bar">
							<th class="item title colorTitleHook">
								颜色
							</th>
							<th class="item copyOneColorTitleHook">
								项目
							</th>
							<th class="item">
								小计
							</th>
							<th v-for="item, index in titleHearder" class="item" v-bind:class="'titleHearderHook' + index">
								{{item}}
							</th>
						</tr>
						<tr v-for="contents, index in contentList" class="contentRow" v-bind:class="rowBorder(index)">
							<td class="item title" v-bind:class="'Hook' + index">
								{{colorList[index]}}
							</td>
							<td class="item" v-bind:class="'copyOneHook' + index">
								{{kindTxtList[index]}}
							</td>
							<td v-for="item in contents" class="item">
								{{item}}
							</td>
						</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll';


var T;
var startX, startY;
var rowBorderHook;
export default {
	data: function() {
		return {
			searchTxt: "",
			isShowDetailTable: false,
			resultList: [],
			orderno: "",
			custname: "",
			ordernonum: "",
			titleHearder: [],
			contentList: [],
			totalNums: [],
			colorList: [],
			kindTxtList: [],
			totalNum: ""
		}
	},
	methods: {
		// 检查输入框输入事件
		watchInput: function() {
			var that = this;
			this.isShowDetailTable = false;
			clearTimeout(T);
			T = setTimeout(() => {
				var url = that.seieiURL + "/estapi/api/WorkOrder?keywords=" + that.searchTxt;
				that.$http.get(url).then(resp => {
					that.resultList = resp.body;
					this.$nextTick(() => {
						this.$refs["resultListwrapper"].style.height = window.innerHeight - 96 + "px";
					});
				}, response => {
					console.log("发送失败"+response.status+","+response.statusText);
				});
			}, 1500);
		},
		godetail: function(serialno, orderno, custname, selectOrdernoNum) {
			this.titleHearder = [];
			this.contentList = [],
			this.totalNums = [],
			this.colorList = [],
			this.kindTxtList = [],
			this.$http.get(this.seieiURL + "/estapi/api/Ordersize?serialno=" + encodeURIComponent(serialno)).then(resp => {
				console.log(resp.body)
				for (var i=1; i<16; i++) {
					if (resp.body[0]["size" + i]) {
						this.titleHearder.push(resp.body[0]["size" + i]);
					}
				}
				this.$http.get(this.seieiURL + "/estapi/api/Ordercolor?orderno=" + encodeURIComponent(orderno)).then(resp1 => {
					this.isShowDetailTable = true;
					this.orderno = orderno;
					this.custname = custname;
					this.ordernonum = selectOrdernoNum;
					console.log(resp1.body);
					for (var i=0; i<resp1.body.length; i++) {
						var forContentList = [];
						forContentList.push(resp1.body[i].total);
						for (var j=1; j<this.titleHearder.length+1; j++) {
							forContentList.push(resp1.body[i]['size' + j]);
						}
						this.contentList.push(forContentList);
						this.colorList.push(resp1.body[i]['color']);
						this.kindTxtList.push(resp1.body[i]['item']);
					}
        			for (var i=0; i<this.titleHearder.length; i++) {
        				var num = 0;
        				for (var j=0; j<this.colorList.length; j++) {
        					num += Number(this.contentList[j][i]);
        				}
        				this.totalNums.push(num);
        			}
        			var num = 0;
        			for (var i=0; i<this.colorList.length; i++) {
        				num += this.contentList[i][this.contentList[i].length - 1];
        			}
        			this.totalNum = num;
        			this.$nextTick(function() {

        				var indexList = [];
        				var cssHook = this.$refs['cssHook'];
        				for (var i=0; i<this.colorList.length; i++) {
        					if (!(this.colorList[i] == this.colorList[i+1])) {
        						indexList.push(i);
        					}
        				}

        				this.$refs["overflowHook"].style.height = this.$refs["overflowHook"].getElementsByClassName("table")[0].offsetHeight + "px";
        				this.$refs["overflowHook"].style.width = this.$refs["overflowHook"].getElementsByClassName("table")[0].offsetWidth + "px";
        				cssHook.style.height = window.innerHeight - 121 + "px";
        				cssHook.style.width = window.innerWidth + "px";

        				new BScroll(cssHook, {scrollX: true, scrollY: true, click: true})
        			})
				}, response1 => {
					console.log("发送失败" + response.status + "," + response.statusText);
				})
			}, response => {
				console.log("发送失败" + response.status + "," + response.statusText);
			});
		},
		rowBorder: function(index) {
			// 不能适用 this.rowBorderHook 的形式，因为 vue 的方法优惠监测 this.rowBorderHook 是否改变而决定是否再度执行
			if (index == 0) {
				rowBorderHook = this.colorList[0];
				return;
			}
			if (this.colorList[index] == rowBorderHook) {
				return;
			} else {
				rowBorderHook = this.colorList[index];
			    return "border";
			}
		}
	}
}
</script>

<style scoped>
.cuttingbedReport-component {
	position: fixed;
	top: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling : touch;
	background-color: #f5f5f5;
	z-index: 1;
}
.weui-search-bar {
	position: fixed;
	top: 48px;
	width: 100%;
	z-index: 2
}
.weui-search-bar__form {
	height: 32px;
}
.weui-icon-search {
	line-height: 32px;
}
#searchInput {
	padding: 0;
	height: 32px;
	line-height: 32px;
}
#searchClear {
	line-height: 32px;
}
#searchCancel {
	line-height: 32px
}

.resultList-wrapper {
	padding: 0.5em;
	padding-bottom: 5em;
}
.resultItem {
	display: inline-block;
	margin: 8px;
	padding: 2px 4px;
	line-height: 1.2em;
	border-radius: 4px;
	background-color: #ddd;
	color: #444;
}
.contentWrapper {
	margin-top: 96px;
	margin-bottom: 30px;
}
.header-Title {
    position: fixed;
    width: 100%;
	padding-left: 1em;
	color: #444;
    line-height: 25px;
    z-index: 10;
    background-color: #f5f5f5;
    font-size: 12px;
}
.contentTable {
	width: 100%;
	overflow: scroll;
	-webkit-overflow-scrolling : touch;
	padding-top: 25px;
}
.table {
	position: relative;
	font-size: 12px;
	text-align: center;
	border-collapse:collapse;
}
.table .item {
	box-sizing: border-box;
	min-width: 70px;
	padding: 0.5em;
	border: 1px solid #ddd;
	background-color: #fff
}
.copy {
	position: absolute;
	top: 0px;
	z-index: 1
}
.copyOne {
	position: absolute;
	top: 0px;
	z-index: 1;
}
.copyitem {
	box-sizing: border-box;
	padding: 0.5em;
	text-align: center;
	background-color: #fff;
	border: 1px solid #ddd;
	border-bottom: none;
	font-size: 12px;
	vertical-align: inherit;
}
.contentRow.border {
	border-top: 10px solid #ddd;
}
</style>