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
	top: 45%;
	width: 100%;
	text-align: center;
	z-index: 1000000;
}
.loading-wrapper img {
	width: 1rem
}
</style>