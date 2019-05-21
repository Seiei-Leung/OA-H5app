<template>
	<!-- 通讯录 -->
	<div class="addressBook-component">
    <div class="addressbook">
        <div class="weui-search-bar" id="searchBar" style="position: fixed;top: 48px;left: 0;right: 0;">
            <form class="weui-search-bar__form">
                <div class="weui-search-bar__box">
                    <i class="weui-icon-search"></i>
                    <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索" required="">
                    <a href="javascript:void(0);" class="weui-icon-clear" id="searchClear"></a>
                </div>
                <label class="weui-search-bar__label" id="searchText">
                    <i class="weui-icon-search"></i>
                    <span>搜索</span>
                </label>
            </form>
            <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
        </div>
        <div class="addressbook_list" style="padding-bottom: 44px;">
            <div class="addressbook_items" v-for="item in dataResource" @click="showDetail(item.name, item.code, item.mobilephone, item.imageurl)">
<!--                 <div class="addressbook_title" style="padding-left:0.5em;">
                    <p>A</p>
                </div> -->
                <div class="addressbook_item addressbook_item_first">
                    <img v-bind:src="seieiURL + '/pic/' + item.imageurl" v-if="item.imageurl">
                    <img src="./img/tab-profile-active.png" v-else>
                    <p>{{item.name}}（{{item.code}}）<br>电话：{{item.mobilephone}}</p>
                </div>
            </div>
        </div>
        <div v-show="isShowDetail" class="detailWrapper">
            <div class="imgWrapper">
                <img v-bind:src="detailImg">
            </div>
            <div>
                <span class="fontbold">姓名：</span><span>{{detailName}}（{{detailCode}}）</span>
            </div>
            <div>
                <span class="fontbold">电话：</span><a v-bind:href="'tel:' + detailPhoneNum">{{detailPhoneNum}}</a>
            </div>
        </div>
    </div>
    <!-- 黑色遮盖 图 -->
    <div @click="hideDetail">
        <v-blackBackground v-show="isShowDetail"></v-blackBackground>
    </div>
	</div>
</template>

<script>
import blackBackground from '../blackBackground/blackBackground';

export default{
    data: function() {
        return {
            dataResource: [],
            isShowDetail: false,
            detailImg: "",
            detailName: "",
            detailPhoneNum: "",
            detailCode: ""
        }
    },
    methods: {
        // 显示详情
        showDetail: function(name, code, mobilephone, imageurl) {
            this.detailName = name;
            this.detailCode = code;
            this.detailPhoneNum = mobilephone;
            this.detailImg = imageurl ? this.seieiURL + '/pic/' + imageurl : this.seieiURL + "/oa/1tvwarning/tab-profile-active.png";
            this.isShowDetail = true;
        },
        // 隐藏详情
        hideDetail: function() {
            this.isShowDetail = false;
        }
    },
    created: function() {
        this.$store.commit("showIndexComponents");
        this.$http.get(this.seieiURL + "/estapi/api/User/UsersList?a=通讯录").then(resp => {
            console.log(resp.body);
            this.dataResource = resp.body;
        })
    },
    components: {
        'v-blackBackground': blackBackground
    },
    // 路由离开时触发
    beforeRouteLeave (to, from, next) {
        this.$store.commit("hideIndexComponents");
        next();
    }
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
	margin-left: 0.5em;
	font-size: 1.2em
}
.detailWrapper {
    box-sizing: border-box;
    position: fixed;
    top: 45%;
    left: 10%;
    margin-top: -25%;
    padding: 0 1em;
    width: 80%;
    height: 40%;
    z-index: 100000;
    font-size: 18px;
    color: #444;
    border-radius: 4px;
    background-color: #fff;
}
.detailWrapper .imgWrapper{
    margin: -40px auto 1em auto;
    width: 80px;
    height: 80px;
    border-radius: 100%;
    background-color: #e5e5e5;
    overflow: hidden;
}
.detailWrapper .imgWrapper img {
    width: 100%;
    height: 100%
}
.detailWrapper a {
    text-decoration: underline;
}
.detailWrapper .fontbold {
    font-weight: bold;
}
</style>