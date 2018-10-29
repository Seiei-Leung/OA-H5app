<template>
	<div class="sourcePlan-component">
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
                    <span style="line-height:32px">搜索</span>
                </label>
            </form>
            <a href="javascript:;" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
        </div>
        <!-- 搜索结果表单号 -->
        <div style="margin-top: 96px;width: 100%;overflow: scroll;-webkit-overflow-scrolling : touch;" ref="resultListwrapper" v-show="!(isShowDetailTable)">
        	<div class="resultList-wrapper">
        		<div v-for="item in resultList">
        			<div @click="godetail(item.serialno,item.orderno,item.custname,item.quantity, item.picurl, item.season)" class="resultItem">
        				<span>{{item.orderno}} </span>
        				<span> {{item.custname}}</span>
        			</div>
        		</div>
        	</div>
    	</div>
        <!-- 点击搜索表单号 -->
        <div class="serialnoDetail-Wrapper" v-show="isShowDetailTable">
    		<div class="headerBarWrapper">
    			<div class="header-Title"><img v-bind:src="picurl" class="thumbImg" @click="showPic"><span>{{selectOrderno}} | {{selectCustname}} | {{season}}</span><a href="javascript:void(0);" @click="goSerialnoDetail(serialno, selectOrderno, selectCustname, selectOrdernoNum)">{{selectOrdernoNum}}> </i></a>
    				<a href="javascript:void(0);" @click="showBackground" class="stayBottom">
    					货期<i class="icon-chevron-right"></i>
    				</a>
    			</div>
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
					<!-- <div><span class="title">物料目录：</span><span>{{item.FKIND}}</span></div> -->
					<div v-show="item.FNAME"><span class="title">物料名称：</span><span>{{item.FNAME}}</span></div>
					<div v-show="item.Groupno"><span class="title">色组：</span><span>{{item.Groupno}}</span></div>
					<div v-show="item.F03"><span class="title">颜色：</span><span>{{item.F03}}</span></div>
					<div v-show="item.F04"><span class="title">尺码：</span><span>{{item.F04}}</span></div>
					<div v-show="item.BType == '布料'"><span class="title">布封：</span><span>{{item.FWidth}}</span></div>
					<div v-show="item.BType == '布料'"><span class="title">克重：</span><span>{{item.FKz}}</span></div>
					<div v-show="item.SpecSz"><span class="title">尺码规格：</span><span>{{item.SpecSz}}</span></div>
					<div v-show="item.ConfirmDate && item.F14">
						<span class="title">确认货期：</span><span>{{item.ConfirmDate ? String(item.ConfirmDate).replace("T00:00:00", "") : ""}}</span>~<span>{{item.F14 ? String(item.F14).replace("T00:00:00", "") : ""}}</span>
					</div>
					<div v-show="item.PLANQTY"><span class="title">需求用量：</span><span>{{item.PLANQTY ? String(item.PLANQTY).split(".")[0] : 0}}</span></div>
					<div v-show="item.bomstduse"><span class="title">单件用量：</span><span>{{item.bomstduse}}</span></div>
					<div v-show="item.F15"><span class="title">采购数：</span><span>{{item.F15 ? String(item.F15).split(".")[0] : 0}}</span></div>
					<div v-show="item.F17"><span class="title">入仓数：</span><span>{{item.F17 ? String(item.F17).split(".")[0] : 0}}</span></div>
					<div v-show="item.F19"><span class="title">领料数：</span><span>{{item.F19 ? String(item.F19).split(".")[0] : 0}}</span></div>
					<div v-show="item.F08"><span class="title">调入数：</span><span>{{item.F08 ? String(item.F08).split(".")[0] : 0}}</span></div>
					<div v-show="item.F09"><span class="title">调出数：</span><span>{{item.F09 ? String(item.F09).split(".")[0] : 0}}</span></div>
					<div v-show="item.F18"><span class="title">退货数：</span><span>{{item.F18 ? String(item.F18).split(".")[0] : 0}}</span></div>
					<div v-show="item.F29"><span class="title">退料数：</span><span>{{item.F29 ? String(item.F29).split(".")[0] : 0}}</span></div>
					<div v-show="item.F05"><span class="title">单位：</span><span>{{item.F05}}</span></div>
				</div>
			</div>
        	<div class="footbar">
        		<div>
        			<div class="item">需求数：{{needNum}}</div>
        			<div class="item">采购数：{{buyNum}}</div>
        		</div>
        		<div>
        			<div class="item">入仓数：{{saveNum}}</div>
        			<div class="item">领料数：{{takeNum}}</div>
        		</div>
        		<div>
        			<div class="item">调入数：{{tuneOutNum}}</div>
        			<div class="item">调出数：{{tuneInNum}}</div>
        		</div>
        	</div>
        	<!-- 黑色遮盖 图 -->
        	<div @click="hideBackground">
        		<v-blackBackground v-show="isblackBackground"></v-blackBackground>
        	</div>
        	<div v-show="isShowPic && isblackBackground" class="pic"><img v-bind:src="picurl"></div>
        	<!-- 货期 -->
        	<div v-show="isdeliveryTime && isblackBackground" class="deliveryTime">
        		<div v-show="backgroundList.length > 0">
        			<div v-for="item in backgroundList">
        				<div><span>工厂离厂货期：</span><span>{{item.facdelivery ? String(item.facdelivery).replace("T00:00:00", "") : ""}}</span></div>
        				<div><span>分批走货数量：</span><span>{{item.batchshipments ? String(item.batchshipments).split(".")[0] : 0}}</span></div>
        			</div>
        		</div>
        		<div v-show="backgroundList.length == 0">
        			无
        		</div>
        	</div>
        </div>
	</div>
</template>

<script>
import blackBackground from '../blackBackground/blackBackground';
var T;

export default {
	data: function(){
		return {
			searchTxt: "",
			resultList: [],
			isShowDetailTable: false,
			headerTitle: [],
			contentList: [],
			contentListSource: [],
			selectOrderno: "",
			selectCustname: "",
			selectOrdernoNum: "",
			serialno: "",
			picurl: "",
			isblackBackground: false,
			backgroundList: [],
			isShowPic: false,
			isdeliveryTime: false,
			season: ""
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
		// 获取表单信息
		godetail: function(arg, orderno, custname, selectOrdernoNum, picurl, season) {
			this.$http.get(this.seieiURL + "/estapi/api/Mrpplana?serialno=" + encodeURIComponent(arg)).then(resp => {
				this.headerTitle = resp.body;
				this.$nextTick(() => {
					this.$refs.headerBarHook.getElementsByClassName("active")[0].className = "hearderItem";
					this.$refs.headerBarHook.getElementsByClassName("hearderItem")[0].className += " active";
				});
				this.$http.get(this.seieiURL + "/estapi/api/Mrpplana?serialno1=" + encodeURIComponent(arg)).then(resp1 => {
					this.isShowDetailTable = true;
					this.picurl = picurl;
					this.season = season;
					this.serialno = arg;
					this.selectOrderno = orderno;
					this.selectOrdernoNum = selectOrdernoNum;
					this.resp
					this.contentList = resp1.body;
					this.contentListSource = resp1.body;
					this.$http.get(this.seieiURL + "/estapi/api/WorkOrder?sname=" + encodeURIComponent(custname)).then(resp2 => {
						this.selectCustname = resp2.body[0].engcode;

        				// 获取货期
        				this.$http.get(this.seieiURL + "/estapi/api/WorkOrder?orderno=" + encodeURIComponent(orderno)).then(resp3 => {
        					this.backgroundList = resp3.body;
        				}, response3 => {
        					console.log("发送失败" + response3.status + "," + response3.statusText);
        				})
					}, response2 => {
						console.log("发送失败" + response2.status + "," + response2.statusText);
					})
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
		},
		// 点击进入制单细数
		goSerialnoDetail: function(arg, arg1, arg2, arg3) {
			this.$router.push({name: 'serialnoDetail', params: {serialno: arg, orderno: arg1, custname: arg2, ordernonum: arg3}});
		},
		// 显示货期
		showBackground: function() {
			this.isdeliveryTime = true;
			this.isblackBackground = true;
		},
		showPic: function() {
			this.isShowPic = true;
			this.isblackBackground = true;
		},
		hideBackground: function() {
			this.isdeliveryTime = false;
			this.isShowPic = false;
			this.isblackBackground = false;
		}
	},
	computed: {
		needNum: function() {
			var Num = 0;
			if (this.contentList.length > 0) {
				this.contentList.forEach((item) => {
					Num += Number(String(item.PLANQTY).split(".")[0]);
				})
			}
			return Num;
		},
		buyNum: function() {
			var Num = 0;
			if (this.contentList.length > 0) {
				this.contentList.forEach((item) => {
					Num += Number(String(item.F15).split(".")[0]);
				})
			}
			return Num;
		},
		saveNum: function() {
			var Num = 0;
			if (this.contentList.length > 0) {
				this.contentList.forEach((item) => {
					Num += Number(String(item.F17).split(".")[0]);
				})
			}
			return Num;
		},
		takeNum: function() {
			var Num = 0;
			if (this.contentList.length > 0) {
				this.contentList.forEach((item) => {
					Num += Number(String(item.F19).split(".")[0]);
				})
			}
			return Num;
		},
		tuneOutNum: function() {
			var Num = 0;
			if (this.contentList.length > 0) {
				this.contentList.forEach((item) => {
					Num += Number(String(item.F08).split(".")[0]);
				})
			}
			return Num;
		},
		tuneInNum: function() {
			var Num = 0;
			if (this.contentList.length > 0) {
				this.contentList.forEach((item) => {
					Num += Number(String(item.F09).split(".")[0]);
				})
			}
			return Num;
		}
	},
	components: {
        'v-blackBackground': blackBackground
	}
}
</script>

<style scoped>
.sourcePlan-component {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling : touch;
	background-color: #f5f5f5;
	z-index: 1;
}
.weui-search-bar {
	position: fixed;
	top: 48px;
	width: 100%
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
.headerBarWrapper {
	position: fixed;
	top: 92px;
	width: 100%;
}
.headerBarWrapper .header-Title {
	height: 80px;
    line-height: 80px;
	padding-left: 1em;
    background-color: #f5f5f5;
    overflow: hidden;
}
.headerBarWrapper .header-Title span{
	padding-left: 5px;
	vertical-align: top
}
.headerBarWrapper .header-Title a {
	vertical-align: top;
}
.thumbImg {
	margin-top: 3px;
	width: 75px;
	height: 75px;
}
.headerBar {
	font-size: 0;
    white-space: nowrap;
    overflow: scroll;
    -webkit-overflow-scrolling : touch;
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
    line-height: 32px;
}
.hearderItem.active {
	background-color: #fff;
}
.contentWrapper {
	margin-top: 85px;
	margin-bottom: 90px;
	padding: 120px 0 20px 0;
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
    font-size: 12px;
}
.contentItem .title {
	display: inline-block;
	min-width: 7em;
	color: #169fe6
}
.footbar {
	position: fixed;
    bottom: 0;
    width: 100%;
    line-height: 30px;
    border-top: 1px solid #ddd;
    background-color: #fff;
    color: #444;
}
.footbar div{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    font-size: 14px;
    background-color: #7ec4dd;
}
.deliveryTime {
	position: fixed;
	top: 45%;
	box-sizing: border-box;
	padding: 1em;
	width: 80%;
	margin-left: 10%;
	font-size: 12px;
	line-height: 1.8em;
	color: #444;
	background-color: #fff;
	border-radius: 4px;
	z-index: 10000
}
.pic {
	position: fixed;
	top: 45%;
	width: 100%;
	margin-top: -50%;
	text-align: center;
	z-index: 10000
}
.pic img{
	width: 100%;
}
.stayBottom {
	display: inline-block;
    position: absolute;
    top: 55px;
    left: 92px;
    line-height: 1;
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
</style>