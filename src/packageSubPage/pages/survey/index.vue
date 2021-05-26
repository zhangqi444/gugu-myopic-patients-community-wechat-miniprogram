<template>
	<view v-if="!loading" class="container">
		<view class="image-container">
			<image class="image-survey-header" :src="surveyHeaderImage"></image>
		</view>
		<wuc-tab tab-class="tab-bar" :tab-list="tabList" :tabCur.sync="currentTab" @change="loadMore" textFlex="true"></wuc-tab>
		<view class="text-header">帮助简单评估，一切以医嘱为主</view>
		<swiper class="tab-box" ref="swiper1" :current="currentTab" :duration="300" @change="swipe">
			<swiper-item class="swiper-item" v-for="(tab, index) in tabList" :key="index">
				<list class="listview" @loadMore="onLoadMore" ref="page">
					<uni-cell class="uni-cell" v-for="(item, i) in tab.dataList" :key="item._id">
						<surveyItem v-if="tab.id === tabList[0].id" :ref="'survey-item-' + item._id" :item="item" @click="goToSurvey"/>
						<surveyResultItem v-if="tab.id === tabList[1].id" :ref="'survey-item-' + item._id" :item="item" @click="goToSurvey"/>
						<view class="spliter" v-if="i < tab.dataList.length - 1" />
					</uni-cell>
				</list>
			</swiper-item>
		</swiper>
		<view class="footer">
			<!-- TODO: 分享长图 -->
			<button class="button-share" open-type="share">分享</button>
			<button class="button-report" @click="clickMyReport($event)">我的报告</button>
		</view>
	</view>
</template>

<script>
	import wucTab from "@/components/wuc-tab/wuc-tab";
	import list from '@/components/list/index';
	import surveyItem from './list/survey-item';
	import surveyResultItem from './list/survey-result-item';
	import uniCell from '@/components/uni-cell';
	import { surveys } from '@/common/apis/survey';
	import { surveyResultsBySelf } from '@/common/apis/surveyResult';
	import { SURVEY_MUTATION_ADD, SURVEY_GETTER_GET_ONE } from '@/store/surveyStore';
	import { SURVEY_RESULT_MUTATION_ADD } from '@/store/surveyResultStore';
	import { mapState } from 'vuex';
	import { login } from '@/common/helpers/authHelper';
	import { PAGES, APP } from '@/common/constants';
	import { getStaticResource } from '@/common/util';
	import { addVisitSelf } from "@/common/apis/visit";
	import { getStaticResource } from '@/common/util';
	
	export default {
		components: { wucTab, list, surveyItem, surveyResultItem, uniCell },
		data() {
			return {
				surveyHeaderImage: getStaticResource('survey-header'),
				tabList: [
					{ id: 'allSurveys', name: '全部测评', dataList: [], skip: 0, },
					{ id: 'mySurveys', name: '我的测评', dataList: [], skip: 0, },
				],
				currentTab: 0, skip: 0, limit: 100, navigateFlag: false, loading: false
			};
		},
		computed: {	
			...mapState({
				self: state => state.userStore.self,
			})
		},
		onShareAppMessage(res) {
			return {
				title: PAGES.SURVEY.title,
				path: PAGES.SURVEY.path,
				content: PAGES.SURVEY.description,
			}
		},
		async onReady() {
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline'],
				title: PAGES.SURVEY.title,
				path: PAGES.SURVEY.path,
				content: PAGES.SURVEY.description,
			});
			
			if(!this.self._id) await login(this);
			
			addVisitSelf(null, PAGES.SURVEY.ref);	
			
			this.loadMore(this.currentTab);
		},
		methods: {
			swipe(e) {
				let { current } = e.target;
				this.currentTab = current;
				this.loadMore(current);
			},
			async onLoadMore(refresh, callback) {
				try {
					const currentTab = this.tabList[this.currentTab];
					let option = { skip: this.skip, limit: this.limit };
					let result = await this.loadAllSurveys(option);
					
					switch(currentTab.id) {
						case 'allSurveys':
							break;
						case 'mySurveys':
							option = { ...option, sort: { 'updatedAt': -1 } };
							result = await surveyResultsBySelf(this.self._id, option);
							result = result.data.surveyResultsBySelf;
							const _self = this;
							result = result.map(r => {
								const surveyId = r && r.survey && r.survey._id;
								const survey = surveyId && _self.$store.getters[SURVEY_GETTER_GET_ONE](surveyId);
								return survey ? { ...r, survey } : {};
							});
							result = result.filter(r => !!r._id);
							this.$store.commit(SURVEY_RESULT_MUTATION_ADD, { items: result });
							break;
						default:
							return;
					}
					
					currentTab.dataList = result;
					currentTab.skip = result.length;
					callback(result, this.limit);
				} catch(e) {
					console.error(e);
					callback(null);
				}
			},
			async loadAllSurveys(option) {
				let result = await surveys(option);
				result = result.data.surveys;
				this.$store.commit(SURVEY_MUTATION_ADD, { items: result });
				return result;
			},
			goToSurvey(item) {
				if (this.navigateFlag) return;
				
				let url;
				const currentTab = this.tabList[this.currentTab];
				this.navigateFlag = true;
				switch(currentTab.id) {
					case 'allSurveys':
						url = `${PAGES.SURVEY_DETAIL.path}?id=${item._id}`;
						break;
					case 'mySurveys':
						url = `${PAGES.SURVEY_RESULT.path}?id=${item._id}`;
						break;
					default:
						return;
				}
				uni.navigateTo( { url } );
				setTimeout(() => { this.navigateFlag = false; }, 200);
			},
			loadMore(index) {
				this.$refs.page[index].loadMore();
			},
			clickMyReport() {
				this.currentTab = 1;
				this.loadMore(1);
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	.container {
		display: flex;
		width: 100%;
		flex-direction: column;
	}
	.image-survey-header {
		display: flex;
		width: 100%;
		height: 150px;
	}
	.tabs {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
	}
	.tab-bar {
		width: 100%;
		height: 40px;
		color: #2E2E2E;
	}
	/* #ifndef APP-NVUE */
	.tab-bar ::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	/* #endif */
	.text-header {
		width: 100%;
		height: 25.03px;
		background-color: #F6F6F6;
		color: #BFBFBF;
		font-size: 12px;
		line-height: 22px;
		text-align: center;
	}
	.tab-box {
		flex: 1;
		--safe-area-inset-bottom: env(safe-area-inset-bottom);
		margin-bottom: calc(62px + var(--safe-area-inset-bottom));
	}
	.swiper-item {
		display: flex;
		flex:1;
		flex-direction: column;
		height: 100%;
		width: 100%;
		position: relative;
		overflow: auto;
	}
	.listview {
		display: flex;
		height: 100%;
		width: 100%;
		flex: 1;
	}
	.uni-cell {
		height: 129px;
	}
	.spliter {
		background-color: #E4E4E4;
		height: 1px;
	}
	.footer {
		position: fixed;
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		bottom: 0px;
		padding-top: 10px;
		background-color: #F6F6F6;
		--safe-area-inset-bottom: env(safe-area-inset-bottom);
		padding-bottom: calc(10px + var(--safe-area-inset-bottom));
	}
	.button-report {
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
	.button-share {
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
