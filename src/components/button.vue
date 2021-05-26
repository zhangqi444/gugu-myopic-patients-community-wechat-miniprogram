<template>
	<view class="container flex" :class="buttonClass" @click="click">
		<text class="text" :class="textClass">{{text}}</text>
	</view>
</template>

<script>
	export default {
		name: "button",
		props: {
			text: {
				type: String,
				default: ''
			},
			buttonClass: {
			    type: String,
			    default() {
			        return '';
			    }
			},
			textClass: {
			    type: String,
			    default() {
			        return '';
			    }
			},
		},
		methods: {
			click() {
				this.$emit('click');
			}
		}
	}
</script>

<style scoped>
	.container {
		align-items: center;
		justify-content: center;
		background-color: #23be52;
		padding-left: 6px;
		padding-right: 6px;
		padding-top: 1px;
		padding-bottom: 1px;
		border-radius: 15px;
	}
	.text {
		color: #FFFFFF;
		font-size: 12px;
		line-height: 17px;
	}
</style>
