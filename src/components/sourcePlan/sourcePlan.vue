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
            <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
        </div>
        <div class="resultList-wrapper">
        	<div class="resultItem" v-for="item in resultList">
        		<span>{{item.orderno}} </span>
        		<span> {{item.custname}}</span>
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
			resultList: []
		}
	},
	methods: {
		watchInput: function() {
			var that = this;
			clearTimeout(T);
			T = setTimeout(() => {
				var url = that.seieiURL + "/estapi/api/WorkOrder?keywords=" + that.searchTxt;
				that.$http.get(url).then(resp => {
					that.resultList = resp.body;
				}, response => {
					console.log("发送失败"+response.status+","+response.statusText);
				});
			}, 1500);
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
}
</style>