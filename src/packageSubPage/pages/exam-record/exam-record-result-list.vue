<template>
	<list v-if="!loading" class="list" ref="page" @loadMore="onLoadMore" :showLoadMore="false">		
		<div class="container" v-for="item in examRecordResults" :key="item._id">
			<h2 class="date">
				<span class="date-detail">{{parseDate(item.recordedAt)}}</span>
			</h2>
			<div class="data">
				<div v-for="(v, k) in item.result && item.result" :key="k">
					<div v-if="questionMap[k].type === 'matrixdynamic'" v-for="q in v" :key="q">
						<div class="data-item" v-if="q[eye]" v-for="eye in Object.keys(q)" :key="eye">
							<span class="data-item-title">
								{{`${questionMap[k].title}${eye === 'left' ? '左眼(L/OS)' : '右眼(R/OD)'}`}}
							</span>
							<span class="data-item-detail">{{q[eye]}}</span>
						</div>
					</div>
					<div v-if="questionMap[k].type === 'text'">
						<div class="data-item">
							<span class="data-item-title">
								{{`${questionMap[k].title}`}}
							</span>
							<span class="data-item-detail">{{item.result[k] || ''}}</span>
						</div>
					</div>
				</div>
				<div class="data-image" v-if="item.screenshots && item.screenshots.length > 0">
					<image v-for="(image, index) in item.screenshots" class="data-image-item" :src="image" :key="index" />
				</div>
			</div>
			<div class="interaction-container">
				<div class="interaction-inner-container" :style="[{'color': '#7ED395'}]">
					<image class="interaction-image" :src="penIcon"></image>
					<span class="interaction-text" @click="navigateToEdit(item)">编辑</span>
				</div>
				<div class="interaction-inner-container" :style="[{'color': '#7E92D3'}]">
					<image class="interaction-image" :src="deleteIcon"></image>
					<span class="interaction-text" @click="deleteResult(item)">删除</span>
				</div>
			</div>
		</div>
		<uniLoadMore v-if="!examRecordResults || examRecordResults.length <= 0" class="load-more" :status="loadMoreStatus" 
			:contentText="contentText" @clickLoadMore="clickLoadMore" />
	</list>
</template>

<script>
	import { PAGES } from '@/common/constants';
	import { getStaticResource } from '@/common/util';
	import { 
		EXAM_RECORD_RESULT_GETTER_GET_ALL, 
		EXAM_RECORD_RESULT_MUTATION_UPDATE, 
		EXAM_RECORD_RESULT_MUTATION_DELETE_ONE 
	} from '@/store/examRecordResultStore';
	import { EXAM_RECORD_MUTATION_UPDATE } from '@/store/examRecordStore';
	import list from '@/components/list/index';
	import { format } from 'fecha';
	import { buildQustionMapFromResults } from '@/packageSubPage/common/helpers/questionHelper';
	import { examRecordResultsBySelf, deleteExamRecordResult } from '@/common/apis/examRecordResult';
	import { mapState } from 'vuex';
	import { login } from '@/common/helpers/authHelper';
	import { addVisitSelf } from "@/common/apis/visit";
	import Strings from '@/common/strings';
	import uniLoadMore from "@/components/uni-load-more";
	import spliter from "@/components/spliter";

	export default {
		components: { list, uniLoadMore, spliter },
		data() {
			return {
				loading: false,
				navigateFlag: false,
				loadMoreStatus: 'loading',
				deleteIcon: getStaticResource('delete-purple'),
				penIcon: getStaticResource('pen'),
				contentText: {
					contentdown: "还没有健康记录，点击快速添加~", contentrefresh: "正在加载...", contentnomore: "还没有健康记录，点击快速添加~",
				},
			};
		},
		computed: {
			examRecordResults() {
				let results = this.$store.getters[EXAM_RECORD_RESULT_GETTER_GET_ALL]() || [];
				results = [ ...results ].reverse();
				return results;
			},
			questionMap() {
				let results = this.$store.getters[EXAM_RECORD_RESULT_GETTER_GET_ALL]() || [];
				return buildQustionMapFromResults(results, 'examRecord') || {};
			},
			...mapState({
				self: state => state.userStore.self,
			})
		},
		async onLoad() {
			this.loading = true;
			uni.showLoading({ title: Strings.GLOBAL.LOADING });
			
			if(!this.self._id) await login(this);
			
			uni.hideLoading();
			this.loading = false;
		},
		onReady() {
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline'],
				title: PAGES.EXAM_RECORD.title,
				path: PAGES.EXAM_RECORD.path,
				content: PAGES.EXAM_RECORD.description,
			});

			addVisitSelf(null, PAGES.EXAM_RECORD_RESULT_LIST.ref);	
			
			this.loadMore();
		},
		onShareAppMessage(res) {
			return {
				title: PAGES.EXAM_RECORD.title,
				path: PAGES.EXAM_RECORD.path,
				content: PAGES.EXAM_RECORD.description,
			}
		},
		methods: {
			async onLoadMore(refresh, callback) {
				try {
					let result = await examRecordResultsBySelf(this.self._id, { skip: 0, limit: 1000, sort: { recordedAt: 1 } });
					result = result && result.data && result.data.examRecordResultsBySelf;
					this.$store.commit(EXAM_RECORD_RESULT_MUTATION_UPDATE, {items: result, });
					this.$store.commit(EXAM_RECORD_MUTATION_UPDATE, {items: result.map(r => r.examRecord)});

					this.loadMoreStatus = 'nomore';
					callback(result, this.limit);
				} catch(e) {
					console.error(e);
					callback(null);
				}
			},
			navigateToEdit(item) {
				uni.navigateTo({ url: `${PAGES.EXAM_RECORD_ADD.path}?examRecordResultId=${item._id}` });
			},
			async deleteResult(item) {
				uni.showLoading({ title: Strings.GLOBAL.LOADING });
				
				const result = await deleteExamRecordResult(item._id);
				
				uni.hideLoading();
				if(result && result.data && result.data.deleteExamRecordResult && result.data.deleteExamRecordResult._id) {
					this.$store.commit(EXAM_RECORD_RESULT_MUTATION_DELETE_ONE, {id: item._id});
					uni.showToast({ title: '删除成功', duration: 2000 });
					return;
				}
				uni.showToast({ title: '删除失败，请重试。', duration: 2000 });
			},
			parseDate(date) {
				return format(date, "YYYY-MM-DD");
			},
			loadMore(index) {
				this.$refs.page.loadMore();
			},
			clickLoadMore() {
				const url = `${PAGES.EXAM_RECORD_ADD_LIST.path}`;
				if (this.navigateFlag) return;
				this.navigateFlag = true;
				uni.navigateTo({ url });
				setTimeout(() => {
					this.navigateFlag = false;
				}, 200);
			}
		}
	};
</script>

<style scoped>
	.list {
		display: flex;
		background: #f7fafb;
		height: 100%;
		position: absolute;
		width: 100%;
		flex-direction: column;
		padding: 0 20rpx;
		align-items: center;
		box-sizing: border-box;
	}
	
	.load-more {
		width: 100%;
		height: 28px;
		margin-right: 5px;
		color: #B2ACAC;
	}
	
	.container {
		width: 100%;
		margin: 24rpx 0 0 0;
	}

	.date {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background: #7ED395;
		height: 102rpx;
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;
		padding: 0 32rpx;
		position: relative;
	}
	

	.date-detail {
		font-size: 40rpx;
		font-weight: bold;
		color: #FFFFFF;
	}
	
	.spliter {
		margin: 0 34px;
	}
	
	.interaction-container {
		height: 124rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		position: relative;
		margin-bottom: 28rpx;
		background-color: #FFFFFF;
		padding: 0 4rpx;
	}
	
	.interaction-inner-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-right: 26rpx;
		border-width: 1rpx;
		border-radius: 34rpx;
		height: auto;
		padding: 10rpx 0;
		width: 154rpx;
		border-style: solid;
	}
	
	.interaction-image {
		width: 28rpx;
		height: 28rpx;
	}

	.interaction-text {
		margin-left: 12rpx;
		font-size: 28rpx;
		line-height: 40rpx;
	}

	.data {
		background: #fff;
		border-radius: 12rpx;
	}

	.data-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #E4E4E4;
		padding: 32rpx 0;
		margin: 0 28rpx;
	}

	.data-item-title {
		font-size: 32rpx;
		color: #2E2E2E;
		font-weight: normal;
	}

	.data-item-detail {
		font-size: 32rpx;
		color: #939393;
	}

	.data-image {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		padding: 20rpx;
	}

	.data-image-item {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
		margin: 12rpx 14rpx;
	}
</style>
