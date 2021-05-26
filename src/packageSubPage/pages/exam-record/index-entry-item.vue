<template>
	<div class="entry" @click="handleClickNavigator">
		<image class="entry-icon" :src="iconUrl"></image>
		<div class="entry-item">
			<h1 class="entry-title">{{ title }}</h1>
			<h2 class="entry-subtitle">{{ subTitle }}</h2>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'index-entry-item',
		props: {
			title: { type: String, default: '' },
			subTitle: { type: String, default: '' },
			iconUrl: { type: String, default: '' },
			navUrl: { type: String, default: '' },
		},
		methods: {
			handleClickNavigator() {
				uni.navigateTo({ url: this.navUrl });
			}
		}
	};
</script>

<style scoped>
	.entry {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex: 1;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 26rpx 20rpx;
		width: 282rpx;
	}

	.entry-icon {
		height: 126rpx;
		width: 126rpx;
		margin-right: 20rpx;
	}

	.entry-title {
		margin-bottom: 12rpx;
		color: #2E2E2E;
		font-size: 32rpx;
		font-weight: bold;
		line-height: 48rpx;
	}

	.entry-subtitle {
		color: #939393;
		font-size: 20rpx;
		line-height: 30rpx;
	}
</style>
