<template>
  <div class="clientCheck-component">
    <div class="top_title">
      <a href="javascript:void(0);" @click="goBack"><i class="icon-chevron-left"></i><span>返回</span></a>
      <div>产品型号对照表</div>
    </div>
    <div class="clientList">
      <a href="http://www.etscn.com.cn:38080/oa/kq/img/anta1.png" class="item">安踏（成人装）号型对照表</a>
      <a href="http://www.etscn.com.cn:38080/oa/kq/img/anta2.png" class="item">安踏（童装）号型对照表</a>
      <a href="http://www.etscn.com.cn:38080/oa/kq/img/fila1.png" class="item">Fila（成人装）号型对照表</a>
      <a href="http://www.etscn.com.cn:38080/oa/kq/img/fila2.png" class="item">Fila（童装）号型对照表</a>
      <a href="http://www.etscn.com.cn:38080/oa/kq/img/semir.png" class="item">森马（成人装）号型对照表</a>
      <a href="http://www.etscn.com.cn:38080/oa/kq/img/mb.png" class="item">美特斯邦威（成人装）号型对照表</a>
    </div>
  </div>
</template>
<script>
export default {

}

</script>
<style scoped>
.clientCheck-component {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: #f5f5f5;
  z-index: 1;
}
.clientList {
	margin-top: 70px;
}
.clientList a {
	display: block;
	margin: auto;
	margin-top: 10px;
	width: 90%;
	text-align: center;
	font-size: 16px;
	line-height: 3em;
	background-color: #fff;
	border-radius: 5px;
}
.clientList a:hover {
	background-color: #eee
}
</style>
