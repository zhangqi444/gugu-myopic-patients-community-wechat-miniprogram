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
		</div>
		<view class="spliter"></view>
		<view class="function-container">
			<div class="function-menu">
				<div class="function" @click="navigateToCollect">
					<image class="function-icon" src="../../static/collect-mine.png"></image>
					<span class="function-text">我的收藏</span>
				</div>
				<div class="function" @click="navigateToEmr">
					<image class="function-icon" src="../../static/mine-emr.png"></image>
					<span class="function-text">我的记录</span>
				</div>
				<div class="function" @click="navigateToMine">
					<image class="function-icon" src="../../static/about.png"></image>
					<span class="function-text">关于我们</span>
				</div>
			</div>
		</view>
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

	export default {
		data() {
			return {
				defaultAvatarUrl: getStaticResource('avatar-default'),
				loading: false,
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
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20rpx 40rpx;
		background-color: #FFFFFF;
		height: 300rpx;
	}
	.nav-nickname {
		margin-top: 8px;
		color: #333;
		font-size: 16px;
	}
	.nav-avatar {
		border-radius: 50%;
		width: 100rpx;
		height: 100rpx;
	}
	.function {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		border-right: 1px solid #d9d9d9;
		line-height: 3px;
	}
	.function-icon {
		height: 26px;
		width: 26px;
		margin-bottom: 10px;
	}
	.function-text {
		color: #848386;
		font-size: 14px;
	}
	.spliter {
		width: 100%;
		height: 7px;
		background-color: #FAFAFA;
	}
	.function-container {
	 	height: 100%;
	 	width: 100%;
	 	background-color: #FAFAFA;
	 }
	.function-menu {
	 	display: flex;
	 	flex-direction: row;
		justify-content: space-around;
		align-items: center;
		margin-top: 14px;
		height: 70px;
		background-color: #FFFFFF;
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
