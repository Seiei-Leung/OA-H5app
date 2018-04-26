<template>
	<!-- 通讯录 -->
	<div class="addressBook-component">
    <div class="addressbook">
        <div class="weui-search-bar" id="searchBar">
            <form class="weui-search-bar__form">
                <div class="weui-search-bar__box">
                    <i class="weui-icon-search"></i>
                    <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索" required="">
                    <a href="javascript:" class="weui-icon-clear" id="searchClear"></a>
                </div>
                <label class="weui-search-bar__label" id="searchText">
                    <i class="weui-icon-search"></i>
                    <span>搜索</span>
                </label>
            </form>
            <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
        </div>
        <div class="addressbook_list">
            <div class="addressbook_items">
                <div class="addressbook_title" style="padding-left:0.5em;">
                    <p>A</p>
                </div>
                <div class="addressbook_item addressbook_item_first">
                    <img src="img/icon_37.png">
                    <p>阿凡达</p>
                </div>
                <div class="addressbook_item">
                    <img src="img/icon_37.png">
                    <p>阿凡达</p>
                </div>
                <div class="addressbook_item">
                    <img src="img/icon_37.png">
                    <p>阿凡达</p>
                </div>
                <div class="addressbook_title" style="padding-left:0.5em;">
                    <p>L</p>
                </div>
                <div class="addressbook_item addressbook_item_first">
                    <img src="img/icon_37.png">
                    <p>梁智承</p>
                </div>
                <div class="addressbook_item">
                    <img src="img/icon_37.png">
                    <p>梁智承</p>
                </div>
                <div class="addressbook_item">
                    <img src="img/icon_37.png">
                    <p>梁智承</p>
                </div>
            </div>
        </div>
    </div>
	</div>
</template>

<script>
export default{

}
</script>

<style scoped>
.addressbook{
    margin-top: 48px;
}
#searchText {
	transform-origin: 0px 0px 0px;
	opacity: 1;
	transform: scale(1, 1);
}
.addressbook_item {
	overflow: hidden;
	background-color: #fff;
	border-bottom: 1px solid rgba(0,0,0,.1);
}
.addressbook_item_first {
	border-top: 1px solid rgba(0,0,0,.1);
}
.addressbook_item img{
	float:left;
	width: 1.5rem;
	height: 1.5rem;
}
.addressbook_item p{
	float:left;
	line-height: 1.5rem;
	margin-left: 0.5em;
	font-size: 1.2em
}
</style>