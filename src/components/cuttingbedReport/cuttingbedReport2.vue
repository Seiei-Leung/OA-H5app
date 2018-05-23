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
		<div class="Result-Wrapper" v-show="isShowDetailTable">
			<div class="headerBarWrapper">
				<div class="header-Title">
					{{orderno}} | {{custname}} | {{ordernonum}}
				</div>
				<div class="headerBar" ref="headerBarHook">
					<div class="hearderItem active" @click="selectHearderItem('全部', $event)">
						全部
					</div>
					<div v-for="item in titleHearder" class="hearderItem">
						{{item}}
					</div>
				</div>
			</div>
			<div class="contentWrapper">
				<div class="contentItem" v-for="item in resultContentList">
					<div v-show="item.color && !(item.color == '总计')"><span class="title">颜色：</span><span>{{item.color}}</span></div>
					<div v-show="item.color && (item.color == '总计')" style="text-align: center;color: #169fe6;">{{item.item}}总计：</div>
					<div v-show="item.item && !(item.color == '总计')"><span class="title">项目：</span><span>{{item.item}}</span></div>
					<div v-for="item2, index in sizeList"><span class="title">{{item2}}：</span><span>{{item["size" + (index + 1)]}}</span></div>
					<div v-show="item.total"><span class="title">总计：</span><span>{{item.total}}</span></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

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
			resultContentList: [],
			sizeList: []
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
			this.sizeList = [];
			this.$http.get(this.seieiURL + "/estapi/api/Ordersize?serialno=" + encodeURIComponent(serialno)).then(resp => {
				for (var i=1; i<16; i++) {
					if (resp.body[0]["size" + i]) {
						this.sizeList.push(resp.body[0]["size" + i]);
					}
				}

				this.$http.get(this.seieiURL + "/estapi/api/Ordercolor?orderno=" + encodeURIComponent(orderno)).then(resp1 => {
					this.isShowDetailTable = true;
					this.orderno = orderno;
					this.custname = custname;
					this.ordernonum = selectOrdernoNum;
					this.resultContentList = resp1.body;
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
.Result-Wrapper .headerBarWrapper {
	position: fixed;
	top: 96px;
	width: 100%;
}
.Result-Wrapper .headerBarWrapper .header-Title {
	padding-left: 1em;
    background-color: #f5f5f5;
    line-height: 32px;
    overflow: hidden;
}
.Result-Wrapper .headerBarWrapper .headerBar {
	font-size: 0;
    white-space: nowrap;
    overflow: scroll;
    -webkit-overflow-scrolling : touch;
    border-bottom: 2px solid #fff;
    background-color: #f5f5f5
}
.Result-Wrapper .headerBarWrapper .hearderItem {
	display: inline-block;    
	padding: 2px 6px;
    margin: 2px;
    margin-bottom: 0;
    background-color: #e5e5e5;
	font-size: 16px;
	border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    line-height: 32px;
}
.Result-Wrapper .headerBarWrapper .hearderItem.active {
	background-color: #fff;
}
.Result-Wrapper .contentWrapper {
	margin-top: 166px;
	padding: 10px 0 20px 0;
	background-color: #fff;
}
.Result-Wrapper .contentWrapper .contentItem {
    box-sizing: border-box;
	width: 95%;
    margin: auto;
    margin-top: 10px;
    padding: 0.5em;
    background-color: #f9f9f9;
    border-radius: 4px;
    border: 1px solid #999;
    font-size: 12px;
}
.Result-Wrapper .contentWrapper .contentItem .title {
	display: inline-block;
	min-width: 10em;
	color: #169fe6
}
</style>