<template>
	<div class="shoppingList-component">
    	<!-- 详细表格 -->
    	<div class="top_title" style="position: fixed;top: 0;width: 100%">
    	    <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i>返回</a>
    	    <div>{{titleName}}</div>
    	</div>
    	<div class="workdetail-page">
            <!-- 动态绑定要是用 v-bind ,不然绑定的是整个字符串，下面 ref 就是个例子 -->
    	    <div class="table-item" v-for="(content, index1) in contentList" v-bind:ref="'table-item' + index1" @click="goMyApply(billnoList[index1])">
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
                <div class="passbtn-wrapper" v-if="istodoList">
                    <div class="passbtn" @click="approval(serialnoList[index1], billnoList[index1], index1, $event)">
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
        <!-- toast -->
        <v-toast v-bind:text="toast" v-show="isToast"></v-toast>
	</div>
</template>

<script>
import loading from '../loading/loading';
import toast from '../toast/toast';

export default {
    data: function() {
        return {
            titleName: this.$route.params.titlename,
            className: this.$route.params.classname,
            where: this.$route.params.where,
            contentList: [],
            nameList: [],
            serialnoList: [],
            billnoList: [],
            isLoading: false,
            toast: '',
            isToast: false,
            istodoList: this.$route.params.where == 'todolist',
            ismyApply: this.$route.params.where == 'myapply'
        };
    },
    created: function() {
        this.isLoading = true;
        // 提取数据
        // 注释代码用于开发环境或实际项目接口
        // /api/workingtable
        // "http://59.33.36.124:38080/estapi/api/FlowApprove/GetToDoWorkDetailSmart?actorid3=fang&classname3=" + this.className
        // /api/myApplyList
        // "http://59.33.36.124:38080/estapi/api/FlowApprove/GetMyApplyDetailSmart?actorid2=fang&classname2=" + this.className
        let url;
        if (this.istodoList) {
            url = "http://59.33.36.124:38080/estapi/api/FlowApprove/GetToDoWorkMasterDetailSmart?actorid4=andylao&classname4=";
        } else if (this.ismyApply) {
            url = "http://59.33.36.124:38080/estapi/api/FlowApprove/GetMyApplyDetailSmart?actorid2=fang&classname2=";
        }
        this.$http.get(url + this.className).then(resp=>{
          let contentList = []; // 内容列表
          let nameList = []; // 名称列表
          let detailsList = []; // 附表内容列表
          let detailsNameList = []; // 附表名字列表
          // 循环工作单列表 => resp.body.data.forEach(....)

          resp.body = resp.body.slice(0, 51);
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
            for (let i=1; i<(countNum+1); i++) {
              forContentList.push(item['feild' + i]);
            }
            // 测试是否含有副表
            if (item['details'].length > 0) {
                var 
                    detailsData = item['details'],
                    detailsDataNum = detailsData.length;
                for (let n=1; n<(detailsDataNum+1); n++) {
                    var 
                        fordetailsList = [];
                    for (let m=1; m<(Number(detailsData[n].fieldcnt) + 1); m++) {
                        fordetailsList.push(detailsData[n]['field' + m]);
                    }
                }

            }
            detailsList.push(fordetailsList);
            contentList.push(forContentList);

            // 制作 Serialno 列表
            this.serialnoList.push(item.serialno);

            // 制作 billno 列表
            this.billnoList.push(item.billno);
          });
          // 赋值
          this.contentList = contentList;
          this.nameList = nameList;
          this.isLoading = false;
        }, response => {
            console.log("发送失败"+response.status+","+response.statusText);
        });
    },
    methods: {
        // 审批
        approval: function(serialno, billno, index, event) {
            event.target.innerText = "审批中";
            // 获取实质要改变背景色的元素
            if (event.target.tagName.toLowerCase() == 'div') {
                event.target.style.backgroundColor = '#d6dde0';
            } else {
                event.target.parentNode.style.backgroundColor = '#d6dde0';
            }
            this.$http.get("http://59.33.36.124:38080/estapi/api/FlowApprove/GetApproveFlow?userCode=fang&serialno=" + serialno + "&formName=" + this.className + "&billNo=" + billno).then(resp => {
                this.toast = '审批成功';
                this.isToast = true;
                setTimeout(() => {
                    this.isToast = false;
                    this.$refs['table-item' + index][0].style.display = 'none';
                }, 500);
            }, response => {
                console.log("发送失败"+response.status+","+response.statusText);
            })
        },
        goMyApply: function(arg) {
            if (this.ismyApply) {
                this.$router.push({name: 'myApplyDetail', params: {billno: arg}})
            }
        }
    },
    components: {
        'v-loading': loading,
        'v-toast': toast
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
.workdetail-page li span:first-child {
    display: inline-block;
    min-width: 7em;
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
    padding-bottom: 1em;
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
    border-top: 1px dashed #e5e5e5;
}
.passbtn-wrapper {
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    padding-top: 1em;
    border-top: 1px dashed #e5e5e5;
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
