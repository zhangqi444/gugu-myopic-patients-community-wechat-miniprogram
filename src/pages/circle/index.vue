<template>
	<view class="container">
		<uni-nav-bar class="nav-bar" :style="{ marginTop: narBarMarginTop, width: narBarWidth }" :fixed="true" right-icon="scan">
			<view class="header" @click="search">
				<image class="logo" :src="homeLogoSrc"></image>
				<search-bar class="search-bar" width="97" placeholder="搜索" disabled="true" />
			</view>
		</uni-nav-bar>
		<view class="listview-container">
			<contentList class="listview" @loadMore="loadFeed" limit="10" ref="postList" :getter="getter" :refresherEnabled="true" >
				<template v-slot:item="{item}">
					<postListItem :ref="'item-' + item._id" :item="item" @click="goTo"/>
				</template>
				<template v-slot:spliter="{item}">
					<view class="spliter" />
				</template>
			</contentList>
		</view>
		<uniFab ref="fab" :pattern="{buttonColor: '#77DC94'}" :content="content" horizontal="right" vertical="bottom" 
			:popMenu="false" @fabClick="fabClick" @getUserInfo="getUserInfo" :fabOpenType="!onboarded && 'getUserInfo'" />
	</view>
</template>

<script>
	import { postsByCircles } from '@/common/apis/post';
	import { POST_MUTATION_ADD, POST_GETTER_GET_ONE, POST_GETTER_GET } from '@/store/postStore';
	import postListItem from '@/components/post-list/post-list-item';
	import searchBar from '@/components/search-bar';
	import { APP, PAGES, POST_TYPE, ONBOARDING_STATUS } from '@/common/constants';
	import { getStaticResource } from '@/common/util';
	import { onboardByWechatUserInfo } from '@/common/helpers/authHelper';
	import { addVisitSelf } from "@/common/apis/visit";
	import { mapState } from 'vuex';
	import contentList from '@/components/content-list/index';
	import uniFab from '@/components/uni-fab/uni-fab'

	export default {
		components: { postListItem, contentList, searchBar, uniFab },
		data() {
			return {
				skip: 0, limit: 100, navigateFlag: false, loading: false,
				homeLogoSrc: getStaticResource('home-logo'),
				getter: POST_GETTER_GET
			}
		},
		computed: {
			...mapState({
				self: state => state.userStore.self,
			}),
			onboarded() {
				return this.self && this.self.onboardingStatus === ONBOARDING_STATUS.ONBOARDED;
			},
			narBarMarginTop() {
				const menuButton = uni.getMenuButtonBoundingClientRect();
				return (menuButton.top + menuButton.height / 2 - 14.5) * 2 + 'rpx';
			},
			narBarWidth() {
				const menuButton = uni.getMenuButtonBoundingClientRect();
				return (menuButton.left - 4) * 2 + 'rpx';
			}
		},
		async onReady() {
			if(this.$refs["postList"]) {
				this.$refs["postList"].$refs.list.loadMore();
			} else {
				setTimeout(() => {
					this.$refs["postList"].$refs.list.loadMore();
				}, 200);
			}
			
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline'],
				title: APP.APP_NAME,
				path: PAGES.HOME.path,
				content: APP.SLOGAN,
			});
			
			addVisitSelf(null, PAGES.CIRCLE.ref);
		},
		onShareAppMessage(res) {
		    if (res.from === 'button' && res.target.id) { // 来自页面内分享按钮
				const post = this.$store.getters[POST_GETTER_GET_ONE](res.target.id);
				return {
					title: post.title,
					path: `${PAGES.POST.path}?id=${post._id}`,
					imageUrl: this.homeLogoSrc,
					content: post.title,
				}
			}
			
			return {
				title: APP.APP_NAME,
				path: PAGES.HOME.path,
				content: APP.SLOGAN,
			}
		},
		methods: {
			search() {
				uni.navigateTo({ url: PAGES.SEARCH.path });
			},
			initData(event, refresh) {
				if(this.$refs["postList"]) {
					this.$refs["postList"].$refs.list.loadMore(event, refresh);
				} else {
					setTimeout(() => {
						this.$refs["postList"].$refs.list.loadMore(event, refresh);
					}, 200);
				}
			},
			async loadFeed(id, defaultOption, callback) {
				try {
					const option = { ...defaultOption, sort: { 'createdAt': -1 } };
					const condition = { type: POST_TYPE.DEFAULT };
					var result;
					
					result = await postsByCircles(null, this.self._id, option);
					result = result && result.data && result.data.postsByCircles || [];
									
					this.$store.commit(POST_MUTATION_ADD, { items: result });
					callback(result);
				} catch(e) {
					console.error(e);
					callback(null);
				}
			},
			goTo(item) {
				if (this.navigateFlag) return;
				this.navigateFlag = true;
				uni.navigateTo({ url: `${PAGES.POST.path}?id=${item._id}` });
				setTimeout(() => {
					this.navigateFlag = false;
				}, 200);
			},
			fabClick(event) {
				if(!this.onboarded) return;
				uni.navigateTo({ url: PAGES.POST_PUBLISH.path });
			},
			getUserInfo(e) {
				const userInfo = e.detail.userInfo;
				onboardByWechatUserInfo(userInfo);
			}
		}
	}
</script>

<style scoped>
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100vh;
	}
	.nav-bar {
		margin-top: 49px;
		margin-bottom: 20px;
	}
	.header {
		display: flex;
		flex-direction: row;
		padding-left: 24px;
		height: 35px;
		align-items: center;
	}
	.logo {
		width: 130.5px;
		height: 31.5px;
		margin-right: 9px;
	}
	.search-bar {
		flex: 1;
	}
	.listview-container {
		display: flex;
		flex: 1;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		position: relative;
		overflow: auto;
	}
	.listview {
		display: flex;
		height: 100%;
		width: 100%;
		flex: 1;
	}
	.spliter {
		background-color: #F6F6F6;
		height: 2rpx;
	}
</style>
