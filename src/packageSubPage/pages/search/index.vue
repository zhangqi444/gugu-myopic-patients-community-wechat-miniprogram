<template>
	<view ref="searchPage" class="container">
		<search-bar class="search-bar" ref="searchBar" @clear="resetSearch" @input="resetSearch" @confirm="search" />
		<view
			class="init-content-container"
			ref="initContents"
			v-for="(content, i) in initContents"
			v-if="showInitContents && content.tags && content.tags.length > 0"
			:key="i">
			<view class="init-content-header flex row">
				<text class="init-content-header-title">{{ content.title }}</text>
				<view class="flex justify-content-center"
					v-if="content.type === 'history'"
					@click="clearHistoryOrRefreshHotClick(content.type)">
					<image 
						:style="{width: content.iconSize.width, height: content.iconSize.height}" 
						:src="content.icon"></image>
				</view>
			</view>
			<view class="init-content-body flex row flex-wrap">
				<view 
					class="init-content-tag-container" 
					v-for="(tag, index) in content.tags" 
					:key="index"
					@click="tagClick(tag)">
					<tag :tagStyle="tagStyle" :textStyle="tagTextStyle" :text="tag"/>
				</view>	
			</view>
		</view>
		<view class="search-result-list-container" v-if="!showInitContents">
			<articleList class="search-result-list" @loadMore="loadMore" limit="10" ref="searchResultList" />
		</view>
	</view>
</template>

<script>
	import searchBar from '@/components/search-bar';
	import tag from "@/components/tag";
	import { articlesBySearch } from '@/common/apis/article';
	import { getStaticResource } from '@/common/util';
	import articleList from '@/components/article-list/index';
	import { ARTICLE_MUTATION_ADD } from '@/store/articleStore';
	import { LOCAL_STORAGE_KEYS, PAGES } from '@/common/constants';
	
	export default {
		components: { searchBar, tag, articleList },
		data() {
			return {
				showInitContents: true,
				searchInput: {},
				initContents: [
					{
						type: 'history',
						title: '搜索历史',
						tags: [],
						icon: getStaticResource('trash'),
						iconSize: {
							width: "14px",
							height: "25px",
						}
					},
					{
						type: 'hot',
						title: '热门搜索',
						tags: [
							"🔥 低浓度阿托品",
							"近视", 
							"🔥 OK镜", 
							"接触镜护理",
						],
						icon: getStaticResource('left-refresh'),
						iconSize: {
							width: "16px",
							height: "25px",
						}
					}
				],
				tagStyle: {
					'background-color': '#EDEDED',
					'border-radius': "18rpx",
					padding: "12rpx 24rpx",
					'border-style': 'hidden'
				},
				tagTextStyle: {
					'color': '#777777',
					'font-size': '24rpx',
					'line-height': '34rpx'
				}
				
			};
		},
		mounted() {
			try {
				const tags = uni.getStorageSync(LOCAL_STORAGE_KEYS.SEARCH_HISTORY_KEY) || [];
				this.initContents[0].tags = tags;
			} catch (e) {
				//
			}
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
			search(input) {
				if (input && input.value && input.value !== this.searchInput.value) {
					const vm = this;
					this.searchInput = input;
					this.showInitContents = false;
					this.$nextTick(function () {
						this.$refs.searchResultList.$refs.list.loadMore();
					});
					this.initContents[0].tags.unshift(this.searchInput.value);
					uni.setStorage({
						key: LOCAL_STORAGE_KEYS.SEARCH_HISTORY_KEY,
						data: this.initContents[0].tags,
						success: function () { }
					});
				}
			},
			async loadMore(id, option, callback) {
				try {
					if (this.searchInput.value) {
						let articlesResult = await articlesBySearch(this.searchInput.value, option);
						articlesResult = articlesResult && articlesResult.data && articlesResult.data.articlesBySearch || [];
						this.$store.commit(ARTICLE_MUTATION_ADD, { items: articlesResult });
						callback(articlesResult);
						return;
					}
					callback(null);
				} catch(e) {
					console.error(e);
					callback(null);
				}
			},
			resetSearch(input) {
				if (!input || !input.value) {
					this.showInitContents = true;
					this.searchInput = {};
				}
			},
			clearHistory() {
				this.initContents[0].tags = [];
				this.initContents = [ ...this.initContents ];
				uni.setStorage({
					key: LOCAL_STORAGE_KEYS.SEARCH_HISTORY_KEY,
					data: [],
					success: function () { }
				});
			},
			tagClick(tag) {
				this.$refs.searchBar.updateSearch(tag);
				this.search({ value: tag });
			},
			clearHistoryOrRefreshHotClick(type) {
				type === 'history' ? this.clearHistory() : this.refreshHot();
			}
		}
	}
</script>

<style scoped>
	
	.container {
		width: 100%;
		min-height: 100%;
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		box-sizing: border-box;
	}
	
	.search-bar {
		padding-left: 24px;
		padding-right: 24px;
	}
	
	.init-content-container {
		display: flex;
		flex-direction: column;
		padding-left: 24px;
		padding-right: 24px;
		margin-top: 22px;
	}
	
	.init-content-header {
		justify-content: space-between;
		align-items: center;
		height: 100%;
		width: 100%;
		margin-bottom: 6px;
	}
	
	.init-content-header-title {
		font-size: 14px;
		line-height: 20px;
		width: 56px;
		color: #2e2e2e;
	}
	
	.init-content-body {
		margin-bottom: 27px;
		overflow: hidden;
		max-height: 80px;
	}
	
	.init-content-tag-container {
		margin-right: 10px;
		margin-top: 11px;
	}
	
	.search-result-list-container {
		display: flex;
		flex: 1;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		position: relative;
	}
	.search-result-list {
		display: flex;
		flex: 1;
		flex-direction: column;
		box-sizing: border-box;
		height: 100%;
		width: 100%;
		position: absolute;
		overflow: auto;
	}
</style>
