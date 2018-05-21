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
        <div class="heightLevelQueryWrapper" ref="heightLevelQueryHook">
        	<!-- 左侧 -->
        	<div class="leftBar">
        		<div class="item" v-for="item, index in groupList" @click="getdetailInLevelQuery(item.bnsgroup, $event)" v-bind:class="{active : index == 0}">
        			{{item.bnsgroup}}
        		</div>
        	</div>
        	<div class="rightBar">
        		<div class="item" v-for="item in workshopList">
        			<div class="workshopTitle">
        				生产车间：{{item}}
        			</div>
        			<div>
        				生产线：
        			</div>
        			<div v-for="item2 in getworklineList(item)" class="worklineItem">
        				{{item2}}
        			</div>
        		</div>
        	</div>
        </div>
        <!-- 查询结果 -->
        <div class="Result-Wrapper" v-show="isShowResult">
        	<div class="headerBarWrapper">
    			<div class="header-Title">
    				{{selectOrderno}} | {{selectCustname}}
    			</div>
				<div class="headerBar" ref="headerBarHook">
					<div class="hearderItem active" @click="selectHearderItem('全部', $event)">
						全部
					</div>
					<div v-for="item in headerTitle" class="hearderItem" @click="selectHearderItem(item.FKIND, $event)">
						{{item.FKIND}}
					</div>
				</div>
				<div>
					
				</div>
			</div>
        </div>
        <!-- loading 图 -->
        <v-loading v-show="isLoading"></v-loading>
	</div>
</template>

<script>
import loading from '../loading/loading';

var T;
export default {
	data: function() {
		return {
			isShowDetailTable: true,
			resultList: [],
			searchTxt: "",
			groupList: [],
			workshopList: [],
			worklineList: {},
			isLoading: false,
			isShowResult: false
		};
	},
	created: function() {
		this.$http.get(this.seieiURL + "/estapi/api/ProductionPlanning/Group").then(resp => {
			this.groupList = resp.body;
			this.workshopList = [];
			this.worklineList = {};
			this.$http.get(this.seieiURL + "/estapi/api/ProductionPlanning?group=" + encodeURIComponent(this.groupList[0].bnsgroup)).then(resp => {
				resp.body.forEach((item) => {
					this.workshopList.push(item.workshop);
				})
				this.workshopList.forEach((item) => {
					this.$http.get(this.seieiURL + "/estapi/api/ProductionPlanning?group=" + encodeURIComponent(this.groupList[0].bnsgroup) + "&workshop=" + encodeURIComponent(item)).then(resp1 => {
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
		}, response => {
			console.log("发送失败"+response.status+","+response.statusText);
		});

		this.$nextTick(function() {
			this.$refs['heightLevelQueryHook'].style.height = window.innerHeight - 96 + "px";
			this.$refs['heightLevelQueryHook'].getElementsByClassName('leftBar')[0].style.height = window.innerHeight - 96 + "px";
			this.$refs['heightLevelQueryHook'].getElementsByClassName('rightBar')[0].style.height = window.innerHeight - 96 + "px";
		});
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
		getdetailInLevelQuery: function(group, event) {
			this.isLoading = true;
			this.workshopList = [];
			this.worklineList = {};
			this.$refs['heightLevelQueryHook'].getElementsByClassName("active")[0].className = "item";
			event.currentTarget.className += " active";
			this.$http.get(this.seieiURL + "/estapi/api/ProductionPlanning?group=" + encodeURIComponent(group)).then(resp => {
				resp.body.forEach((item) => {
					this.workshopList.push(item.workshop);
				})
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
				});
				this.isLoading = false;
			}, response => {
				console.log("发送失败"+response.status+","+response.statusText);
			})
		},
		getworklineList: function(arg) {
			return this.worklineList[arg];
		}
	},
	components: {
        'v-loading': loading
	}
}
</script>

<style scoped>
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
.heightLevelQueryWrapper {
	margin-top: 96px;
	font-size: 0px
}
.heightLevelQueryWrapper .leftBar {
	box-sizing: border-box;
	display: inline-block;
	width: 30%;
	overflow: scroll;
	vertical-align: top;
}
.heightLevelQueryWrapper .leftBar .item {
	box-sizing: border-box;
	width: 100%;
	line-height: 40px;
	border: 1px solid #aaa;
	border-bottom: none;
	border-left: none;
	text-align: center;
	font-size: 14px;
}
.heightLevelQueryWrapper .leftBar .item:first-child {
	border-top: none
}
.heightLevelQueryWrapper .leftBar .active {
	border-right: none;
	background-color: #fff;
}
.heightLevelQueryWrapper .rightBar {
	box-sizing: border-box;
	display: inline-block;
	width: 70%;
	overflow: scroll;
	vertical-align: top;
	background-color: #fff;
}
.heightLevelQueryWrapper .rightBar .item {
	padding: 10px;
	border-bottom: 1px solid #999;
	font-size: 14px;
}
.heightLevelQueryWrapper .rightBar .item:last-child {
	border-bottom: none;
}
.heightLevelQueryWrapper .rightBar .workshopTitle {
	margin-bottom: 0.5em;
	padding-bottom: 0.5em;
	text-align: center;
	border-bottom: #ddd 1px solid;
}
.heightLevelQueryWrapper .rightBar .worklineItem {
    box-sizing: border-box;
    display: inline-block;
    width: 24%;
    padding-left: 10px;
    margin: 10px 8px;
    border-radius: 4px;
    background-color: #ddd;
    vertical-align: top;
}
</style>