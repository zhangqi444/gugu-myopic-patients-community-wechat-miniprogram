<template>
	<view class="comment-list-item-container">
		<image class="user-info-image" :src="author.avatar || defaultAvatarUrl"></image>
		<view class="comment-main">
			<div class="title-container">
				<span class="title-basic user-name">{{ author.name + parentAuthorName }}</span>
				<span v-if="checking" class="title-basic checking">审核中</span>
			</div>
			<view class="comment-content">{{ item.content }}</view>
			<view class="comment-footer">
				<view class="button-container">
					<view v-if="!checking" @click="reply">
						<image class="button" :src="replyIcon"></image>
						<text class="button-text">{{ item.commentCount }}</text>
					</view>
					<view v-if="!checking" @click="thumb">
						<image class="button" :src="thumbIcon"></image>
						<text class="button-text button-text-thumb">{{ item.thumbCount }}</text>
					</view>
				</view>
				<text class="updated-at">{{ `${updatedAtRelative}` }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { ARTICLE_GETTER_GET_ONE } from "@/store/articleStore";
	import { COMMENT_GETTER_GET_ONE } from "@/store/commentStore";
	import { mapState } from 'vuex';
	import { getStaticResource } from '@/common/util';
	import Strings from '@/common/strings';
	import { SECURITY_CHECK_STATUS } from '@/common/constants';
	import { format } from 'fecha';
	import { parseAuthor, isAuthorDoctorOrExpert } from "@/common/helpers/authorHelper"
	
	export default {
		components: { },
		data() {
			return {
				replyIcon: getStaticResource("comment-reply"),
				defaultAvatarUrl: getStaticResource('avatar-default'),
			};
		},
		props: {
			item: { type: Object, default: () => {} }
		},
		computed: {
			...mapState({
				self: state => state.userStore.self,
			}),
			parentAuthorName() {
				if(!this.item) return '';
				let parent;
				if(this.item.nestedComment && this.item.nestedComment._id) {
					parent = this.item.nestedComment;
				} else if (this.item.comment && this.item.comment._id) {
					parent = this.item.comment;
				} else {
					return '';
				}
				const parentAuthor = parseAuthor(parent);
				return parentAuthor && parentAuthor.name ? ` ▸ ${parentAuthor.name}` : '';
			},
			thumbIcon() {
				const thumbed = this.item && this.item.self && this.item.self.thumb && this.item.self.thumb.value || false; 
				return thumbed ? getStaticResource("thumb-selected") : getStaticResource("thumb");
			},
			updatedAtRelative() {
				return this.item && this.item.updatedAt ? format(this.item.updatedAt, "MM-DD") : '';
			},
			checking() {
				return this.item && this.item.securityCheckStatus === SECURITY_CHECK_STATUS.CHECKING;
			},
			author() {
				return parseAuthor(this.item);
			},
		},
		methods: {
			thumb() {
				this.$emit('thumb', this.item);
			},
			reply() {
				this.$emit('reply', this.item);
			}
		}
	}
</script>

<style scoped>
	.comment-list-item-container {
		height: 100%;
		display: flex;
		padding: 24rpx 32rpx 0 32rpx;
		width: 100%;
		box-sizing: border-box;
	}
	.user-info-image {
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
	}
	.comment-main {
		padding-left: 14rpx;
		flex-direction: column;
		overflow: auto;
		flex: 1;
	}
	.title-container {
		display: flex;
		flex-direction: row;
	}
	.title-basic {
		font-size: 30rpx;
		line-height: 42rpx;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; /* number of lines to show */
		-webkit-box-orient: vertical;
		overflow: hidden;
		word-break: break-all;
	}
	.user-name {
		flex: 1;
		color: #2E2E2E;
		font-weight: bold;
	}
	.checking {
		color: #939393;
		font-weight: normal;
		padding-left: 6rpx;
	}
	.comment-content {
		padding-top: 8rpx;
		color: #383838;
		font-weight: Regular;
		font-size: 32rpx;
		line-height: 48rpx;
		word-break: break-all;
	}
	.comment-footer {
		padding: 22rpx 0 20rpx 0;
		display: flex;
		flex-direction: row-reverse;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.updated-at {
		display: flex;
		align-self: flex-end;
		flex: 1;
		color: #939393;
		font-size: 24rpx;
		font-weight: Regular;
		line-height: 34rpx;
		padding-bottom: 8rpx;
	}
	.button-container {
		display: flex;
	}
	.button {
		height: 30rpx;
		width: 30rpx;
		padding-right: 4rpx;
	}
	.button-text {
		font-size: 20rpx;
		color: #787878;
		font-weight: Regular;
		line-height: 30rpx;
		padding-right: 40rpx;
	}
	.button-text-thumb {
		padding-right: 0rpx;
	}
</style>
