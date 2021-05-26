<template>
	<view class="container">
		<div class="nav">
			<image class="nav-avatar" :src="self.avatar || defaultAvatarUrl"></image>
			<span class="nav-nickname">
				<button v-if="!onboarded" class="login" 
					open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">
					立即登录
				</button>
				<span v-else>{{self.nickname}}</span>
			</span>
			<view class="header-function-container">
				<image class="icon" :src="mineNoticeIcon"></image>
				<image class="icon" :src="mineSettingIcon" @click="navigateToSetting"></image>
			</view>
		</div>
		<view class="function-container">
			<view class="function-item">
				<text class="function-count">{{ '0' }}</text>
				<text class="function-name">我的关注</text>
			</view>
			<view class="function-item">
				<text class="function-count">{{ '0' }}</text>
				<text class="function-name">我的病友</text>
			</view>
			<view class="function-item">
				<text class="function-count">{{ '0' }}</text>
				<text class="function-name">我的发布</text>
			</view>
			<view class="function-item" @click="navigateToCollect">
				<text class="function-count">{{ collectCount }}</text>
				<text class="function-name">我的收藏</text>
			</view>
		</view>
		<view class="spliter"></view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { getStaticResource } from '@/common/util';
	import { PAGES, APP, ONBOARDING_STATUS } from '@/common/constants';
	import { login, onboardByWechatUserInfo } from '@/common/helpers/authHelper';
	import { onboardSelf } from '@/common/apis/user';
	import { USER_MUTATION_UPDATE_SELF } from '@/store/userStore';
	import { addVisitSelf } from "@/common/apis/visit";
	import Strings from '@/common/strings';
	import { collectsBySelf } from '@/common/apis/collect';
	import { userRich } from '@/common/apis/user';

	export default {
		data() {
			return {
				collectList: [],
				defaultAvatarUrl: getStaticResource('avatar-default'),
				mineSettingIcon: getStaticResource('mine-setting'),
				mineNoticeIcon: getStaticResource('mine-notice'),
				collectCount: 0,
				loading: false
			}
		},
		computed: {
			...mapState({
				self: state => state.userStore.self,
				onboarded: state => state.userStore.self && state.userStore.self.onboardingStatus === ONBOARDING_STATUS.ONBOARDED
			}),
		},
		async onLoad() { 
			this.loading = true;
			uni.showLoading({
				title: Strings.GLOBAL.LOADING
			});
			
			if (!this.self._id) await login(this);
							
			const collect = await userRich(this.self._id);
			this.collectCount = collect.data.userRich.collectCount;
			this.$store.commit(USER_MUTATION_UPDATE_SELF, { item: this.collectCount });
			uni.hideLoading();
			this.loading = false;
		},
		onReady() {
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline'],
				title: APP.APP_NAME,
				path: PAGES.HOME.path,
				content: APP.SLOGAN,
			});
			addVisitSelf(null, PAGES.MINE.ref);
		},
		onShareAppMessage(res) {
			if (res.from === 'menu') {// 来自页面内分享按钮
				return {
					title: APP.APP_NAME,
					path: PAGES.HOME.path,
					content: APP.SLOGAN,
				}
			}
		},
		methods: {
			navigateToCollect() {
				uni.navigateTo({ url: PAGES.COLLECT.path });
			},
			navigateToMine() {
				uni.navigateTo({ url: PAGES.ABOUT.path });
			},
			navigateToEmr() {
				uni.navigateTo({ url: PAGES.EXAM_RECORD.path });
			},
			navigateToSetting() {
				uni.navigateTo({ url: PAGES.SETTING.path });
			},
			async getUserInfo(e) {
				const userInfo = e.detail.userInfo;
				await onboardByWechatUserInfo(userInfo);
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100%;
		background-color: #FAFAFA;
	}
	.nav {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		padding: 68rpx 0 40rpx 54rpx;
		background-color: #FFFFFF;
	}
	.nav-nickname {
		padding-left: 32rpx;
		margin-top: 8px;
		color: #333;
		font-size: 16px;
		display: flex;
		flex: 1;
	}
	.nav-avatar {
		width: 100rpx;
		height: 100rpx;
	}
	.header-function-container {
		display: flex;
		align-self: center;
		padding-right: 12rpx;
		justify-content: center;
	}
	.icon {
		height: 40rpx;
		width: 40rpx;
		padding-right: 40rpx;
	}
	.spliter {
		width: 100%;
		height: 7px;
		background-color: #FAFAFA;
	}
	.function-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		background-color: #FFFFFF;
	}
	.function-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.function-count {
		font-weight: Bold;
		font-size: 32rpx;
		line-height: 48rpx;
		color: #585858;
	}
	.function-name {
		font-weight: Medium;
		font-size: 22rpx;
		line-height: 48rpx;
	}
	.login {
		margin-top: 20px;
		border: 1px solid #23BE52;
		outline: none;
		background: #fff;
		color: #23BE52;
		font-size: 14px;
	}
</style>