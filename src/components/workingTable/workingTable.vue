<template>
	<div class="shoppingList-component">
    	<!-- 详细表格 -->
    	<div class="top_title" style="position: fixed;top: 0;width: 100%">
    	    <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i>返回</a>
    	    <div>{{titleName}}</div>
    	</div>
    	<div class="workdetail-page">
    	    <div class="table-item" v-for="(content, index1) in contentList">
    	        <div class="main-table">
    	            <ul>
    	                <li v-for="(val, index2) in content">
    	                    <span>{{nameList[index1][index2]}}：</span>
    	                    <span style="color: #999;">{{val}}</span>
    	                </li>
    	            </ul>
    	        </div>
                <!-- 以下是副列表信息 -->
                <!--
                <div class="subtable-title">
    	            <span>采购详情</span>
    	        </div>
    	        <div class="subtable">
    	            <ul>
    	                <li>
    	                    <span>名称：</span>
    	                    <span>平车梭床</span>
    	                </li>
    	                <li>
    	                    <span>规格：</span>
    	                    <span>110-33650</span>
    	                </li>
    	            </ul>
    	        </div>
                -->
                <div class="passbtn-wrapper">
                    <div class="passbtn">
                        <span>审批</span>
                    </div>
                    <div class="passbtn">
                        <span>拒签</span>
                    </div>
                    <div class="passbtn">
                        <span>取回</span>
                    </div>
                </div>
    	    </div>
    	</div>
        <!-- loading 图 -->
        <v-loading v-show="isLoading"></v-loading>
	</div>
</template>

<script>
import loading from '../loading/loading';

export default {
    data: function() {
        return {
            titleName: this.$route.params.titlename,
            className: this.$route.params.classname,
            contentList: [],
            nameList: [],
            isLoading: false
        };
    },
    created: function() {
        this.isLoading = true;
        // 提取数据
        // 注释代码用于开发环境或实际项目接口
        // /api/workingtable
        // "http://192.168.1.213:38080/estapi/api/FlowApprove/GetToDoWorkDetailSmart?actorid3=fang&classname3=" + this.className
        this.$http.get("http://192.168.1.213:38080/estapi/api/FlowApprove/GetToDoWorkDetailSmart?actorid3=fang&classname3=" + this.className).then(resp=>{
          let contentList = []; // 内容列表
          let nameList = []; // 名称列表
          // 循环工作单列表 => resp.body.data.forEach(....)
          resp.body.forEach((item) => {
            // 制作名称列表
            let forNameList = []; // 名称
            item.fields.split(',').forEach((str) => {
              forNameList.push(str.split('-')[1]);
            });
            nameList.push(forNameList);

            // 制作内容列表
            let forContentList = [];
            let countNum = item.fieldcnt; // 表单中有多少行信息
            for (let i=1;i<(countNum+1);i++) {
              forContentList.push(item['feild' + i]);
            }
            contentList.push(forContentList);
          });
          // 赋值
          this.contentList = contentList;
          this.nameList = nameList;
          this.isLoading = false;
        }, response => {
            console.log("发送失败"+response.status+","+response.statusText);
        });
    },
    components: {
        'v-loading': loading
    }
}
</script>

<style>
.shoppingList-component {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
    overflow: scroll;
	background-color: #f5f5f5;
	z-index: 1;
}
.workdetail-page {
	margin-top: 55px
}
.workdetail-page .table-item {
	box-sizing: border-box;
    width: 9.5rem;
    margin: 0.3rem auto;
    padding: 1em;
    background-color: #fff;
    border-radius: 10px;
}
.workdetail-page .table-item .main-table {
    color: #169fe6;
}
.workdetail-page .subtable-title {
    font-size: 1.5em;
    margin: 0.2em 0 0.2em 0;
}
.workdetail-page .subtable {
    padding: 0.3em 0;
    border-bottom: 1px dashed #e5e5e5;
    border-top: 1px dashed #e5e5e5;
}
.workdetail-page .subtable {
    padding: 0.3em 0;
    border-bottom: 1px dashed #e5e5e5;
    border-top: 1px dashed #e5e5e5;
}
.passbtn-wrapper {
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    margin-top: 1em;
}
.workdetail-page .passbtn {
    width: 1.5rem;
    text-align: center;
    line-height: 1;
    font-size: 14px;
    padding: 0.5em;
    background-color: #169fe6;
    border-radius: 10px;
    color: #fff;
}
</style>
