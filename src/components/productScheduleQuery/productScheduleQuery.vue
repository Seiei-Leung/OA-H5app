<template>
	<div class="productScheduleQuery-component">
		<div class="top_title">
    	    <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i><span>返回</span></a>
    	    <div>生产排期查询</div>
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
            <a href="javascript:void(0);" class="levelQuery">高级查询</a>
        </div>
        <!-- 搜索结果表单号 -->
        <div class="resultList-wrapper" v-show="!(isShowDetailTable)">
        	<div v-for="item in resultList">
        		<div class="resultItem">
        			<span>{{item.orderno}} </span>
        			<span> {{item.custname}}</span>
        		</div>
        	</div>
        </div>
        <!-- 高级查询 -->
        <div class="contentWrapper" ref="contentWrapperHook">
        	<!-- 左侧 -->
        	<div class="leftBar">
        		<div class="item" v-for="item in groupList" @click="getdetailInLevelQuery(item.bnsgroup)">
        			{{item.bnsgroup}}
        		</div>
        	</div>
        	<div class="rightBar">
        		<div class="item" v-for="item in workshopList">
        			<div class="workshopItem">
        				{{item}}
        			</div>
        			<div v-for="item2 in getworklineList(item)" class="worklineItem">
        				{{item2}}
        			</div>
        		</div>
        	</div>
        </div>
	</div>
</template>

<script>
var T;
export default {
	data: function() {
		return {
			isShowDetailTable: true,
			resultList: [],
			searchTxt: "",
			groupList: [],
			workshopList: [],
			worklineList: {}
		};
	},
	created: function() {
		this.$nextTick(function() {
			this.$refs['contentWrapperHook'].style.height = window.innerHeight - 96 + "px";
			this.$refs['contentWrapperHook'].getElementsByClassName('leftBar')[0].style.height = window.innerHeight - 96 + "px";
			this.$refs['contentWrapperHook'].getElementsByClassName('rightBar')[0].style.height = window.innerHeight - 96 + "px";
			this.$http.get(this.seieiURL + "/estapi/api/ProductionPlanning/Group").then(resp => {
				this.groupList = resp.body;
			}, response => {
				console.log("发送失败"+response.status+","+response.statusText);
			})
		})
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
		// 高级查询点击事件
		getdetailInLevelQuery: function(group) {
			this.workshopList = [];
			this.worklineList = {};
			this.$http.get(this.seieiURL + "/estapi/api/ProductionPlanning?group=" + encodeURIComponent(group)).then(resp => {
				resp.body.forEach((item) => {
					this.workshopList.push(item.workshop);
				})
				console.log(this.workshopList);
				console.log("生产线");
				this.workshopList.forEach((item) => {
					this.$http.get(this.seieiURL + "/estapi/api/ProductionPlanning?group=" + encodeURIComponent(group) + "&workshop=" + encodeURIComponent(item)).then(resp1 => {
						var list = [];
						resp1.body.forEach((item2) => {
							list.push(item2.line)
						});
						// Vue 对象类型赋值要使用 $set 用于监听
						this.$set(this.worklineList, item, list);
					}, response1 => {
						console.log("发送失败"+response1.status+","+response1.statusText);
					})
				})
			}, response => {
				console.log("发送失败"+response.status+","+response.statusText);
			})
		},
		getworklineList: function(arg) {
			console.log(arg);
			console.log(this.worklineList);
			console.log(this.worklineList[arg]);
			console.log(this.worklineList["2A"]);
			return this.worklineList[arg];
		}
	}
}
</script>

<style>
.productScheduleQuery-component {
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
.levelQuery {
	display: inline-block;
    line-height: 32px;
    color: #444;
    padding-left: 8px;
    white-space: nowrap;
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
	font-size: 0px
}
.contentWrapper .leftBar {
	box-sizing: border-box;
	display: inline-block;
	width: 35%;
	overflow: scroll;
	vertical-align: top;
}
.contentWrapper .leftBar .item {
	box-sizing: border-box;
	width: 100%;
	line-height: 40px;
	border: 1px solid #ddd;
	border-bottom: none;
	text-align: center;
	font-size: 14px;
}
.contentWrapper .rightBar {
	box-sizing: border-box;
	display: inline-block;
	width: 65%;
	overflow: scroll;
	vertical-align: top;
}
.contentWrapper .rightBar .item {
	font-size: 14px;
}
</style>