<template>
	<view class="container">
		<uniPopup id="errorPopup" ref="errorPopup" type="message">
			<uniPopupMessage type="error" :message="errorMessage" :duration="2000"></uniPopupMessage>
		</uniPopup>
		<view class="header-container">
			<image class="header-image" :src="headerImageIcon"></image>
			<text class="header-text">记录你的经历，交流心得</text>
		</view>
		<view class="title-container">
			<textarea class="ql-title" placeholder="标题至少五个字(必填)" showImgSize showImgToolbar showImgResize
				@input="onTitleInput" maxlength="60"></textarea>
			<view class="words-count">{{ titleLength + '/60'}}</view>
			<view class="spliter"></view>
		</view>
		<view class="body-container">
			<editor id="editor" class="ql-container" placeholder="请输入正文" showImgSize showImgToolbar showImgResize
				@statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady" @input="onEditorInput">
			</editor>
		</view>
		<!-- <view>
			<view class='toolbar' @tap="format">
				<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
				<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"></view>
			
				<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1" data-name="header"
				 :data-value="1"></view> -->
				<!-- <view class="iconfont icon-yinyong" data-name="blockquote" ></view> -->
				<!-- <view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie" data-name="list"
				 data-value="ordered"></view>
				<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie" data-name="list"
				 data-value="bullet"></view> -->
				
				<!-- <view class="iconfont icon-charulianjie" data-name="i"></view> -->
				<!-- <view class="iconfont icon-fengexian" @tap="insertDivider"></view>
				<view class="iconfont icon-charutupian" @tap="insertImage"></view>
			
				<view class="iconfont icon-undo" @tap="undo"></view>
				<view class="iconfont icon-redo" @tap="redo"></view>
			</view>
		</view> -->
		<view class="footer">
			<!-- <text class="footer-title">添加话题（必选）</text>
			<view class="footer-tag-container">
				<view class="tag">#这是标签</view>
				<view class="tag">#这是标签</view>
				<view class="tag">#这是标签</view>
				<view class="tag">#这是标签</view>
				<view class="tag">#这是标签</view>
				<view class="tag">#这是标签</view>
			</view>
			<view class="footer-user-container">
				<text class="user-title">微信名发布：</text>
				<image class="user-avatar" :src="self.avatar"></image>
			</view> -->
			<view class="publish-container">
				<view :class="publishEnabled ? 'publish-button' : 'publish-button publish-inactive'" @click="publish" >
					<span>发布帖子</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { getStaticResource } from "@/common/util";
	import { onboardByWechatUserInfo } from "@/common/helpers/authHelper";
	import { POST_MUTATION_UPDATE_ONE } from "@/store/postStore";
	import { ONBOARDING_STATUS, AUTHOR_TYPE, PAGES } from '@/common/constants';
	import { postByCircles, addPost } from '@/common/apis/post';
	import uniPopup from '@/components/uni-popup/uni-popup';
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message';
	import Strings from '@/common/strings';
	
	export default {
		components: { uniPopup, uniPopupMessage },
		data() {
			return {
				errorMessage: '',
				titleText: '',
				contentText: '',
				titleLength: 0,
                readOnly: false,
				formats: {},
				headerImageIcon: getStaticResource('post-header')
			}
		},
		computed: {
			...mapState({
				self: state => state.userStore.self,
				onboarded: state => state.userStore.self && state.userStore.self.onboardingStatus === ONBOARDING_STATUS.ONBOARDED
			}),
			publishEnabled() {
				return this.titleText && this.titleText.trim().length >= 5;
			}
		},
		methods: {
			async publish() {
				if(!this.publishEnabled || !this.self || !this.self._id) return;
				
				try {
					let result = await addPost({
						title: this.titleText, content: this.contentText, user: this.self._id, authorType: AUTHOR_TYPE.USER,
					});
					result = result && result.data && result.data.addPost;
					if(result && result._id) {
						uni.showToast({ title: '发布成功', icon: 'success', duration: 2000 });
						this.$store.commit(POST_MUTATION_UPDATE_ONE, { item: result });
						const currentPages = getCurrentPages();
						const circlePage = currentPages[currentPages.length - 2];
						circlePage.$vm.initData(null, true);
						uni.navigateBack();
						return;
					}
				} catch(e) {
					console.error(e)
				}
				this.errorMessage = Strings.ERROR.POST_PUBLISH_FAILED;
				this.$refs.errorPopup.open();
			},
			getUserInfo(e) {
				const userInfo = e.detail.userInfo;
				onboardByWechatUserInfo(userInfo);
			},
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onTitleInput(event) {
				this.titleText = event.detail.value;
				this.titleLength = this.titleText.length;
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			onEditorInput(event) {
				this.contentText = event.detail.html;
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)

			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			insertImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.editorCtx.insertImage({
							src: res.tempFilePaths[0],
							alt: '图像',
							success: function() {
								console.log('insert image success')
							}
						})
					}
				})
			}
		},
		onLoad() {
		},
	}
</script>

<style scoped>
	@import "./post-publish-icon.css";
	
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100vh;
	}
	.header-container {
		display: flex;
		width: 100%;
		background: linear-gradient(to left,#FFFAF5,#FDE6DA);
		height: 72rpx;
		align-items: center;
	}
	.header-image {
		height: 40rpx;
		width: 40rpx;
		padding-left: 32rpx;
	}
	.header-text {
		color: #FFB572;
		font-size: 28rpx;
		line-height: 40rpx;
		font-weight: Semibold;
	}
	.title-container {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
	}
	.body-container {
		padding: 10rpx;
		flex: 1;
		overflow: auto;
		--safe-area-inset-bottom: env(safe-area-inset-bottom);
		margin-bottom: calc(126rpx + var(--safe-area-inset-bottom));
	}
	.footer {
		flex-direction: column;
		position: fixed;
		bottom: 0;
		--safe-area-inset-bottom: env(safe-area-inset-bottom);
		padding-bottom: calc(20rpx + var(--safe-area-inset-bottom));
		display: flex;
		width: 100%;
	}
	.footer-title {
		padding: 0 0 30rpx 20rpx; 
		color: #6F6F6F;
		font-size: 28rpx;
		line-height: 40rpx;
		font-weight: Medium;
	}
	.footer-tag-container {
		padding: 0 0 60rpx 30rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.tag {
		background-color: #F3F3F3;
		display: flex;
		font-size: 28rpx;
		line-height: 40rpx;
		color: #4E5053;
		margin: 0 28rpx 10rpx 0;
		height: 64rpx;
		align-items: center;
		border-radius: 12rpx;
		padding: 0 8rpx;
	}
	.footer-user-container {
		padding: 0 0 48rpx 30rpx;
		display: flex;
	}
	.user-title {
		color: #4E5053;
		font-weight: Semibold;
		font-size: 28rpx;
		line-height: 40rpx;
		padding-right: 10rpx;
		display: flex;
	}
	.user-avatar {
		height: 40rpx;
		width: 40rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
	}
	.publish-container {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.publish-button {
		margin: 0 48rpx;
		width: 100%;
		height: 88rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: Medium;
		background-color: #7ED395;
		color: #FFFFFF;
		border-width: 2rpx;
		border-radius: 12rpx;
		line-height: 88rpx;
	}
	.publish-inactive {
		color: #C2C2C2;
		background-color: #F3F3F3;
	}
	.words-count {
		display: flex;
		justify-content: flex-end;
		color: #A6A6A6;
		font-size: 24rpx;
		font-weight: Medium;
		line-height: 34rpx;
		margin-right: 30rpx;
		padding-bottom: 20rpx;
	}
	.spliter {
		height: 2rpx;
		background-color: #EBEBEB;
		margin: 0 10rpx;
	}
	.iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 20px;
	}
	.toolbar {
		display: flex;
		position: fixed;
		bottom: 0;
		box-sizing: border-box;
		border-bottom: 0;
		width: 100%;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
		--safe-area-inset-bottom: env(safe-area-inset-bottom);
		padding-bottom: calc(var(--safe-area-inset-bottom));
	}
	.ql-title {
		display: flex;
		box-sizing: border-box;
		padding: 44rpx 10rpx 14rpx 10rpx;
		width: 100%;
		height: 152rpx;
		background: #fff;
		font-size: 32rpx;
		line-height: 44rpx;
	}
	.ql-container {
		box-sizing: border-box;
		padding: 24rpx 20rpx;
		width: 100%;
		min-height: 30vh;
		height: auto;
		background: #fff;
		font-size: 32rpx;
		line-height: 44rpx;
	}
	.ql-active {
		color: #06c;
	}
</style>
