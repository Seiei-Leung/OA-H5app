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
            <a href="javascript:void(0);" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
            <a href="javascript:void(0);" class="levelQuery" @click="changeQuery">{{changeQueryTxt}}</a>
        </div>
        <!-- 搜索结果表单号 -->
        <div style="margin-top: 96px;width: 100%;overflow: scroll;-webkit-overflow-scrolling : touch;" ref="resultListwrapper" v-show="!(isShowDetailTable) && !(isShowResult)">
        	<div class="resultList-wrapper">
        		<div v-for="item in resultList">
        			<div class="resultItem" @click="getResult(item.orderno, item.custname)">
        				<span>{{item.orderno}} </span>
        				<span> {{item.custname}}</span>
        			</div>
        		</div>
        	</div>
    	</div>
        <!-- 高级查询 -->
        <div class="heightLevelQueryWrapper" ref="heightLevelQueryHook" v-show="isShowDetailTable && !isShowResult">
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
        			<div v-for="item2 in getworklineList(item)" class="worklineItem" @click="getResults(item, item2)">
        				{{item2}}
        			</div>
        		</div>
        	</div>
        </div>
        <!-- 查询结果 -->
        <div class="Result-Wrapper" v-show="isShowResult">
        	<div class="headerBarWrapper">
    			<div class="header-Title">
    				<span v-show="selectOrderno">
    					{{selectOrderno}} | {{selectCustname}}
    				</span>
    				<span v-show="!selectOrderno">
    					{{selectGroup}} | {{selectWorkshop}} | {{selectWorkLine}}
    				</span>
    			</div>
				<div class="headerBar" ref="headerBarHook">
					<div class="hearderItem active" @click="selectHearderItem('全部', $event)">
						全部
					</div>
					<div v-for="item in headerTitle" class="hearderItem" @click="selectHearderItem(item, $event)">
						{{item}}
					</div>
				</div>
			</div>
			<div class="contentWrapper" v-show="resultContentList.length > 0">
				<div v-for="item in resultContentList" class="contentItem">
					<div v-show="item.orderno"><span class="title">制单号：</span><span>{{item.orderno}}</span></div>
					<div v-show="item.custname"><span class="title">客户：</span><span>{{item.custname}}</span></div>
					<div v-show="item.styleno"><span class="title">款号：</span><span>{{item.styleno}}</span></div>
					<div v-show="item.outdate"><span class="title">工厂离厂期：</span><span>{{String(item.outdate).split("T")[0]}}</span></div>
					<div v-show="item.planqty"><span class="title">分配数：</span><span>{{item.planqty}}</span></div>
					<div v-show="item.finishqty"><span class="title">完成数：</span><span>{{item.finishqty}}</span></div>
					<div v-show="item.yhgcname"><span class="title">印花工厂：</span><span>{{item.yhgcname}}</span></div>
					<div v-show="item.cyhgcname"><span class="title">车花工厂：</span><span>{{item.cyhgcname}}</span></div>
					<div v-show="item.orderkind"><span class="title">订单类别：</span><span>{{item.orderkind}}</span></div>
					<div v-show="item.sampledate"><span class="title">系统推算批办时间：</span><span>{{String(item.sampledate).split("T")[0]}}</span></div>
					<div v-show="item.sampledatedays"><span class="title">批办期差异：</span><span>{{item.sampledatedays}}</span></div>
					<div v-show="item.fabricconfirmdate"><span class="title">布料确认开始日期：</span><span>{{String(item.fabricconfirmdate).split("T")[0]}}</span></div>
					<div v-show="item.fabricdate"><span class="title">系统推算布期：</span><span>{{String(item.fabricdate).split("T")[0]}}</span></div>
					<div v-show="item.firstfabricindate"><span class="title">首次布料入仓日期：</span><span>{{String(item.firstfabricindate).split("T")[0]}}</span></div>
					<div v-show="item.fabricdatedays"><span class="title">布期差异：</span><span>{{String(item.fabricdatedays).split("T")[0]}}</span></div>
					<div v-show="item.cutsdate"><span class="title">裁剪开始期：</span><span>{{String(item.cutsdate).split("T")[0]}}</span></div>
					<div v-show="item.cutedate"><span class="title">推算裁剪完成期：</span><span>{{String(item.cutedate).split("T")[0]}}</span></div>
					<div v-show="item.sendpiecedate"><span class="title">发裁片期：</span><span>{{String(item.sendpiecedate).split("T")[0]}}</span></div>						
					<div v-show="item.hangpiecedate"><span class="title">开始挂片期：</span><span>{{String(item.hangpiecedate).split("T")[0]}}</span></div>
					<div v-show="item.ssewdate"><span class="title">开始车缝期：</span><span>{{String(item.ssewdate).split("T")[0]}}</span></div>
					<div v-show="item.esewdate"><span class="title">完成车缝期：</span><span>{{String(item.esewdate).split("T")[0]}}</span></div>
				</div>
			</div>
			<div class="contentWrapper" v-show="resultContentList.length == 0" style="text-align: center;">
				无
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
			isShowDetailTable: false,
			resultList: [],
			searchTxt: "",
			groupList: [],
			workshopList: [],
			worklineList: {},
			isLoading: false,
			isShowResult: false,
			selectGroup: "",
			headerTitle: [],
			resultContentList: [],
			resultContentListSource: [],
			selectOrderno: "",
			selectCustname: "",
			selectWorkshop: "",
			selectWorkLine: "",
			changeQueryTxt: "高级查询"
		};
	},
	created: function() {
		this.$http.get(this.seieiURL + "/estapi/api/ProductionPlanning/Group").then(resp => {
			this.groupList = resp.body;
			this.selectGroup = this.groupList[0].bnsgroup;
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
			this.isShowResult = false;
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
		// 高级查询点击事件
		getdetailInLevelQuery: function(group, event) {
			this.isLoading = true;
			this.selectGroup = group;
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
		// 点击生产组别
		getworklineList: function(arg) {
			return this.worklineList[arg];
		},
		// 点击生产线
		getResults: function(workshop, workline) {
			this.selectOrderno = "";
			this.selectCustname = "";
			this.selectWorkshop = workshop;
			this.selectWorkLine = workline;
			this.isLoading = true;
			this.$http.get(this.seieiURL + "/estapi/api/ProductionPlanning?group=" + encodeURIComponent(this.selectGroup) + "&workshop=" + encodeURIComponent(workshop) + "&line=" + encodeURIComponent(workline) + "&orderno").then(resp => {
				var headerTitleHook = [];
				var isTheSame = false;
				resp.body.forEach((item) => {
					if (headerTitleHook.length > 0) {
						headerTitleHook.forEach((item2) => {
							if (item.orderno == item2) {
								isTheSame = true;
							}
						});
						if (!isTheSame) {
							headerTitleHook.push(item.orderno);
						}
						isTheSame = false;
					} else {
						headerTitleHook.push(item.orderno);
					}
				})
				this.$refs.headerBarHook.getElementsByClassName("active")[0].className = "hearderItem";
				this.$refs.headerBarHook.getElementsByClassName("hearderItem")[0].className += " active";
				this.headerTitle = headerTitleHook;
				this.resultContentList = resp.body;
				this.resultContentListSource = resp.body;
				this.isLoading = false;
				this.isShowResult = true;
				this.isShowDetailTable = false;
				this.changeQueryTxt = "高级查询";
			}, response => {
				this.isLoading = false;
				console.log("发送失败"+response.status+","+response.statusText);
			});
		},
		// 点击标题分项卡
		selectHearderItem: function(kind, event) {
			if (kind == "全部") {
				this.resultContentList = this.resultContentListSource;
			} else {
				this.resultContentList = [];
				this.resultContentListSource.forEach((item) => {
					if (item.orderno == kind) {
						this.resultContentList.push(item);
					}
				});
			}
			this.$refs.headerBarHook.getElementsByClassName("active")[0].className = "hearderItem";
			event.target.className += " active";
		},
		getResult: function(orderno, custname) {
			this.isLoading = true;
			this.isShowResult = true;
			this.selectOrderno = orderno;
			this.selectCustname = custname;
			this.$http.get(this.seieiURL + "/estapi/api/ProductionPlanning?group=&workshop=&line=&orderno=" + encodeURIComponent(orderno)).then(resp => {
				this.changeQueryTxt = "高级查询";
				this.isLoading = false;
				this.headerTitle = [];
				this.headerTitle.push(orderno);
				this.resultContentListSource = resp.body;
				this.resultContentList = resp.body;
				this.$refs.headerBarHook.getElementsByClassName("active")[0].className = "hearderItem";
				this.$refs.headerBarHook.getElementsByClassName("hearderItem")[0].className += " active"; 
			}, response => {
				console.log("发送失败"+response.status+","+response.statusText);
			});
		},
		changeQuery: function() {
			if (this.resultContentList.length == 0 && !this.isShowDetailTable) {
				this.changeQueryTxt = "高级查询";
				this.isShowDetailTable = true;
				this.isShowResult = false;
				return;
			}
			if (this.resultContentList.length > 0 && !this.isShowDetailTable) {
				this.changeQueryTxt = "历史查询";
				this.isShowDetailTable = true;
				this.isShowResult = false;
				return;
			} 
			if (this.resultContentList.length > 0 && this.isShowDetailTable) {
				this.changeQueryTxt = "高级查询";
				this.isShowResult = true;
				this.isShowDetailTable = false;
				return;
			}
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
.levelQuery {
	display: inline-block;
    line-height: 32px;
    color: #444;
    padding-left: 8px;
    white-space: nowrap;
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
.heightLevelQueryWrapper {
	margin-top: 96px;
	font-size: 0px
}
.heightLevelQueryWrapper .leftBar {
	box-sizing: border-box;
	display: inline-block;
	width: 30%;
	overflow: scroll;
    -webkit-overflow-scrolling : touch;
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
    -webkit-overflow-scrolling : touch;
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