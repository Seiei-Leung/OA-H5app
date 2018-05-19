<template>
	<div class="serialno-component">
		<div class="top_title">
    	    <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i><span>返回</span></a>
    	    <div>制单细数</div>
    	</div>
		<div class="contentWrapper">
			<div class="header-Title">
				{{orderno}} | {{custname}} | {{ordernonum}}
			</div>
			<div class="contentTable" ref="cssHook">
				<table class="table">
					<tr class="header bar">
						<th class="item title" class="colorTitleHook">
							颜色
						</th>
						<th v-for="item, index in titleHearder" class="item first">
							{{item}}
						</th>
						<th class="item">
							小计
						</th>
					</tr>
					<tr v-for="contents, index in contentList" class="contentRow">
						<td class="item title" v-bind:class="'Hook' + index">
							{{colorList[index]}}
						</td>
						<td v-for="item in contents" class="item first">
							{{item}}
						</td>
					</tr>
					<tr class="total bar">
						<td class="item title">
							总计
						</td>
						<td class="item" v-for="item in totalNums">
							{{item}}
						</td>
						<td class="item">
							{{totalNum}}
						</td>
					</tr>
				</table>
				<div class="copy">
					<div class="colorTitle copyitem">
						颜色
					</div>
					<div v-for="item, index in colorList" v-bind:class="'copy' + index" class="copyitem">
						{{item}}
					</div>
					<div class="totalTitle copyitem">
						总计
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
			serialno: this.$route.params.serialno,
			orderno: this.$route.params.orderno,
			custname: this.$route.params.custname,
			ordernonum: this.$route.params.ordernonum,
			titleHearder: [],
			contentList: [],
			colorList:[],
			totalNums: [],
			totalNum: "",
			isLoading: false
		};
	},
	created: function() {
		console.log(this.serialno);
		this.isLoading = true;
		this.$http.get(this.seieiURL + "/estapi/api/Ordersize?serialno=" + encodeURIComponent(this.serialno)).then(resp => {
			for (var i=1; i<16; i++) {
				if (resp.body[0]["size" + i]) {
					this.titleHearder.push(resp.body[0]["size" + i]);
				}
			}
        	this.$http.get(this.seieiURL + "/estapi/api/Ordercolor?serialno=" + encodeURIComponent(this.serialno)).then(resp => {
        			for (var j=0; j<resp.body.length; j++) {
        				var forContentList = [];
        				for (var i=1; i<(this.titleHearder.length+1); i++) {
        					forContentList.push(resp.body[j]["size" + i]);
        				}
        				forContentList.push(resp.body[j].total);
        				this.contentList.push(forContentList);
        				this.colorList.push(resp.body[j].color);
        			}
        			for (var i=0; i<this.titleHearder.length; i++) {
        				var num = 0;
        				for (var j=0; j<this.colorList.length; j++) {
        					num += Number(this.contentList[j][i]);
        				}
        				this.totalNums.push(num);
        			}
        			var num = 0;
        			for (var i=0; i<this.colorList.length; i++) {
        				num += this.contentList[i][this.contentList[i].length - 1];
        			}
        			this.totalNum = num;
        			this.isLoading = false;
        			this.$nextTick(function() {
        				console.log(this.$refs['cssHook'].getElementsByClassName("colorTitleHook")[0].offsetWidth);
        				this.$refs['cssHook'].getElementsByClassName("colorTitle")[0].style.width = this.$refs['cssHook'].getElementsByClassName("colorTitleHook")[0].offsetWidth + "px";
        				this.$refs['cssHook'].getElementsByClassName("colorTitle")[0].style.height = this.$refs['cssHook'].getElementsByClassName("colorTitleHook")[0].offsetHeight + "px";
        				this.$refs['cssHook'].getElementsByClassName("totalTitle")[0].style.width = this.$refs['cssHook'].getElementsByClassName("colorTitleHook")[0].offsetWidth + "px";
        				this.$refs['cssHook'].getElementsByClassName("totalTitle")[0].style.height = this.$refs['cssHook'].getElementsByClassName("colorTitleHook")[0].offsetHeight + "px";
        				for (var i=0; i<this.colorList.length; i++) {
        					this.$refs['cssHook'].getElementsByClassName("copy" + i)[0].style.width = this.$refs['cssHook'].getElementsByClassName('Hook' + i)[0].offsetWidth + "px";
        					this.$refs['cssHook'].getElementsByClassName("copy" + i)[0].style.height = this.$refs['cssHook'].getElementsByClassName('Hook' + i)[0].offsetHeight + "px";
        				}
        			})
        		}, response => {
        			console.log("发送失败" + response.status + "," + response.statusText);
        		});
		}, response => {
        	console.log("发送失败" + response.status + "," + response.statusText);
        });
	},
	components: {
		'v-loading': loading
	},
	beforeRouteEnter: function(to, from, next) {
		from.meta.keepAlive = true;
		console.log(from);
        setTimeout(function() {
            next();
        }, 1000);
	},
	beforeRouteLeave: function(to, from, next) {
		to.meta.keepAlive = true;
		console.log(to)
        setTimeout(function() {
            next();
        }, 1000);
	}
}
</script>

<style scoped>
.serialno-component {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
    overflow: scroll;
	background-color: #f5f5f5;
	z-index: 1;
}
.contentWrapper {
	margin-top: 48px;
}
.header-Title {
	padding-left: 1em;
	color: #444;
    line-height: 25px;
}
.contentTable {
	overflow: scroll;
}
.table {
	font-size: 12px;
	text-align: center;
	border-collapse:collapse;
}
.table .item {
	box-sizing: border-box;
	min-width: 70px;
	padding: 0.5em;
	border: 1px solid #ddd;
	background-color: #fff
}
.copy {
	position: absolute;
	top: 73px;
}
.copyitem {
	box-sizing: border-box;
	padding: 0.5em;
	text-align: center;
	background-color: #fff;
	border: 1px solid #ddd;
	border-bottom: none;
}
</style>