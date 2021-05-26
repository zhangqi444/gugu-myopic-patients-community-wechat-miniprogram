<template>
	<div class="container">
		<list :showLoadMore="false" class="label-container">
			<view class="label" :class="selectedExamRecordResults.includes(resultKey) ? 'label label-selected' : 'label'"
				v-for="(resultValue, resultKey) in parsedExamRecordResults" :key="resultKey" @click="clickTag(resultKey)">
				<span class="label-text">{{resultValue.title}}</span>
			</view>
			<div class='label label-add' @click="add">
				<span class="label-text">+ 添加</span>
			</div>
		</list>
		<echartElement :template="chartTemplate" :chartConfig="chartConfig" :canvasStyle="canvasStyle"
			:item="parsedExamRecordResults[selectedExamRecordResults[0]]" :itemTwo="parsedExamRecordResults[selectedExamRecordResults[1]]" />
	</div>
</template>

<script>
	import { PAGES } from '@/common/constants';
	import { EXAM_RECORD_RESULT_GETTER_GET_ALL, EXAM_RECORD_RESULT_MUTATION_UPDATE } from '@/store/examRecordResultStore';
	import { mapState } from 'vuex';
	import { getStaticResource } from '@/common/util';
	import echartElement from '@/packageSubPage/components/echart-element';
	import { addVisitSelf } from '@/common/apis/visit';
	import { parseExamRecordResults } from '@/packageSubPage/common/helpers/examRecordHelper';
	import Strings from '@/common/strings';
	import { login } from '@/common/helpers/authHelper';
	import { CHART_TEMPLATE } from '@/packageSubPage/common/helpers/chartHelper';
	import list from '@/components/list/index';
		
	export default {
		components: { echartElement, list },
		data() {
			return {
				loading: true,
				parsedExamRecordResults: {},
				contentText: {
					contentdown: "还没有健康记录，快来添加吧~", contentrefresh: "正在加载...", contentnomore: "还没有健康记录，快来添加吧~",
				},
				canvasStyle: { 
					width: uni.getSystemInfoSync().windowWidth - 62 - uni.getSystemInfoSync().safeAreaInsets.right + 'px', 
					height: uni.getSystemInfoSync().windowHeight + uni.getSystemInfoSync().safeAreaInsets.bottom + 'px' ,
				},
				chartConfig: { },
				selectedExamRecordResults: [],
				chartTemplate: CHART_TEMPLATE.DUAL_YAXIS
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
		async onLoad(option) {
			
			this.loading = false;
			
			if (!this.self._id) {
				this.loading = true;
				uni.showLoading({ title: Strings.GLOBAL.LOADING });
				await login(this);
				uni.hideLoading();
				this.loading = false;
			}
		},
		async onReady() {
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline'],
				title: PAGES.EXAM_RECORD.title,
				path: PAGES.EXAM_RECORD.path,
				content: PAGES.EXAM_RECORD.description,
			});
		
			addVisitSelf(null, PAGES.EXAM_RECORD_ANALYZE.ref);
		},
		watch: {
			examRecordResults: {
				handler: function(value) {					
					this.parsedExamRecordResults = Object.assign({}, parseExamRecordResults(this.examRecordResults)) || {};
					if(this.parsedExamRecordResults && Object.keys(this.parsedExamRecordResults).length > 0 && this.selectedExamRecordResults.length === 0) {
						const keys = Object.keys(this.parsedExamRecordResults);
						this.selectedExamRecordResults.push(keys[0]);
						this.selectedExamRecordResults.push(keys[1]);
					}
					
					this.loadMoreHide = !this.parsedExamRecordResults || Object.keys(this.parsedExamRecordResults).length <= 0;
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
			clickTag(key) {
				if(this.selectedExamRecordResults.length >= 2) this.selectedExamRecordResults.shift();
				
				this.selectedExamRecordResults.push(key);
			},
 			add() {
				uni.navigateTo({ url: PAGES.EXAM_RECORD_ADD_LIST.path });
			}
		}
	};
</script>

<style scoped>
	
	.container {
		display: flex; 
		position: absolute; 
		flex-direction: row;
		width: 100%; 
		height: 100%;
		box-sizing: border-box;
		overflow: hidden;
		--safe-area-inset-bottom: env(safe-area-inset-bottom);
		padding-bottom: calc(var(--safe-area-inset-bottom));
		--safe-area-inset-left: env(safe-area-inset-left);
		padding-left: calc(10px + var(--safe-area-inset-left));
		--safe-area-inset-right: env(safe-area-inset-right);
		padding-right: calc(10px + var(--safe-area-inset-right));
	}
	
	.label {
		display: flex;
		height: 23px;
		width: 62px;
		justify-content: center;
		align-items: center;
		border-width: 1px;
		border-style: solid;
		border-color: #979797;
		border-radius: 16px;
		box-sizing: border-box;
		margin-bottom: 9px;
		color: #383838;
		box-shadow: 2px rgba(0, 0, 0, 0.16);
	}
	
	.label-text {
		font-size: 10px;
		line-height: 15px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 54px;
		text-align: center;
	}
	
	.label-add {
		background-color: #E8E8E8;
		border-width: 0px;
	}
	
	.label-selected {
		border-color: #7ED395;
		background-color: #E8FFEE;
		color: #36BF56;
	}
</style>
