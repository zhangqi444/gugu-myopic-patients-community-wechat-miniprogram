<template>
	<div class="container">
		<div @click="click">
			<div class="title-container">
				<text class="title">{{ item.title }}</text>
				<div class="header-container">
					<image class="author-info-avatar" :src="author.avatar" />
					<text class='author-info-text'>{{ author.fullTitle }}</text>
					<text class="updated-at">{{ `${updatedAtRelative}`+` 回答` }}</text>
				</div>
			</div>
			<parser class="content" :html="content" />
		</div>
		
		<impressionBarPost :item="item" :imageStyle="impressionImageStyle"
			:containerStyle="impressionBarContainerStyle" :buttonStyle="impressionButtonStyle" />
	</div>
</template>

<script>
	import { format } from 'fecha';
	import { mapState } from 'vuex';
	import { getStaticResource } from "@/common/util";
	import { parseAuthor } from "@/common/helpers/authorHelper";
	import impressionBarPost from "@/components/impression/impression-bar-post"
	import parser from "@/components/parser"
	import { PAGES } from '@/common/constants';
	
	export default {
		components: { impressionBarPost, parser },
		data() {
			return {
				impressionBarContainerStyle: {
					"display": "flex",
					"flex-direction": "row",
					"justify-content": "space-between",
					"width": "100%",
					"position": "unset",
					"border": "0rpx",
					"padding": "32rpx 0 34rpx"
				},
				impressionButtonStyle: {
					"border-width": "2rpx",
					height: "58rpx",
					width: "144rpx",
					"border-color": "#F5F5F5"
				},
				impressionImageStyle: {
					width: "16px",
					height: "16px"
				}
			};
		},
		props: {
			item: { type: Object, default: () => {} },
		},
		computed: {
			...mapState({
				self: state => state.userStore.self,
			}),
			author() {
				return parseAuthor(this.item);
			},
			updatedAtRelative() {
				return this.item && this.item.updatedAt ? format(this.item.updatedAt, "YYYY-MM-DD") : '';
			},
			content() {
				let result = '';
				if(this.item && this.item.content) {
					if(this.item.content.length > 60) {
						result = this.item.content.substring(0, 60) + '...';
					} else {
						result = this.item.content;
					}
				}
				return result;
			}
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
		width: 100%;
		padding-top: 28rpx;
		flex-direction: column;
	}
	.body {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.title-container {
		display: flex;
		flex-direction: column;
		margin-right: 18px;
		margin-bottom: 6px;
		flex: 1;
		justify-content: space-between;
		padding: 0 0 24rpx 30rpx;
	}
	.title {
		font-size: 36rpx;
		font-weight: Medium;
		color: #4E5053;
		line-height: 50rpx;
		margin-bottom: 9px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; /* number of lines to show */
		-webkit-box-orient: vertical;
	}
	.content {
		padding-left: 30rpx;
		padding-right: 30rpx;
		font-weight: Medium;
		color: #6E6F70;
		font-size: 28rpx;
		line-height: 40rpx;
		word-break: break-all;
		display: inline-block;
	}
	.header-container {
		display: flex;
		flex-direction: row;
		height: 34rpx;
		flex: 1;
		margin-right: 3px;
		align-items: flex-end;
		justify-content: flex-start;
	}
	.author-info-avatar {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.author-info-text {
		font-size: 12px;
		color: #4E5053;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; /* number of lines to show */
		-webkit-box-orient: vertical;
		padding-left: 10rpx;
		line-height: 40rpx;
	}
	.updated-at {
		font-size: 24rpx;
		font-weight: Semibold;
		color: #A6A6A6;
		padding-left: 10rpx;
		line-height: 40rpx;
		flex-shrink: 0;
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
	}
</style>
