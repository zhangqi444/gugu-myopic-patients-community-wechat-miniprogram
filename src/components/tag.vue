<template>
	<view class="components-tag" :style="[tagStyle]" @click="click">
		<text class="components-tag-text" :style="[textStyle]">{{ text }}</text>
	</view>
</template>

<script>
	export default {
		name: "tag",
		props: {
			text: {
				type: String,
				default: ''
			},
			tagStyle: { type: Object, default: () => {} },
			textStyle: { type: Object, default: () => {} },
		},
		methods: {
			click() {
				this.$emit('click');
			}
		}
	}
</script>

<style scoped>
	.components-tag {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
		border-color: #72CE8B;
		border-width: 2rpx;
		padding: 2rpx 12rpx;
		border-radius: 30rpx;
		border-style: solid;
	}
	.components-tag-text {
		color: #72CE8B;
		font-size: 24rpx;
		line-height: 34rpx;
	}
</style>
