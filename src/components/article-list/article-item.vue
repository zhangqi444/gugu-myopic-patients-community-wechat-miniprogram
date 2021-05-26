<template>
	<div class="container flex column" @click="click">
		<div class="body flex row">
			<div class="title-container flex column">
				<text class="title">{{ item.title }}</text>
				<div class="author flex row">
					<text class='author-info-text'>{{ author.fullTitle }}</text>
				</div>
			</div>
			<view v-if="item.cover" class="cover-container">
				<image :src="item.cover" class="cover" mode="aspectFill">
					<image v-if="item.video && item.video.vid" class="cover-image" :src="playIcon"></image>
				</image>
			</view>
		</div>
		
		<view class="footer-container" >
			<view class="tag-container">
				<tag class="tag" v-for="(tag, index) in item.tags" :key="tag._id" :text="tag.name"></tag>
			</view>
			<view class="impression flex row">
				<!-- <image class="impression-image collect" :src="collectIconSrc" @click.stop="handleClickCollect"></image> -->
<!-- 				<image class="impression-image more" src="../../static/more@3x.png"></image> -->
<!-- 				<button class="button share-button" plain="true" v-on:click.stop="share($event)" >
				</button> -->
			</view>
		</view>
	</div>
</template>

<script>
	import tag from "@/components/tag";
	import { format } from 'fecha';
	import { mapState } from 'vuex';
	import { AUTHOR_TYPE } from "@/common/constants";
	import { addCollectArticle } from "@/common/apis/collect";
	import { getStaticResource } from "@/common/util";
	import { parseAuthor } from "@/common/helpers/authorHelper";
	
	export default {
		components: { tag },
		props: {
			item: { type: Object, default: () => {} }
		},
		data() {
			return {};
		},
		computed: {
			...mapState({
				self: state => state.userStore.self,
			}),
			isCollected() {
				try {
					return this.item.self.collect.value || false;
				} catch(e) {
					return false;
				}
			},
			collectIconSrc() {
				return this.isCollected ? this.collectedIcon : this.collectIcon;
			},
			playIcon() {
				return getStaticResource('play');
			},
			collectIcon() {
				return getStaticResource('collect');
			},
			collectedIcon() {
				return getStaticResource('collect-selected');
			},
			author() {
				return parseAuthor(this.item);
			},
			updatedAtRelative() {
				return format(this.item.updatedAt, "YYYY-MM-DD");
			}
		},
		methods: {
			async handleClickCollect(event) {
				try {
					const result = await addCollectArticle(this.item._id, this.self._id, true);

					this.showCollectSuccessToast();
					// handle error
				} catch(e) {
					console.error(e);
				}
			},
			showCollectSuccessToast() {
				uni.showToast({
				    title: '收藏成功！',
					icon: 'success',
				    duration: 1000
				});
			},
			share(event) {
				if (event) {
					event.preventDefault()
				}
			},
			click() {
				this.$emit('click', this.item);
			}
		}
	}
</script>

<style scoped>
	.container {
		box-sizing: border-box;
		width: 100%;
		padding-left: 23px;
		padding-right: 20px;
		padding-bottom: 9px;
		padding-top: 18px;
		justify-content: space-between;
	}
	.cover-container {
		position: relative;
		width: 122px;
		height: 71px;
	}
	.cover {
		width: 122px;
		height: 71px;
		display: flex;
		flex: 1;
	}
	.cover-image {
		position: absolute;
		right: 47px;
		top: 0px;
		bottom: 0px;
		margin: auto;
		width: 26px;
		height: 26px;
	}
	.body {
		display: flex;
		position: relative;
		width: 100%;
	}
	.title-container {
		margin-right: 18px;
		margin-bottom: 6px;
		flex: 1;
		justify-content: space-between;
	}
	.title {
		font-size: 16px;
		color: #2E2E2E;
		height: 48px;
		line-height: 24px;
		margin-bottom: 9px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; /* number of lines to show */
		-webkit-box-orient: vertical;
	}
	.author {
		height: 17px;
		flex: 1;
		margin-right: 3px;
		align-items: flex-end;
		justify-content: flex-start;
	}
	.author-info-text {
		font-size: 12px;
		color: #939393;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; /* number of lines to show */
		-webkit-box-orient: vertical;
	}
	.author-info-signal{
		font-weight: 900;
		color: #939393;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; /* number of lines to show */
		-webkit-box-orient: vertical;
	}
	.footer-container {
		display: flex;
		height: 29px;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		overflow: hidden;
	}
	.tag-container {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		align-items: center;
		overflow: hidden;
		flex-shrink: 0;
	}
	.tag {
		margin-right: 11px;
	}
	.impression {
		justify-content: flex-end;
		align-items: center;
	}
	.impression-image {
		height: 29px;
	}
	.collect {
		width: 16px;
		height: 16px;
	}
	.more {
		width: 16px;
	}
	.button {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0px;
		border-width: 0px;
	}
	.share-button {
		margin-right: -5px;
		margin-left: 5px;
		padding: 4px;
		width: 24px;
	}
	.share {
		width: 14px;
	}
</style>
