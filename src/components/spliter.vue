<template>
	<div class="spliter" :style="[{'background-color': color}]"></div>
</template>

<script>
	export default {
		name: "spliter",
		props: {
			color: { type: String, default: '#E4E4E4' }
		},
	}
</script>

<style scoped>
	.spliter {
		display: flex;
		position: relative;
		width: 100%;
		height: 2rpx;
	}
</style>
