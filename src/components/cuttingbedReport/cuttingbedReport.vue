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
        <div class="resultList-wrapper" v-show="!(isShowDetailTable)">
        	<div v-for="item in resultList">
        		<div @click="godetail(item.serialno,item.orderno,item.custname,item.quantity)" class="resultItem">
        			<span>{{item.orderno}} </span>
        			<span> {{item.custname}}</span>
        		</div>
        	</div>
        </div>
		<div class="" v-show="isShowDetailTable">
			<div class="contentWrapper">
				<div class="header-Title">
					{{orderno}} | {{custname}} | {{ordernonum}}
				</div>
				<div class="contentTable" ref="cssHook">
					<table class="table">
						<tr class="header bar">
							<th class="item title colorTitleHook">
								颜色
							</th>
							<th class="item copyOneColorTitleHook">
								项目
							</th>
							<th v-for="item, index in titleHearder" class="item" v-bind:class="'titleHearderHook' + index">
								{{item}}
							</th>
							<th class="item">
								小计
							</th>
						</tr>
						<tr v-for="contents, index in contentList" class="contentRow">
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
<!-- 						<tr class="total bar">
							<td class="item title">
								总计
							</td>
							<td class="item"></td>
							<td class="item" v-for="item in totalNums">
								{{item}}
							</td>
							<td class="item">
								{{totalNum}}
							</td>
						</tr> -->
					</table>
					<div class="copy">
						<div class="colorTitle copyitem">
							颜色
						</div>
						<div v-for="item, index in colorList" v-bind:class="'copy' + index" class="copyitem">
							{{item}}
						</div>
					</div>
					<div class="copyOne">
						<div class="copyitem copyOneColorTitle">
							项目
						</div>
						<div v-for="item, index in kindTxtList" v-bind:class="'copyOne' + index" class="copyitem">
							{{item}}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

var T;
var startX, startY;
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
						for (var j=1; j<this.titleHearder.length+1; j++) {
							forContentList.push(resp1.body[i]['size' + j]);
						}
						forContentList.push(resp1.body[i].total);
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

        				// 颜色定位
        				this.$refs['cssHook'].getElementsByClassName("colorTitle")[0].style.width = this.$refs['cssHook'].getElementsByClassName("colorTitleHook")[0].offsetWidth + "px";
        				this.$refs['cssHook'].getElementsByClassName("colorTitle")[0].style.height = this.$refs['cssHook'].getElementsByClassName("colorTitleHook")[0].offsetHeight + "px";
        				for (var i=0; i<this.colorList.length; i++) {
        					this.$refs['cssHook'].getElementsByClassName("copy" + i)[0].style.width = this.$refs['cssHook'].getElementsByClassName('Hook' + i)[0].offsetWidth + "px";
        					this.$refs['cssHook'].getElementsByClassName("copy" + i)[0].style.height = this.$refs['cssHook'].getElementsByClassName('Hook' + i)[0].offsetHeight + "px";
        				}

        				// 项目定位
        				this.$refs['cssHook'].getElementsByClassName("copyOne")[0].style.left = this.$refs['cssHook'].getElementsByClassName("colorTitleHook")[0].offsetWidth + "px";
        				this.$refs['cssHook'].getElementsByClassName("copyOneColorTitle")[0].style.width = this.$refs['cssHook'].getElementsByClassName("copyOneColorTitleHook")[0].offsetWidth + "px";
        				this.$refs['cssHook'].getElementsByClassName("copyOneColorTitle")[0].style.height = this.$refs['cssHook'].getElementsByClassName("copyOneColorTitleHook")[0].offsetHeight + "px";
        				for (var i=0; i<this.kindTxtList.length; i++) {
        					this.$refs['cssHook'].getElementsByClassName("copyOne" + i)[0].style.width = this.$refs['cssHook'].getElementsByClassName("copyOneHook" + i)[0].offsetWidth + "px";
        					this.$refs['cssHook'].getElementsByClassName("copyOne" + i)[0].style.height = this.$refs['cssHook'].getElementsByClassName("copyOneHook" + i)[0].offsetHeight + "px";
        				}
        			})
				}, response1 => {
					console.log("发送失败" + response.status + "," + response.statusText);
				})
			}, response => {
				console.log("发送失败" + response.status + "," + response.statusText);
			});
		}
	}
}
</script>

<style scoped>
.cuttingbedReport-component {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
    overflow: scroll;
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
	margin-top: 100px;
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
}
.contentTable {
	padding-top: 25px;
	overflow: scroll;
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
	top: 121px;
	z-index: 1
}
.copyOne {
	position: absolute;
	top: 121px;
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
</style>