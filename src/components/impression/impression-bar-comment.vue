<template>
	<view class="container">
		<view class="interaction-container">
			<view class="comment-target-container" v-if="commentInputFocused">
				<span class="comment-target-text">评论给 </span>
				<span class="comment-target-text comment-target-name">{{commentTargetAuthorName}}</span>
			</view>
			<view class="comment-input-container">
				<textarea v-if="commentInputFocused" :class="{
						'comment-input-basic': true,
						'comment-input-textarea': true,
					}"
					placeholder="友善的评论是交流的起点" v-model="commentText" @focus="commentInputFocus" @blur="commentInputBlur"
					auto-height maxlength="-1" placeholder-style="font-size:14px" :show-confirm-bar="false" :focus="commentInputFocused"
					:disable-default-padding="true" :cursor-spacing="2"/>
				<view v-else @click="commentInputPlaceholderClick" :class="{
						'comment-input-basic': true,
						'comment-input-textarea-placeholder': true,
					}">
					{{commentText ? "[有草稿未发送]" : "友善的评论是交流的起点"}}
				</view>
				<impressionBar v-if="showImpressionBar && !commentInputFocused" class="comment-impression-bar" :showText="showText" :item="item" @click="click" :imageStyle="imageStyle" :textStyle="textStyle"
					:innerContainerStyle="innerContainerStyle" :buttonStyle="buttonStyle" :showCommentButton="false" textPosition="top"/>
			</view>
		</view>
		<view v-if="showCommentPublish || commentInputFocused">
			<view v-if="onboarded" :class="commentEnabled ? 'comment-publish' : 'comment-publish comment-publish-inactive'" 
				@click="publishComment" >
				<span>发布</span>
			</view>
			<button v-else open-type="getUserInfo" @getuserinfo="getUserInfo" style="border-width: 0px;" hover-class="none" plain="true"
				:class="commentEnabled ? 'comment-publish' : 'comment-publish comment-publish-inactive'">
				<span>发布</span>
			</button>
		</view>
	</view>
</template>


<!-- 
	TODO: 
	这是一个违反了HOC规范的组件，是为了更好的重用业务逻辑层代码而设置。
	理论上，该组件不应当使用apis和store，相关的点击事件应该层层传递到页面曾，再处理。
-->
<script>
	import { mapState } from 'vuex';
	import { addThumbPost, addThumbArticle } from "@/common/apis/thumb";
	import { addCollectPost, addCollectArticle } from "@/common/apis/collect";
	import impressionBar from "@/components/impression/impression-bar"
	import { PAGES, ONBOARDING_STATUS, ACTION_TARGET_TYPE } from '@/common/constants';
	import { addThumb, addCollect } from "@/common/helpers/actionHelper";
	import { onboardByWechatUserInfo } from "@/common/helpers/authHelper";
	import { parseAuthor } from "@/common/helpers/authorHelper";
	import { ARTICLE_MUTATION_UPDATE_ONE } from "@/store/articleStore";
	import { POST_MUTATION_UPDATE_ONE } from "@/store/postStore";
	
	export default {
		components: { impressionBar },
		data() {
			return {
				commentText: '',
				commentInputFocused: false,
				imageStyle: {
					"height": "44rpx", "width": "44rpx"
				},
				innerContainerStyle: {
					"width": "100%",
				},
				buttonStyle: {
					"width": "44rpx", "height": "44rpx", "margin-right": "48rpx"
				}
			};
		},
		props: {
			item: { type: Object, default: () => {} },
			showText: { type: Boolean, default: true },
			showImpressionBar: { type: Boolean, default: false },
			showCommentPublish: { type: Boolean, default: true },
			target: { type: Object, default: () => null },
			type: { type: String, default: ACTION_TARGET_TYPE.ARTICLE }
		},
		computed: {
			...mapState({
				self: state => state.userStore.self,
				onboarded: state => state.userStore.self && state.userStore.self.onboardingStatus === ONBOARDING_STATUS.ONBOARDED
			}),
			thumbHandler() {
				return this.type === ACTION_TARGET_TYPE.ARTICLE ? addThumbArticle : addThumbPost;
			},
			collectHandler() {
				return this.type === ACTION_TARGET_TYPE.ARTICLE ? addCollectArticle : addCollectPost;
			},
			mutation() {
				return this.type === ACTION_TARGET_TYPE.ARTICLE ? ARTICLE_MUTATION_UPDATE_ONE : POST_MUTATION_UPDATE_ONE;
			},
			collected() {
				return this.item && this.item.self && this.item.self.collect && this.item.self.collect.value || false;
			},
			thumbed() {
				return this.item && this.item.self && this.item.self.thumb && this.item.self.thumb.value || false;
			},
			commentEnabled() {
				return this.commentText && this.commentText.trim();
			},
			commentTargetAuthorName() {
				let author = parseAuthor(this.target || this.item);
				return author ? author.name : '';
			},
			isIOS() {
				const systemInfo = uni.getSystemInfoSync();
				return systemInfo && systemInfo.platform === 'ios';
			},
		},
		methods: {
			click(type, item) {
				switch(type) {
					case 'thumb': this.thumb(); return;
					case 'collect': this.collect(); return;
					case 'share':
					default:
						return;
				}
			},
			async thumb() {
				await addThumb(this.item, this.self, this.thumbHandler, this.mutation);
			},
			async collect() {
				await addCollect(this.item, this.self, this.collectHandler, this.mutation);
			},
			getUserInfo(e) {
				const userInfo = e.detail.userInfo;
				onboardByWechatUserInfo(userInfo);
			},
			publishComment() {
				if(!this.commentEnabled) return;
				this.$emit('publish', this.commentText);
			},
			commentInputBlur() {
				this.$emit('inputBlur', this.commentText);
				this.commentInputFocused = false;
			},
			commentInputFocus() {
				this.$emit('inputFocus', this.commentText);
				// TODO:
				// 在android中，如果输入框已有内容，在键盘弹起后无法正确resize，“发布”按钮无法被正确显示
				// 但是输入任意字符后即可正确resize，因此这里暂时采用这样的walkaroud。
				if(!this.isIOS) {
					const vm = this;
					const commentText = vm.commentText;
					vm.$nextTick(function(){
						vm.commentText = vm.commentText + ' ';
						vm.$nextTick(function(){
							vm.commentText = commentText;
						});
					});
				}
			},
			commentInputPlaceholderClick() {
				this.commentInputFocused = true;
			},
			focusInput() {
				this.commentInputFocused = true;
			},
			clearInput() {
				this.commentText = '';
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 16rpx 32rpx;
		width: 100%;
		flex-direction: row;
		background-color: #FFFFFF;
	}
	.interaction-container {
		width: 100%;
	}
	.comment-target-container {
		display: flex;
		padding: 16rpx 20rpx;
		background-color: #F8F8F8;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
	}
	.comment-target-text {
		font-size: 28rpx;
		color: #2E2E2E;
		margin-right: 12rpx;
	}
	.comment-target-name {
		flex: 1;
		font-weight: bold;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; /* number of lines to show */
		-webkit-box-orient: vertical;
		overflow: hidden;
		word-break: break-all;
	}
	.comment-input-container {
		z-index: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.comment-input-basic {
		display: flex;
		color: #2E2E2E;
		font-size: 28rpx;
		background-color: #F8F8F8;
		flex: 1;
	}
	.comment-input-textarea-container {
		width: 100%;
	}
	.comment-input-textarea {
		line-height: 34rpx;
		width: 100%;
		border-bottom-left-radius: 16rpx;
		border-bottom-right-radius: 16rpx;
		padding: 0 20rpx 16rpx 20rpx;
	}
	.comment-input-textarea-placeholder{
		line-height: 72rpx;
		height: 72rpx;
		border-radius: 16rpx;
		color: #888888;
		padding: 0 20rpx;
	}
	.comment-impression-bar {
		margin-left: 48rpx;
	}
	.comment-publish {
		display: flex;
		font-size: 28rpx;
		font-weight: Bold;
		padding: 0rpx;
		margin-left: 24rpx;
		color: #72CE8B;
		align-items: flex-end;
		border-width: 0rpx;
		line-height: 56rpx;
		width: 60rpx;
	}
	.comment-publish-inactive {
		color: rgba(114, 206, 139, 0.5);
	}
</style>
