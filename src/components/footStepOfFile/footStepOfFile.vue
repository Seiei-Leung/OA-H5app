<template>
    <div id="footStepOfFile-component">
		<div class="top_title">
    	    <a href="javascript:void(0);" @click="goBack" v-if="isShowGoBack"><i class="icon-chevron-left"></i><span>返回</span></a>
    	    <div>文件交收查询</div>
    	</div>
        <!-- 奖分详情 -->
        <div class="contentWrapper" v-show="!(isShowDetailTable)">
            <div class="searchBar" style="display: flex;">
              <div class="item" style="border-right: 1px solid #eee;border-bottom: 1px solid #eee;">
                <input placeholder="制单号查找" v-on:input="watchSelectInput" v-model="selectOrderno" style="border-radios: 0;">
              </div>
              <div class="item" style="border-left: 1px solid #eee;border-bottom: 1px solid #eee;">
                <input placeholder="员工名查找" v-on:input="watchSelectInput" v-model="selectStaffTxt" style="border-radios: 0;">
              </div>
            </div>
            <div class="topBar">
              <div class="item" @click="showsTimePicker">
                起始 {{stimeTxt}}
                <i class="icon-chevron-down"></i>
              </div>
              <div class="item" @click="showeTimePicker">
                结束 {{etimeTxt}}
                <i class="icon-chevron-down"></i>
              </div>
              <div class="toolBtnBar">
                <div @click="sumbit" class="btnItem" style="background-color: #3BBF67;color: #fff;">点击查询</div>
                <div @click="clear" class="btnItem" style="background-color: #ccc;color: #444;">清空输入</div>
              </div>
            </div>
            <!-- 搜索结果表单号 -->
            <div style="margin-top: 178px;width: 100%;" ref="resultListwrapper">
       		    <div class="resultList-wrapper">
       			    <div v-for="(item, index) in resultList" v-bind:key="index">
       				    <div @click="godetail(item.orderno)" class="resultItem">
       					    <span>制单号：{{item.orderno}}</span><br/>
                    <span>客户：{{item.custname}} </span>
       				    </div>
       			    </div>
       		    </div>
    	      </div>
        </div>
		    <div class="contentWrapper" v-if="isShowDetailTable && contentList.length > 0">
          <div class="resultDetail">
            <div class="resultLeft">
              <img width="100%" v-bind:src="'http://www.etscn.com.cn:38080/pic/' + contentList[0].imageurl + '.jpg'" />
            </div>
            <div class="resultRight">
              <div>制单号：{{contentList[0].orderno}}</div>
              <div>客户：{{contentList[0].custname}}</div>
              <div>款号：{{contentList[0].styleno}}</div>
              <div>季节：{{contentList[0].season}}</div>
            </div>
          </div>
          <div v-for="(item, index) in contentList" v-bind:key="index" style="box-sizing: border-box;margin: auto;margin-top: 10px;padding: 10px;width: 95%;line-height: 1.5em;border-radius: 4px;background-color: #fff;border: 1px solid #ddd;">
            <div style="color: red;">
              接收人：{{item.receiver}}
            </div>
            <div>
              接收时间：{{item.receivetime ? item.receivetime.split("T")[0] : ""}} {{item.receivetime ? item.receivetime.split("T")[1].slice(0,5) : ""}}
            </div>
          </div>
		    </div>
        <awesome-picker
          ref="stimePicker"
          :type="'date'"
          :textTitle="timePicker.title"
          @confirm="stimePickerConfirm"
        ></awesome-picker>
        <awesome-picker
          ref="etimePicker"
          :type="'date'"
          :textTitle="timePicker.title"
          @confirm="etimePickerConfirm"
        ></awesome-picker>
        <!-- loading 图 -->
        <v-loading v-show="isLoading"></v-loading>
    </div>
</template>

<script>
import loading from '../loading/loading';
var T;
var now = new Date();
export default {
    data: function(){
        return {
            timePicker: {
                title: "选择日期"
            },
            stimeTxt: "",
            etimeTxt: "",
            selectOrderno: "",
            selectStaffTxt: "",
            isShowDetailTable: false,
            contentList:[],
            resultList:[],
            isLoading: false, // 是否显示缓冲图
            isShowGoBack: true,
        }
    },
    created: function() {
        var stimeTxt = this.formatTime(now.getFullYear() + "年" + (now.getMonth() + 1) + "月"  + now.getDate() + "日");
        this.stimeTxt = stimeTxt;
        this.etimeTxt = this.formatTime(now.getFullYear() + "年" + (new Date(this.addOneDay(stimeTxt)).getMonth() + 1) + "月" + new Date(this.addOneDay(stimeTxt)).getDate() + "日");
        if (location.href.split("?isShowGoBack=").length == 2) {
          this.isShowGoBack = false;
        }
    },
    methods: {
        sumbit: function() {
          this.reload();
        },
        clear: function() {
          this.selectOrderno = "";
          this.selectStaffTxt = "";
          var stimeTxt = this.formatTime(now.getFullYear() + "年" + (now.getMonth() + 1) + "月"  + now.getDate() + "日");
          this.stimeTxt = stimeTxt;
          this.etimeTxt = this.formatTime(now.getFullYear() + "年" + (new Date(this.addOneDay(stimeTxt)).getMonth() + 1) + "月" + new Date(this.addOneDay(stimeTxt)).getDate() + "日");
        },
        reload: function() {
          var that = this;
			    clearTimeout(T);
			    T = setTimeout(() => {
            that.isLoading = true;
				    var url = that.seieiURL + "/estapi/api/Integral/getFootStepOfFileByKeyWord?keyword=" + encodeURIComponent(that.selectOrderno) + "&userName=" + that.selectStaffTxt + "&stime=" + this.stimeTxt + "&etime=" + this.etimeTxt;
				    that.$http.get(url).then(resp => {
              that.isLoading = false;
					    that.resultList = resp.body;
              that.isShowDetailTable = false;
				    }, response => {
              that.isLoading = false;
					      console.log("发送失败"+response.status+","+response.statusText);
				    });
			    }, 1500);
        },
        watchSelectInput: function() {
            this.reload();
        },
        // 显示开始时间 Picker
        showsTimePicker: function() {
            this.$refs.stimePicker.show();
        },
        // 显示结束时间 Picker
        showeTimePicker: function() {
            this.$refs.etimePicker.show();
        },
        stimePickerConfirm: function(data) {
            this.stimeTxt = this.formatTime(data[0].value + data[1].value + data[2].value);
            this.reload();
        },
        etimePickerConfirm: function(data) {
            this.etimeTxt = this.formatTime(data[0].value + data[1].value + data[2].value);
            this.reload();
        },
        godetail: function(orderno) {
            var that = this;
            this.$http.get(this.seieiURL + "/estapi/api/Integral/getFootStepOfFile?orderno=" + encodeURIComponent(orderno)).then(
              resp => {
                that.contentList = resp.body;
                that.isShowDetailTable = true;
              }, response => {
				      	console.log("发送失败"+response.status+","+response.statusText);
			        });
        },
        goBack: function() {
          if (this.isShowDetailTable) {
            this.isShowDetailTable = false;
            return;
          }
          window.history.go(-1);
        }
    },
    components: {
      'v-loading': loading
    }
}
</script>

<style scoped>
.searchBar {
  box-sizing: border-box;
  position: fixed;
  top: 48px;
  left: 0;
  right: 0;
  height: 44px;
  z-index: 1;
  border-bottom: 1px solid #eee;
  font-size: 0;
}
.searchBar .item {
  box-sizing: border-box;
  display: inline-block;
  width: 50%;
  vertical-align: top;
}
.searchBar .item input {
  box-sizing: border-box;
  width: 100%;
  height: 43px;
  line-height: 43px;
  padding-left: 1em;
  font-size: 16px;
}
.contentWrapper {
  margin-top: 48px;
}
.topBar {
  position: fixed;
  flex-wrap: wrap;
  top: 93px;
  display: flex;
  width: 100%;
  justify-content: space-around;
  z-index: 1;
}
.topBar .item {
  box-sizing: border-box;
  flex-grow: 1;
  font-size: 16px;
  line-height: 2.5em;
  color: #444;
  background-color: #fff;
  border: 1px solid #eee;
  text-align: center;
  border-top: none;
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
.toolBtnBar {
  display: flex;
  width: 100%;
  background-color: #fff;
  justify-content: space-around;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
}
.toolBtnBar .btnItem {
  margin: 5px 0;
  padding: 5px 10px;
  border-radius: 4px;
}
.resultDetail {
  box-sizing: border-box;
  width: 100%;
  padding: 20px 0px;
  font-size: 0;
  background-color: #fff;
  border-bottom: #ddd solid 1px;
}
.resultDetail .resultLeft {
  display: inline-block;
  vertical-align: top;
  width: 40%;
}
.resultDetail .resultRight {   
  box-sizing: border-box; 
  padding-left: 1em;
  display: inline-block;
  width: 60%;
  font-size: 16px;
}
</style>