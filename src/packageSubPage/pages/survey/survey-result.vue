<template>
	<scroll-view v-show="!loading" class="container">
		<view class="header-container">
			<image class="header-icon" :src="homelogoIcon"></image>
			<text class="header-text">测评内存仅作参考，不作为诊断意见</text>
		</view>
		
		<echartElement class="chart-element" v-for="(resultValue, resultKey) in parsedSurveyResult" :item="resultValue" :key="resultKey" />
		
		<view class="spliter"></view>
		<view class="related-articles-container">
			<view class="related-articles-text-container">
				<text class="related-articles-text">相关推荐</text>
			</view>
			<view class="spliter-thin"></view>
			<articleList class="article-list" @loadMore="loadMoreArticles" :loadMoreEnabled="false" limit="10" ref="articleList"/>
		</view>
		<view class="footer">
			<button class="button-redo" @click="clickRedo($event)">重新测试</button>
			<!-- <button class="button-generate">生成我的报告</button> -->
		</view>
	</scroll-view>
</template>

<script>
	import { mapState } from 'vuex';
	import { PAGES } from '@/common/constants';
	import { SURVEY_RESULT_GETTER_GET_ONE } from "@/store/surveyResultStore";
	import { login } from '@/common/helpers/authHelper';
	import { getStaticResource } from "@/common/util";
	import { surveyResult } from "@/common/apis/surveyResult";
	import { parseSurveyResult } from '@/packageSubPage/common/helpers/surveyHelper';
	import { articles } from '@/common/apis/article';
	import { ARTICLE_MUTATION_ADD } from '@/store/articleStore';
	import articleList from '@/components/article-list/index';
	import { APP, ARTICLE_TYPE } from '@/common/constants';
	import { addVisitSelf } from "@/common/apis/visit";
	import Vue from 'vue';
	import echartElement from '@/packageSubPage/components/echart-element';
	
	export default {
		components: { articleList, echartElement },
		data() {
			return {
				id: null,
				loading: true,
				navigateFlag: false,
				parsedSurveyResult: {}
			};
		},
		computed: {
			...mapState({
				self: state => state.userStore.self,
				item(state) {
					if (!this.id) return {};
					const result = this.$store.getters[SURVEY_RESULT_GETTER_GET_ONE](this.id);
					return result;
				},
			}),
			homelogoIcon() {
				return getStaticResource('home-logo');
			},
		},
		watch: {
			item() {
				this.parsedSurveyResult = Object.assign({}, parseSurveyResult(this.item));
			}
		},
		onLoad(option) {
			this.id = option && option.id;
		},
		async onReady() { // 如果详情页面在应用内直接打开，此时内存中有缓存内容，则在页面渲染结束后加载更多异步信息
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline'],
				title: this.item.title,
				path: PAGES.SURVEY.path,
				content: this.item.content,
				imageUrl: this.item.cover
			});
			
			try {
				if(!this.self || !this.self._id) await login();
				
				addVisitSelf(this.item._id, PAGES.SURVEY_RESULT.ref);
				
				if(this.$refs["articleList"]) {
					this.$refs["articleList"].$refs.list.loadMore();
				} else {
					setTimeout(() => {
						this.$refs["articleList"].$refs.list.loadMore();
					}, 200)
				}
				
				this.loading = false;
			} catch(e) {
				console.error(e);
				return;
			}
		},
		onShareAppMessage(res) {
			return {
				title: PAGES.SURVEY_DETAIL.title,
				path: `${PAGES.SURVEY_DETAIL.path}?id=${this.item.survey._id}`,
				content: "想全面评估孩子的眼健康？",
			}
		},
		methods: {
			async loadMoreArticles(id, option, callback) {
				try {
					const condition = { type: ARTICLE_TYPE.DEFAULT };
					var articlesResult;
					articlesResult = await articles({ ...option, sort: { 'createdAt': -1 } }, condition);
					articlesResult = articlesResult 
						&& articlesResult.data 
						&& articlesResult.data.articles
						|| [];					
					this.$store.commit(ARTICLE_MUTATION_ADD, { items: articlesResult });
					callback(articlesResult);
				} catch(e) {
					console.error(e);
					callback(null);
				}
			},
			clickRedo() {
				this.navigateFlag = true;
				const url = `${PAGES.SURVEY_DETAIL.path}?id=${this.item.survey._id}`;
				uni.redirectTo( { url } );
				setTimeout(() => { this.navigateFlag = false; }, 200);
			},
			toJSON() {},
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
		flex: 1;
		box-sizing: border-box;
	}
	.header-container {
		margin: 0;
		padding: 0 0 28px 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.header-icon {
		padding-left: 19px;
		padding-top: 25px;
		padding-right: 5px;
		width: 91px;
		height: 22px;
	}
	.header-text {
		padding-top: 24px;
		font-size: 12px;
		color: #9B9B9B;
	}
	.spliter {
		height: 8px;
		width: 100%;
		background: #E4E4E4;
	}
	.spliter-thin {
		width: 100%;
		height: 1px;
		background-color: #E4E4E4;
	}
	.chart-element {
		display: flex;
		margin-bottom: 16px;
	}
	.related-articles-container {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.related-articles-text-container {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 40px;	
	}
	.related-articles-text {
		padding-left: 23px;
		font-weight: bold;
		font-size: medium;
	}
	.article-list {
		width: 100%;
		height: 100%;
	}
	.footer {
		position: fixed;
		bottom: 0;
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		padding-top: 10px;
		background-color: #F6F6F6;
		--safe-area-inset-bottom: env(safe-area-inset-bottom);
		padding-bottom: calc(10px + var(--safe-area-inset-bottom));
	}
	.button-generate {
		padding-left: 0px;
		padding-right: 0px;
		flex: 1;
		height: 42px;
		font-size: 18px;
		color: #23BE52;
		border-radius: 5px;
		justify-content: center;
		align-items: center;
		margin-right: 24px;
		margin-left: 9px;
		line-height: 40px;
		background-color: #E6E6E6;
	}
	.button-redo {
		padding-left: 0px;
		padding-right: 0px;
		flex: 1;
		height: 42px;
		font-size: 18px;
		color: #FFFFFF;
		border-radius: 5px;
		justify-content: center;
		align-items: center;
		margin-right: 9px;
		margin-left: 24px;
		line-height: 40px;
		background-color: #78DD73;
	}
</style>
