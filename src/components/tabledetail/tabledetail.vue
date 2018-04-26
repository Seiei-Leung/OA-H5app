<template>
	<div class="tabledetail-component">
    	<!-- 详细表格 -->
    	<div class="top_title" style="position: fixed;top: 0;width: 100%">
    	    <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i><span>返回</span></a>
    	    <div>明细资料</div>
    	</div>
    	<div class="contentWrapper">
    	    <div v-for="(content, index1) in contentList" class="contentItem">
    	    	<div v-for="(item, index2) in content">
    	    		<span class="itemTitle">{{nameList[index1][index2]}}:</span><span>{{item}}</span>
    	    	</div>
    	    </div>
    	</div>
    	<v-loading v-show="isLoading"></v-loading>
	</div>
</template>

<script>
import loading from '../loading/loading';

export default {
	data: function() {
		return {
			nameList:[],
			contentList:[],
			isLoading: false
		};
	},
	created: function() {
		this.isLoading = true;
		var dataList = this.$store.state.tableDetailData;
		// 制作数组
		console.log(dataList);
		var 
			forNameList = [],
			forcontentList = [];
		dataList.forEach((item) => {
			forcontentList.push(item.splice(0, (item.length-1)));
			forNameList.push(item[item.length-1]);
		});
		this.nameList = forNameList;
		this.contentList = forcontentList;
		console.log(forNameList);
		console.log(forcontentList);
		this.isLoading = false;
	}
}
</script>

<style scope>
.tabledetail-component {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: scroll;
    background-color: #f5f5f5;
    z-index: 1;
}
.contentWrapper {
	margin-top: 50px
}
.contentItem {
	margin: 3px;
	padding: 0.5em;
	background-color: #fff;
	border-radius: 4px;
	color: #444;
}
.contentItem .itemTitle {
	display: inline-block;
	min-width: 7em;
	color: #169fe6;
}
</style>