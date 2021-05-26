<template>
	<view v-if="!loading" class="container">
		<view class="article-list-container">
			<articleList class="article-list" @loadMore="loadMoreArticles" limit="100" ref="articleList"/>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { articleWikis } from "@/common/apis/article";
	import { ARTICLE_GETTER_GET_ONE, ARTICLE_MUTATION_UPDATE } from "@/store/articleStore";
	import articleList from "@/components/article-list/index";
	import { PAGES } from '@/common/constants';
	
	export default {
		components: { articleList },
		data() {
			return {
				skip: 0, limit: 100, navigateFlag: false, loading: false
			};
		},
		computed: mapState({

		}),
		onShareAppMessage(res) {
		    if (res.from === 'menu') {// 来自页面内分享按钮
				return {
					title: APP.APP_NAME,
					path: PAGES.WIKI.path,
					content: APP.SLOGAN,
				}
		    }
		},
		onReady() {			
			if(this.$refs["articleList"]) {
				this.$refs["articleList"].$refs.list.loadMore();
			} else {
				setTimeout(() => {
					this.$refs["articleList"].$refs.list.loadMore();
				}, 200)
			}
		},
		methods: {
			async loadMoreArticles(id, option, callback) {
				try {
					var articlesResult = await articleWikis({ ...option, sort: { 'createdAt': -1 } });
					articlesResult = articlesResult && articlesResult.data && articlesResult.data.articles || [];					
					this.$store.commit(ARTICLE_MUTATION_UPDATE, {items: articlesResult});
					callback(articlesResult);
				} catch(e) {
					console.error(e);
					callback(null);
				}
			},
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
	
	.article-list-container {
		display: flex;
		flex: 1;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		position: relative;
	}
	.article-list {
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
