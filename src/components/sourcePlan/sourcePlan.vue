<template>
	<div class="sourcePaln-component">
		<div class="top_title">
    	    <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i><span>返回</span></a>
    	    <div>物料计划</div>
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
                    <span>搜索</span>
                </label>
            </form>
            <a href="javascript:;" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
        </div>
        <!-- 搜索结果表单号 -->
        <div class="resultList-wrapper" v-show="!(isShowDetailTable)">
        	<div class="resultItem" v-for="item in resultList" @click="godetail(item.serialno)">
        		<span>{{item.orderno}} </span>
        		<span> {{item.custname}}</span>
        	</div>
        </div>
        <!-- 点击搜索表单号 -->
        <div class="serialnoDetail-Wrapper" v-show="isShowDetailTable">
    		<div class="headerBarWrapper">
				<div class="headerBar" ref="headerBarHook">
					<div class="hearderItem active" @click="selectHearderItem('全部', $event)">
						全部
					</div>
					<div v-for="item in headerTitle" class="hearderItem" @click="selectHearderItem(item.FKIND, $event)">
						{{item.FKIND}}
					</div>
				</div>
			</div>
			<!-- 物料细节表 -->
			<div class="contentWrapper">
				<div v-for="item in contentList" class="contentItem">
					<div><span class="title">物料目录：</span><span>{{item.FKIND}}</span></div>
					<div><span class="title">物料名称：</span><span>{{item.FNAME}}</span></div>
					<div><span class="title">色组：</span><span>{{item.Groupno}}</span></div>
					<div><span class="title">颜色：</span><span>{{item.F03}}</span></div>
					<div><span class="title">尺码：</span><span>{{item.F04}}</span></div>
					<div><span class="title">布封：</span><span>{{item.FWidth}}</span></div>
					<div><span class="title">克重：</span><span>{{item.FKz}}</span></div>
					<div><span class="title">尺码规格：</span><span>{{item.SpecSz}}</span></div>
					<div><span class="title">最晚确认货期：</span><span>{{item.F14 ? String(item.F14).replace("T00:00:00", "") : ""}}</span></div>
					<div><span class="title">需求用量：</span><span>{{item.PLANQTY ? String(item.PLANQTY).split(".")[0] : 0}}</span></div>
					<div><span class="title">采购数：</span><span>{{item.F15 ? String(item.F15).split(".")[0] : 0}}</span></div>
					<div><span class="title">入仓数：</span><span>{{item.F17 ? String(item.F17).split(".")[0] : 0}}</span></div>
				</div>
			</div>
        </div>
	</div>
</template>

<script>
var T;

export default {
	data: function(){
		return {
			searchTxt: "",
			resultList: [],
			isShowDetailTable: false,
			headerTitle: [],
			contentList: [],
			contentListSource: []
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
		// 获取表单信息
		godetail: function(arg) {
			this.isShowDetailTable = true;
			this.$http.get(this.seieiURL + "/estapi/api/Mrpplana?serialno=" + arg).then(resp => {
				this.headerTitle = resp.body;
				this.$http.get(this.seieiURL + "/estapi/api/Mrpplana?serialno1=" + arg).then(resp1 => {
					this.contentList = resp1.body;
					this.contentListSource = resp1.body;
				}, response1 => {
        	    	console.log("发送失败" + response1.status + "," + response1.statusText);
        		})
			}, response => {
        	    console.log("发送失败" + response.status + "," + response.statusText);
        	});
		},
		// 点击标题分项卡
		selectHearderItem: function(kind, event) {
			if (kind == "全部") {
				this.contentList = this.contentListSource;
			} else {
				this.contentList = [];
				this.contentListSource.forEach((item) => {
					if (item.FKIND == kind) {
						this.contentList.push(item);
					}
				});
			}
			this.$refs.headerBarHook.getElementsByClassName("active")[0].className = "hearderItem";
			event.target.className += " active";
		}
	}
}
</script>

<style scoped>
.sourcePaln-component {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
    overflow: scroll;
	background-color: #f5f5f5;
	z-index: 1;
}
.weui-search-bar {
	position: fixed;
	top: 48px;
	width: 100%
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
.headerBarWrapper {
	position: fixed;
	top: 92px;
	width: 100%;
}
.headerBar {
	padding-top: 10px;
	font-size: 0;
    white-space: nowrap;
    overflow: scroll;
    border-bottom: 2px solid #fff;
    background-color: #f5f5f5
}
.hearderItem {
	display: inline-block;    
	padding: 2px 6px;
    margin: 2px;
    margin-bottom: 0;
    background-color: #e5e5e5;
	font-size: 16px;
	border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
.hearderItem.active {
	background-color: #fff;
}
.contentWrapper {
	padding: 87px 0 20px 0;
	background-color: #fff
}
.contentItem {
    box-sizing: border-box;
	width: 95%;
    margin: auto;
    margin-top: 10px;
    padding: 0.5em;
    background-color: #f9f9f9;
    border-radius: 4px;
    border: 1px solid #999;
}
.contentItem .title {
	display: inline-block;
	min-width: 7em;
	color: #169fe6
}
</style>