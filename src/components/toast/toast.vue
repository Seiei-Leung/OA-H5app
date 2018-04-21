<template>
	<div class="toast-component">
		<div class="text">
			{{text}}
		</div>
	</div>
</template>

<script>
export default {
	props: ['text']
}
</script>

<style scoped>
.toast-component {
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	-webkit-justify-content: center;
	position: fixed;
	top: 45%;
	left: 0;
	right: 0;
}
.text {
	padding: 1em;
	text-align: center;
	color: #f5f5f5;
	background-color: rgba(0,0,0,.6);
	border-radius: 10px;
}
</style>