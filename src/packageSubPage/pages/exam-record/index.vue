<template>
	<view class="container">
		<view class="entry">
			<index-entry-item v-for="(item, index) in entryConfig" :title="item.title" :subTitle="item.subTitle" :iconUrl="item.iconUrl"
			 :navUrl="item.navUrl" :key="index"></index-entry-item>
		</view>
				
		<uniLoadMore v-if="loadMoreHide" class="load-more" :status="loadMoreStatus" :contentText="contentText" />
		<div v-show="!loadMoreHide">
			<view class="bottom-container">
				<view class="button" @click="analyze">
					<image class="icon" :src="chartIcon"></image>
					<span>定制我的图表分析</span>
				</view>
			</view>
			<div v-for="(resultKey, index) in Object.keys(parsedExamRecordResults)" :key="index">
				<div class="chart-container">
					<div class="chart-header">
						<span class="chart-title">{{parsedExamRecordResults[resultKey].title}}</span>
					</div>
					<echartElement :item="parsedExamRecordResults[resultKey]" :chartConfig="chartConfig" :canvasStyle="canvasStyle"/>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import indexEntryItem from '@/packageSubPage/pages/exam-record/index-entry-item';
	import { PAGES } from '@/common/constants';
	import { EXAM_RECORD_RESULT_GETTER_GET_ALL, EXAM_RECORD_RESULT_MUTATION_UPDATE } from '@/store/examRecordResultStore';
	import { EXAM_RECORD_MUTATION_UPDATE } from '@/store/examRecordStore';
	import { examRecordResultsBySelf } from '@/common/apis/examRecordResult';
	import { mapState } from 'vuex';
	import { getStaticResource } from '@/common/util';
	import echartElement from '@/packageSubPage/components/echart-element';
	import { addVisitSelf } from '@/common/apis/visit';
	import { parseExamRecordResults } from '@/packageSubPage/common/helpers/examRecordHelper';
	import Vue from 'vue';
	import Strings from '@/common/strings';
	import { login } from '@/common/helpers/authHelper';
	import uniLoadMore from "@/components/uni-load-more";

	export default {
		components: {echartElement, indexEntryItem, uniLoadMore},
		data() {
			return {
				loading: true,
				entryConfig: [
					{
						title: '添加记录',
						subTitle: '完善记录动态',
						iconUrl: getStaticResource('exam-record-add'),
						navUrl: PAGES.EXAM_RECORD_ADD_LIST.path
					},
					{
						title: '查看记录',
						subTitle: '查看历史记录',
						iconUrl: getStaticResource('exam-record-history'),
						navUrl: PAGES.EXAM_RECORD_RESULT_LIST.path
					}
				],
				questionMap: {},
				parsedExamRecordResults: {},
				loadMoreStatus: 'loading',
				loadMoreHide: false,
				loadNewChart: false,
				newExamRecordAdded: false,
				hasHidden: false,
				contentText: {
					contentdown: "还没有健康记录，快来添加吧~", contentrefresh: "正在加载...", contentnomore: "还没有健康记录，快来添加吧~",
				},
				canvasStyle: { width: '678rpx', height: '444rpx' },
				chartConfig: { },
				chartIcon: getStaticResource('metro-chart-dots'),
			};
		},
		computed: {
			...mapState({
				self: state => state.userStore.self,
			}),
			examRecordResults() {
				// 需要在onload中初始化数据，才能让图表正确渲染，因此此处等待this.loading被赋值再拉取数据
				if(this.loading) return [];
				return this.$store.getters[EXAM_RECORD_RESULT_GETTER_GET_ALL]();
			},
		},
		mounted() {
			this.load();
		},
		async onLoad(option) {
			
			if (!this.self._id) {
				this.loading = true;
				uni.showLoading({ title: Strings.GLOBAL.LOADING });
				await login(this);
				uni.hideLoading();
				this.loading = false;
			}
			
			// 如果该页面是从添加病历页面返回打开，那么如果此时需要新渲染一种chart，则必须彻底重新加载该页面，否则新出现的chart显示空白。
			// 该问题也可以通过在chart-element.vue中的loadCharts()方法中设置延迟加载来解决。
			uni.$on('newExamRecordAdded', (data) => {
				this.newExamRecordAdded = true;
			});
		},
		onShow() {
			if(this.newExamRecordAdded && this.loadNewChart) {
				this.newExamRecordAdded = false;
				this.loadNewChart = false;
				uni.redirectTo({ url: PAGES.EXAM_RECORD.path });
			}
		},
		onHide() {
			this.hasHidden = true;
		},
		async onReady() {
			this.loading = false;
			
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline'],
				title: PAGES.EXAM_RECORD.title,
				path: PAGES.EXAM_RECORD.path,
				content: PAGES.EXAM_RECORD.description,
			});
		
			addVisitSelf(null, PAGES.EXAM_RECORD.ref);
		},
		watch: {
			examRecordResults: {
				handler: function(value) {	
					this.parsedExamRecordResults = Object.assign({}, parseExamRecordResults(this.examRecordResults)) || {};
					this.loadMoreHide = !this.parsedExamRecordResults || Object.keys(this.parsedExamRecordResults).length <= 0;
					
					// 页面第一次渲染的时候不进行判定
					if(this.hasHidden && !this.loadNewChart) {
						this.loadNewChart = true;
					}
				},
				immediate: true,
				deep: true
			},
		},
		onShareAppMessage(res) {
			return {
				title: PAGES.EXAM_RECORD.title,
				path: PAGES.EXAM_RECORD.path,
				content: PAGES.EXAM_RECORD.description,
			}
		},
		methods: {
			async load() {
				try {
					let result = await examRecordResultsBySelf(this.self._id, { skip: 0, limit: 1000, sort: { recordedAt: 1 } });
					result = result && result.data && result.data.examRecordResultsBySelf;
					this.$store.commit(EXAM_RECORD_RESULT_MUTATION_UPDATE, {items: result});
					this.$store.commit(EXAM_RECORD_MUTATION_UPDATE, {items: result.map(r => r.examRecord)});
					this.loadMoreStatus = 'nomore';
				} catch (e) {
					console.error(e);
				}
			},
			analyze() {
				uni.navigateTo({
					url: PAGES.EXAM_RECORD_ANALYZE.path
				});
			}
		}
	};
</script>

<style scoped>
	
	.container {
		background: #F7F8FB;
		display: flex; 
		position: absolute; 
		flex-direction: column;
		width: 100%; 
		height: auto;
		min-height: 100%;
		box-sizing: border-box;
		overflow: auto;
		padding: 32rpx 36rpx 32rpx 36rpx;
	}

	.entry {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}
	
	.load-more {
		width: 100%;
		height: 56rpx;
		margin-right: 10rpx;
		color: #B2ACAC;
	}

	.chart-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		flex: 1;
		box-sizing: border-box;
		margin: 0 0 32rpx 0;
		padding: 32rpx 0;
		background-color: #FFFFFF;
	}
	
	.chart-header {
		padding: 0 0 20rpx 24rpx;
	}
	
	.chart-title {
		color: #2E2E2E;
		font-size: 28rpx;
		line-height: 40rpx;
	}

	.title {
		font-size: 18px;
		color: #888;
		font-weight: bold;
		margin: 20px 0 30px;
	}
	
	.bottom-container {
		display: flex;
		width: 100%;
		margin: 24rpx 0 24rpx 0;
	}
	
	.button {
		display: flex;
		width: 100%;
		height: 92rpx;
		justify-content: center;
		align-items: center;
		background: #7ED395;
		color: #FFFFFF;
		border-radius: 14rpx;
		font-size: 32rpx;
		font-weight: bold;
	}
	
	.icon {
		height: 28rpx;
		width: 28rpx;
		margin-right: 10rpx;
	}
</style>
