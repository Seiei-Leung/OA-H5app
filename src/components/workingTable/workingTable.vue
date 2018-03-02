<template>
	<div class="shoppingList-component">
    	<!-- 详细表格 -->
    	<div class="top_title" style="position: fixed;top: 0;width: 100%">
    	    <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i>返回</a>
    	    <div>非生产采购单详情</div>
    	</div>
    	<div class="workdetail-page">
    	    <div class="table-item" v-for="table in tableList">
    	        <div class="main-table">
    	            <ul>
    	                <li v-for="(val, key, index) in table">
    	                    <span>{{key}}</span>
    	                    <span>{{val}}</span>
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
	</div>
</template>

<script>
export default {
    data: function() {
        return {
            classname: this.$route.params.classname,
            tableList: []
        };
    },
    created: function() {
        this.$http.get("http://192.168.1.213:38080/estapi/api/FlowApprove/GetToDoWorkDetailSmart?actorid3=fang&classname3=" + this.classname).then(resp=>{
            console.log(resp);
            this.tableList = resp.body.slice(0, 21);
        }, response => {  
            console.log("发送失败"+response.status+","+response.statusText);  
        });

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