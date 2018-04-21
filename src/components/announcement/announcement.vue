<template>
	<div class="announcement-component">
    <div class="inform_page">
        <!-- 顶部搜索栏 -->
        <div class="topsearch_container" style="">
            <div class="top_title">
                <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i>返回</a>
                <div>通知公告</div>
            </div>
            <div class="topsearch-wrapper">
            	<div class="topsearch">
                	<div class="select">
                    	<p @click="showSelect">{{selectText}} <i class="icon-play"></i></p>
                    	<ul v-show="selectIsShow">
                            <li v-for="item in selectList" @click="selectItem(item)">{{item}}</li>
                	    </ul>
                	</div>
                	<div class="border"></div>
                	<input type="text" name="">
                	<div class="border" style="margin-left: 85%;"></div>
                	<button>
                		<i class="icon-search" style="color:#999"></i>
                	</button>
                	<div style="clear: both"></div>
            	</div>
            	<a class="show_modal" href="javascript:void(0);" @click="showblackgreen"><i class="icon-more-horizontal"></i></a>
            	<div style="clear: both"></div>
            </div>
        </div>
        <!-- 列表 -->
        <div class="inform_list">
            <a class="inform_item btn" href="javascript:void(0);" @click='goDetail' v-on:touchstart.self='touchS($event)' v-on:touchend.self='touchE($event)'>
                <div class="title">
                    <p>标题</p>
                </div>
                <div class="time">
                    <p>2017-11-21 08:50:23</p>
                </div>
                <div class="detail">
                    <div style="float:left">梁智承</div>
                    <div style="float: right;"><i class="icon-eye">1</i><i class="icon-bubbles">2</i><i class="icon-thumbs-up">3</i></div>
                </div>
            </a>
            <a class="inform_item btn" href="./article.html">
                <div class="title">
                    <p>标题</p>
                </div>
                <div class="time">
                    <p>2017-11-21 08:50:23</p>
                </div>
                <div class="detail">
                    <div style="float:left">梁智承</div>
                    <div style="float: right;"><i class="icon-eye">1</i><i class="icon-bubbles">2</i><i class="icon-thumbs-up">3</i></div>
                </div>
            </a>
        </div>
        <!-- 底部发布按钮 -->
        <a href="./issue.html" class="issue">
            <i class="icon-edit"></i> 发布动态</a>
        </a>
        <!-- 模拟框 -->
        <div class="blackscreen" v-show="blackscreenIsShow">
            <ul class="modalbox">
                <li class="btn">已发布的</li>
                <li class="btn">草稿</li>
                <li class="btn hid_modal" @click="hideblackscreen">取消</li>
            </ul>
        </div>
    </div>
	</div>
</template>

<script>
export default{
    data: function() {
        return {
            blackscreenIsShow: false,
            selectIsShow: false,
            selectText: '公司动态',
            selectList: ['公司动态', '通知公告', '员工动态', '员工关怀', '员工祝福', '私人信箱']
        };
    },
    methods: {
        showSelect: function() {
            this.selectIsShow = !this.selectIsShow;
        },
        showblackgreen: function() {
            this.blackscreenIsShow = true;
        },
        hideblackscreen: function() {
            this.blackscreenIsShow = false;
        },
        selectItem: function(item) {
            this.selectText = item;
            this.selectIsShow = false;
        },
        goDetail: function() {
            this.$router.push({name: 'announcementDetail'});
        }
    }
}
</script>

<style>
.announcement-component {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
    overflow: scroll;
	background-color: #f5f5f5;
	z-index: 1;
}
.topsearch_container {
	position: fixed;
	top:0;
	left: 0;
	right: 0;
    background-color: #EFEFF4;
    color: #444;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.topsearch-wrapper {
	padding:10px 8px;
}
.topsearch {
	float: left;
	position: relative;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    width: 86%;
}
.inform_page .topsearch_container .select {
	display: inline-block;
    float: left;
	width: 30%;
    position: relative;
    height: 26px;
    background-color: #fff;
    outline: none;
    border: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    color: #444;
    text-align: center;
}
.inform_page .topsearch_container .select p{
    line-height: 26px;
    font-size: 0.9em
}
.topsearch-wrapper .border{
	width: 1px;
    height: 18px;
    margin-left: 30%;
    margin-top: 4px;
    background-color: #e1e1e1;
    position: absolute;
}
.topsearch-wrapper input{
	display: inline-block;
    float: left;
    border: none;
    height: 26px;
	box-sizing: border-box;
    padding-left: 0.5em;
    width: 55%;
    background-color: #fff;
    outline: none;
    border-radius: 0;
}
.topsearch-wrapper button{
	width: 15%;
	display: inline-block;
    float: left;
    border: none;
    height: 26px;
    background-color: #fff;
    outline: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
.topsearch-wrapper .show_modal{
	display:inline-block;
	float: left;
	width: 13%;
	line-height: 26px;
	text-align: center;
	font-size: 1.5em;
	color:#666
}
.topsearch-wrapper ul {
	position: absolute;
    top: 30px;
    z-index: 100;
    background-color: #fff;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    text-align: center;
    line-height: 26px;
}
.inform_list {
    margin-top: 108px;
    margin-bottom: 6em
}
.inform_page .inform_list .inform_item {
    display: block;
    margin: 0.5rem 0;
    background-color: #fff;
    padding: 1em 1em 0.5em 1em;
    color: #444;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.inform_page .inform_list .inform_item .title {
    font-size: 1.8em;
}
.inform_page .inform_list .inform_item .time {
    padding-bottom: 1em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.inform_page .inform_list .inform_item .detail {
    padding-top: .5em;
    overflow: hidden;
}
.inform_page .inform_list .inform_item .detail i {
    margin-right: 1em;
    font-size: 0.8em;
}
.inform_page .issue {
    color: #444;
    outline: none;
    border: none;
    display: block;
    background-color: #fff;
    font-size: 1.5em;
    position: fixed;
    bottom: 0;
    width: 10rem;
    text-align: center;
    line-height: 2.5em;
    height: 2.5em;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.blackscreen {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .5);
}
.modalbox {
    position: absolute;
    bottom: 0;
    width: 10rem;
    border: 1px solid #eee;
    text-align: center;
    background-color: #EFEFF4;
    z-index: -10;
}
.modalbox li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    background-color: #fff;
    font-size: 1.5em;
    line-height: 2em;
}
.hid_modal {
    margin-top: 0.2em;
    border-bottom: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>