<template>
	<view class="container">
		<view  v-for="(selection,index) in SelectionList" :key="selection.id">
			<view class="item-container">
				<image class="icon" :src="selection.icon"></image>
				<text class="text">{{ selection.text }}</text>
			</view>
			<view class="spliter"></view>
		</view>
		<view class="spliter-bottom"></view>
		<view class="button">退出</view>
	</view>
</template>

<script>
	import { getStaticResource } from '@/common/util.js'
	
	export default {
		data() {
			return {
				SelectionList: [
					{ id:1, text:"消息提醒", icon:getStaticResource('set-notice') },
					{ id:2, text:"密码设置", icon: getStaticResource('set-password') },
					{ id:3, text:"软件详情", icon: getStaticResource('set-software') },
					{ id:4, text:"客服咨询", icon: getStaticResource('set-service') },
					{ id:5, text:"评价软件", icon: getStaticResource('set-review') },
					{ id:6, text:"隐私条例", icon: getStaticResource('set-privacy') },
				]
			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: 100vh;
		display: flex;
		background-color: #F6F6F6;
		flex-direction: column;
	}
	.item-container {
		width: 100%;
		height: 116rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: #FFFFFF;
	}
	.icon {
		padding: 0 36rpx 0 56rpx;
		height: 56rpx;
		width: 56rpx;
	}
	.text {
		color: #171717;
		font-size: 36rpx;
		line-height: 60rpx;
		font-weight: Medium;
	}
	.spliter {
		height: 6rpx;
		width: 100%;
		background-color: #F6F6F6;
	}
	.spliter-bottom {
		height: 20rpx;
		width: 100%;
		background-color: #F6F6F6;
	}
	.button {
		display: flex;
		height: 80rpx;
		background-color: #FFFFFF;
		justify-content: center;
		align-items: center;
		color: #171717;
		font-size: 36rpx;
		line-height: 60rpx;
		font-weight: Medium;
	}
</style>
