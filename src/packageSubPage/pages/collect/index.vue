<template>
	<div class="container">
		<div class="spliter-top"></div>
		<div class="collect" v-for="(collect, index) in collectList" :key="collect.target.article._id">
			<div class="info-container">
				<div class="collect-info" @click="handleClickCollect(collect.target.article._id)">
					<h1 class="collect-title">{{collect.target.article.title}}</h1>
					<text class="collect-author">{{author(collect).fullTitle}}</text>
				</div>
			</div>
			<div class="collect-menu">
				<div class="collect-menu-item" @click="handleClickCollect(collect.target.article._id)">
					<image class="view-detail-icon" :src="detailIcon"></image>
					查看详情
				</div>
				<div class="collect-menu-item" @click="handleClickToggle(index)">
					<image class="collect-now-icon" :src="collectIcon"></image>
					{{
						collect.target.article.isCollected === false ? 
						'立即收藏' :
						'取消收藏'
					}}
				</div>
			</div>
			<div class="spliter-bottom"></div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import { AUTHOR_TYPE } from "@/common/constants";
	import { collectsBySelf, addCollectArticle } from '@/common/apis/collect';
	import { getStaticResource } from "@/common/util";
	import { parseAuthor } from "@/common/helpers/authorHelper";
	import Strings from "@/common/strings";
	import { PAGES } from '@/common/constants';
	import { login } from '@/common/helpers/authHelper';
	
	export default {
		data() {
			return {
				collectList: [],
				navigateFlag: false
			}
		},
		computed: {
			...mapState({
				self: state => state.userStore.self
			}),
			collectIcon() {
				return getStaticResource('collected');
			},
			detailIcon() {
				return getStaticResource('detail');
			}
		},
		async onLoad(option) {
			this.loading = true;
			uni.showLoading({
				title: Strings.GLOBAL.LOADING
			});
			await this.getCollects();
			uni.hideLoading();
			this.loading = false;
		},
		methods: {
			author(collect) {
				const item = collect && collect.target && collect.target.article;
				return item ? parseAuthor(item) : { fullTitle: '' };
			},
			async getCollects() {
				try {
					if(!this.self._id) await login(this);
					const { data } = await collectsBySelf(this.self._id, { limit: 10000, skip: 0 });
					if (!data) return;
					this.collectList = [ ...data.collectsBySelf ];
				} catch(e) {
					console.error(e);
				}
			},
			handleClickCollect(id) {
				if (this.navigateFlag) return;
				this.navigateFlag = true;
				uni.navigateTo({ url: `${PAGES.ARTICLE.path}?id=${id}` });
				setTimeout(() => {
					this.navigateFlag = false;
				}, 200)
			},
			async handleClickToggle(index) {
				// TOOD: 此处为同步数据到store，需要引用actionHelper中的方法。
				try {
					const currentItem = this.collectList[index].target.article;
					if (currentItem.isCollected === undefined) {
						this.$set(currentItem, 'isCollected', true);
					}
					const result = await addCollectArticle(currentItem._id, this.self._id, !currentItem.isCollected);
					if(result.data.addCollect._id) {
						this.$set(currentItem, 'isCollected', !currentItem.isCollected);
						this.showCollectToast(currentItem.isCollected);
					}
					// handle error
				} catch(e) {
					console.error(e);
				}
			},
			showCollectToast(status) {
				uni.showToast({
				    title: `${status ? '收藏成功!' : '取消成功!'}`,
					icon: 'success',
				    duration: 1000
				});
			},
		}
	}
</script>

<style scoped>
	.container {
		padding: 20px 0;
	}
	.spliter-top {
		height: 8px;
		width: 100%;
		background: #F7FAFB;
	}
	.collect {
		margin: auto;
	}
	.info-container {
		display: flex;
		flex-direction: row;
		padding-left: 29px;
		padding-right: 30px;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.collect-info {
		display: flex;
		width: 100%;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		padding-top: 20px;
		padding-bottom: 16px;
		border-bottom: 1px solid #F5F5F5;
		margin: auto;
	}
	.collect-title {
		display: flex;
		font-size: 16px;
		color: #171717;
	}
	.collect-author {
		padding-top: 17px;
		display: flex;
		font-size: 12px;
		color: #747474;
	}
	.collect-image {
		height: 70px;
		width: 120px;
		border-radius: 4px;
	}
	.collect-menu {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.collect-menu-item {
		display: flex;
		height: 16px;
		line-height: 16px;
		margin: 10px 0;
		flex: 1;
		text-align: center;
		align-items: center;
		justify-content: center;
		color: #646365;
		font-size: 12px;
		border-right: 1px solid #D9D9D9;
	}
	.view-detail-icon {
		height: 19px;
		width: 19px;
		padding-right: 2px;
	}
	.collect-now-icon {
		height: 16px;
		width: 16px;
		padding-right: 3px;
	}
	.collect-menu-item:last-of-type {
		border: none;
	}
	.spliter-bottom {
		height: 8px;
		width: 100%;
		background: #F7FAFB;
	}
</style>
