<template>
	<div class="container" @click="click">
		<div class="body">
			<text class="title">{{ item.title }}</text>
			<text class="content">{{ item.description }}</text>
			<text class="footer-text">{{ item.completeCount }} 人参与｜共 {{ item.content.length }} 问｜耗时 {{ item.estTime/60 }} 分钟 </text>
		</div>
		<view class="cover-container">
			<image :src="item.cover" class="cover flex flex-one" />
		</view>
	</div>
</template>

<script>	
	export default {
		props: {
			item: { type: Object, default: () => {} }
		},
		data() {
			return { };
		},
		methods: {
			click() {
				this.$emit('click', this.item);
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding-left: 18px;
		padding-right: 18px;
		padding-bottom: 12px;
		padding-top: 16px;
		justify-content: space-between;
		background-color: #FFFFFF;
		flex-direction: row;
	}
	.cover-container {
		position: relative;
	}
	.cover {
		border-radius: 5%;
		width: 100px;
		height: 100px;
	}
	.body {
		display: flex;
		position: relative;
		flex-direction: column;
		width: 100%;
		margin-right: 9px;
	}
	.title {
		font-size: 18px;
		color: #171717;
		line-height: 24px;
		margin-bottom: 9px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; /* number of lines to show */
		-webkit-box-orient: vertical;
	}
	.content {
		font-size: 14px;
		color: #747474;
		min-height: 36px;
		line-height: 22px;
		margin-bottom: 9px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; /* number of lines to show */
		-webkit-box-orient: vertical;
	}
	.footer-text {
		font-size: 12px;
		color: #BFBFBF;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; /* number of lines to show */
		-webkit-box-orient: vertical;
	}
</style>
