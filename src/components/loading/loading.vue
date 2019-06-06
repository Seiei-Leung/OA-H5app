<template>
	<div class="loading-component">
		<div class="loading-wrapper">
			<img src="../../../static/img/loading.jpg">
		</div>	
	</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.loading-wrapper {
	position: fixed;
	top: 0;
	bottom: 0;
	width: 100%;
	padding-top: 40%;
	text-align: center;
	z-index: 1000000;
	background-color: rgba(0,0,0,0.2);	
}
.loading-wrapper img {
	width: 1rem
}
</style>