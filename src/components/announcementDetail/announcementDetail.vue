<template>
	<div class="announcementDetail-component">	
    <div class="article_page">
        <div class="top_title">
            <a href="javascript:void(0);" @click='goBack'><i class="icon-chevron-left"></i><span>返回</span></a>
            <div>公告详情</div>
        </div>
        <div class="article">
            <h1>
                标题
            </h1>
            <div class="message">
                <span>2017-11-21</span>
                <span>15:46</span>
                <span>梁智承</span>
            </div>
            <div class="content">
                <p>
                    内容内容内容内容内容内容内容内容内容内容内容内容内容
                </p>
            </div>
            <div class="footer">
                <a href="javascript:void(0);"><i class="icon-chevron-left"></i>上一篇</a>
                <a href="javascript:void(0);">下一篇<i class="icon-chevron-right"></i></a>
            </div>
        </div>
        <div class="reply_num">
            <p>回复（<span>3</span>）</p>
        </div>
        <div class="reply_list">
            <div  class="reply_items">
                <div class="favicon">
                    <img src="img/icon_37.png">
                </div>
                <div class="content">
                    <p style="color:#444;">梁智承</p>
                    <p>评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容</p>
                    <a href="javascript:void(0);" style="color: red">删除</a>
                </div>
            </div>
            <div  class="reply_items">
                <div class="favicon">
                    <img src="img/icon_37.png">
                </div>
                <div class="content">
                    <p style="color:#444;">梁智承</p>
                    <p>评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容</p>
                    <a href="javascript:void(0);" style="color: red">删除</a>
                </div>
            </div>
            <div  class="reply_items">
                <div class="favicon">
                    <img src="img/icon_37.png">
                </div>
                <div class="content">
                    <p style="color:#444;">梁智承</p>
                    <p>评论内容</p>
                    <a href="javascript:void(0);" style="color: red">删除</a>
                </div>
            </div>
        </div>
        <div class="reply_input">
            <input type="text" name="">
            <button>发 表</button>
        </div>
    </div>
	</div>
</template>

<script>
export default {

}
</script>

<style>
.announcementDetail-component {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
    overflow: scroll;
	background-color: #f5f5f5;
	z-index: 1;
}
.article_page .article {
    padding: 1em;
    background-color: #fff;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
.article_page h1 {
    font-size: 1.5em;
    line-height: 2em;
}
.article_page .message {
    color: #999;
}
.article_page .message span:first-child {
    margin-left: 0em;
}
.article_page .message span {
    margin: .3em;
    line-height: 1em;
}
.article .content {
    margin: 1.5em 0em;
}
.article .footer {
    overflow: hidden;
    margin-bottom: 0.5em;
}
.article .footer a:first-child {
    float: left;
}
.article .footer a {
    float: right;
    color: #999;
}
.article_page .reply_num {
    padding: 0.8em;
    color: #666;
}
.article_page .reply_list {
    background-color: #fff;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3rem;
}
.article_page .reply_list .reply_items {
    padding: 1em;
    overflow: hidden;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.article_page .reply_items .favicon {
    float: left;
}
.article_page .reply_items .favicon img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 10px;
}
.article_page .reply_items .content {
    float: left;
    padding-left: 1em;
    width: 7rem;
}
.article_page .reply_input {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1em;
    background-color: #e4e4e4;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.article_page .reply_input input {
    box-sizing: border-box;
    height: 2em;
    width: 7rem;
    border-radius: 5px;
    padding-left: 1em;
}
.article_page .reply_input button {
    margin-left: 1em;
    padding: 0.4em 1em;
    background-color: #f5f5f5;
    border-radius: 5px;
}
</style>