<template>
	<view>
		<uniPopup id="errorPopup" ref="errorPopup" type="message">
			<uniPopupMessage type="error" :message="errorMessage" :duration="2000"></uniPopupMessage>
		</uniPopup>
		<uniPopup id="refPopup" ref="refPopup" type="bottom">
			<view class="bottom-popup-container" ref="refContainer">
				<parser class="parser" :html="item.reference" />
			</view>
		</uniPopup>
		<scroll-view v-if="!loading" class="container" :scroll-y="true">
			<view class="inner-container" v-for="(page, index) in item.content" v-if="currentPage === index" :key="index">
				<view class="spliter-top"></view>
				<view class="header-container">
					<image class="header-icon" :src="homelogoIcon"></image>
					<text class="header-text">测评内存仅作参考，不作为诊断意见</text>
				</view>
				<view v-if="item.reference" class="ref-button" @click="clickRef()">
					<image class="ref-image" :src="refIcon"/>						
					<text class="ref-text">{{"参考文献"}}</text>
				</view>
				<view v-else class="ref-button-placeholder"  />
				<view class="questions column" v-for="(question, questionIndex) in page.elements" :key="questionIndex">
					<view class="question-title-container">
						<text v-if="questionIndex === 0" class="question-title-index">{{`${index+1}/${surveyLength}`}}</text>
						<text class="question-title">{{question.title}}</text>
					</view>
					<!-- 单文本题 -->
					<surveyQuestionText :question="question" v-if="question.type === 'text'"
						@change="onSurveyQuestionTextChange($event, question)" :showTitle="false"
						:result="surveyResult.result[question.name] && surveyResult.result[question.name] + ''" />
					<!-- 动态矩阵题 -->
					<surveyQuestionMatrixdynamic :question="question" v-if="question.type === 'matrixdynamic'"
						@change="onSurveyQuestionMatrixdynamicChange($event, question)" :showTitle="false"
						:result="surveyResult.result[question.name]" />
					<!-- 下拉菜单矩阵题 -->
					<surveyQuestionMatrixdropdown :question="question" v-if="question.type === 'matrixdropdown'"
						@change="onSurveyQuestionMatrixdropdownChange($event, question)" :showTitle="false"
						:result="surveyResult.result[question.name]" />
					<!-- 单选题 -->
					<surveyQuestionRadiogroup :question="question" v-if="question.type === 'radiogroup'"
						@change="onSurveyQuestionRadioChange($event, question)" :showTitle="false"
						:result="surveyResult.result[question.name]" />
				</view>
			</view>
		</scroll-view>
		<view class="footer row">
			<button class="button-front" v-if="currentPage > 0" @click="previousPage">上一题</button>
			<button class="button" v-if="currentPage < surveyLength - 1" @click="nextPage">下一题</button>
			<button class="button" v-if="currentPage === surveyLength - 1" @click="finish">提交</button>
		</view>
	</view>
</template>

<script>
	import { SURVEY_GETTER_GET_ONE } from "@/store/surveyStore";
	import { 
		SURVEY_RESULT_MUTATION_ADD_ONE,
		SURVEY_RESULT_MUTATION_IN_PROGRESS_UPDATE_ONE,
		SURVEY_RESULT_GETTER_IN_PROGRESS_GET_ONE
	} from "@/store/surveyResultStore";
	import { mapState } from 'vuex';
	import surveyQuestionMatrixdynamic from "@/packageSubPage/components/questions/matrixdynamic";
	import surveyQuestionMatrixdropdown from "@/packageSubPage/components/questions/matrixdropdown";
	import surveyQuestionRadiogroup from "@/packageSubPage/components/questions/radiogroup";
	import surveyQuestionText from "@/packageSubPage/components/questions/text"
	import Strings from '@/common/strings';
	import { survey } from '@/common/apis/survey';
	import { login } from '@/common/helpers/authHelper';
	import { PAGES } from '@/common/constants';
	import { getStaticResource } from "@/common/util";
	import { addSurveyResult } from "@/common/apis/surveyResult";
	import { isSurveyQuestionVisible } from "@/packageSubPage/common/helpers/surveyHelper";
	import { buildInitResult, isQuestionPageResultValid, VALIDATION_TYPE } from "@/packageSubPage/common/helpers/questionHelper";
	import uniPopup from '@/components/uni-popup/uni-popup'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message'
	import { addVisitSelf } from "@/common/apis/visit";
	import parser from "@/components/parser";
	import { objectMap } from '@/common/util';
	
	export default {
		components: { uniPopup, uniPopupMessage, surveyQuestionMatrixdynamic, surveyQuestionRadiogroup, surveyQuestionMatrixdropdown, surveyQuestionText, parser },
		data() {
			return {
				id: null,
				currentPage: 0,
				resultPickerIndex: {},
				errorMessage: ''
			};
		},
		computed: mapState({
			self: state => state.userStore.self,
			item(state) { // survey
				if(!this.id) return {};			
				const result = this.$store.getters[SURVEY_GETTER_GET_ONE](this.id);
				return result;
			},
			surveyResult(state) {
				return this.$store.getters[SURVEY_RESULT_GETTER_IN_PROGRESS_GET_ONE](this.item._id);
			},
			surveyLength(state) {
				return this.item && this.item.content ? this.item.content.length : 0;
			},
			homelogoIcon() {
				return getStaticResource("home-logo");
			},
			refIcon() {
				return getStaticResource("exclamation");
			}
		}),
		async onLoad(option) {
			this.id = option && option.id;
			// 如果详情页面被通过分享直接点开，则需要加载内容
			if(!this.item || !this.item._id) {
				this.loading = true;
				uni.showLoading({
				    title: Strings.GLOBAL.LOADING
				});
				await this.load();
				uni.hideLoading();
				this.loading = false;
			}
			
			// Init
			const result = buildInitResult(this.item);
			const surveyResult = {
				result, user: this.self._id, survey: this.item._id, isCompleted: false
			};			
			this.$store.commit(SURVEY_RESULT_MUTATION_IN_PROGRESS_UPDATE_ONE, { item: surveyResult, key: this.item._id });
		},
		onReady() {
			addVisitSelf(this.item._id, PAGES.SURVEY_DETAIL.ref);	
		},
		onShareAppMessage(res) {
			return {
				title: PAGES.SURVEY_DETAIL.title,
				path: `${PAGES.SURVEY_DETAIL.path}?id=${this.item._id}`,
				content: "想全面评估孩子的眼健康？",
			}
		},
		methods: {
			async load() {
				if(!this.self._id) await login(this);
				
				if(this.id) {
					const result = await survey(this.id);
					this.$store.commit(SURVEY_MUTATION_ADD_ONE, result.data.survey);
				}
			},
			previousPage(e) {
				this.currentPage -= 1;
				if(!this.isQuestionVisible(this.item.content[this.currentPage])) this.previousPage(e);
			},
			nextPage(e, isSkip) {
				if(!isSkip && !this.validate()) return;
				
				this.currentPage += 1;
				if(!this.isQuestionVisible(this.item.content[this.currentPage])) {
					this.nextPage(e, true);
				}
			},
			isQuestionVisible(question) {
				return isSurveyQuestionVisible(question, this.surveyResult);
			},
			validate() {
				let isPageValid = isQuestionPageResultValid(this.item.content[this.currentPage], this.surveyResult.result);
				
				if(isPageValid && !isPageValid.isValid) {
					switch(isPageValid.type) {
						case VALIDATION_TYPE.REQUIRED:
							this.errorMessage = "请先完成本题目。"
							this.$refs.errorPopup.open();
							return false;
						case VALIDATION_TYPE.INPUT_TYPE:
							this.errorMessage = `请选择数字作为输入类型。`
							this.$refs.errorPopup.open();
							return false;
						case VALIDATION_TYPE.BOTH_EYE_EXISTING_OR_NULL:
							this.errorMessage = `请确认已输入的内容同时包含双眼，或将其清空。`
							this.$refs.errorPopup.open();
						default:
							return false;
					}
				}
				
				return true;
			},
			async finish() {
				if(!this.validate()) return;
				
				try {
					// TODO: 添加校验
					this.loading = true;
					uni.showLoading({
						title: Strings.GLOBAL.LOADING
					});
					const result = await addSurveyResult(this.surveyResult);
					uni.hideLoading();
					this.loading = false;
					if(result.data.addSurveyResult._id) {
						const surveyResult = result.data.addSurveyResult;
						this.$store.commit(SURVEY_RESULT_MUTATION_IN_PROGRESS_UPDATE_ONE, { item: surveyResult, key: surveyResult.survey });
						this.$store.commit(SURVEY_RESULT_MUTATION_ADD_ONE, { item: surveyResult });
						if (this.navigateFlag) return;
						this.navigateFlag = true;
						uni.redirectTo( { url: `${PAGES.SURVEY_RESULT.path}?id=${surveyResult._id}` } );
						setTimeout(() => { this.navigateFlag = false; }, 200);
					}
				} catch(e) {
					console.error(e);
				}
			},
			onSurveyQuestionMatrixdropdownChange(event, question) {
				const { rowIndex, rowName, columnIndex, columnName, value } = event;
				const surveyResult = Object.assign({}, this.surveyResult);
				surveyResult.result[question.name][rowName][columnName] = value;
				this.$store.commit(SURVEY_RESULT_MUTATION_IN_PROGRESS_UPDATE_ONE, { item: surveyResult, key: surveyResult.survey });
			},
			onSurveyQuestionRadioChange(event, question) {
				const {value} = event;
				const surveyResult = Object.assign({}, this.surveyResult);
				surveyResult.result[question.name] = event.value;
				this.$store.commit(SURVEY_RESULT_MUTATION_IN_PROGRESS_UPDATE_ONE, { item: surveyResult, key: surveyResult.survey });
			},
			onSurveyQuestionTextChange(event, question) {
				const {value} = event;
				const surveyResult = Object.assign({}, this.surveyResult);
				surveyResult.result[question.name] = value;
				this.$store.commit(SURVEY_RESULT_MUTATION_IN_PROGRESS_UPDATE_ONE, { item: surveyResult, key: surveyResult.survey });
			},
			onSurveyQuestionMatrixdynamicChange(event, question) {
				const { rowIndex, columnIndex, columnName, value } = event;
				const surveyResult = Object.assign({}, this.surveyResult);
				surveyResult.result[question.name][rowIndex][columnName] = value;
				this.$store.commit(SURVEY_RESULT_MUTATION_IN_PROGRESS_UPDATE_ONE, { item: surveyResult, key: surveyResult.survey });
			},
			clickRef(event) {
				this.$refs.refPopup.open();
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
	view {
		display: flex;
	}
	.container {
		display: flex;
		position: absolute;
		width: 100%;
		height: 100%;
		flex: 1;
		box-sizing: border-box;
		background-color: #F6F6F6;
		flex-direction: column;
		z-index: 0;
	}
	.inner-container {
		flex-direction: column;
		width: 100%;
		background-color: #FFFFFF;
		--safe-area-inset-bottom: env(safe-area-inset-bottom);
		margin-bottom: calc(62px + var(--safe-area-inset-bottom));
	}
	.spliter-top {
		height: 8px;
		width: 100%;
		background: #F7FAFB;
	}
	.header-container {
		margin: 0 0 18px 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.header-icon {
		padding: 25px 5px 0 19px;
		padding-right: 5px;
		width: 91px;
		height: 22px;
	}
	.header-text {
		padding: 24px 0 0 0;
		font-size: 12px;
		color: #9B9B9B;
	}
	.ref-button {
		display: flex;
		flex-direction: row;
		align-self: flex-end;
		padding: 0 20px 18px 0;
	}
	.ref-image {
		height: 14px;
		width: 14px;
	}
	.ref-text {
		line-height: 14px;
		font-size: 14px;
		margin: 0 0 0 3px;
	}
	.ref-button-placeholder {
		height: 34px;
	}
	.parser {
		padding: 18px;
		display: block;
	}
	.bottom-popup-container {
		background-color: white;
		display: flex;
		flex-direction: column;
		border-top-left-radius: 5%;
		border-top-right-radius: 5%;
		--safe-area-inset-bottom: env(safe-area-inset-bottom);
		padding-bottom: calc(var(--safe-area-inset-bottom));
		margin-bottom: calc(0px - var(--safe-area-inset-bottom));
	}
	.question-title-container {
		margin: 0 0 11px 0;
		align-items: center;
	}
	.question-title-index {
		position: relative;
		font-size: 15px;
		border-radius: 6px;
		line-height: 15px;
		text-align: center;
		color: #FFFFFF;
		background-color: #78DD73;
		padding: 5px;
	}
	.question-title {
		position: relative;
		padding-left: 11px;
		font-size: 18px;
		color: #171717;
		line-height: 22px;
	}
	.questions {
		position: relative;
		display: flex;
		padding: 0 16px;
	}
	.footer {
		z-index: 1;
		position: fixed;
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
		bottom: 0px;
		padding: 10px 15px 0 15px;
		background-color: #F6F6F6;
		box-sizing: border-box;
		--safe-area-inset-bottom: env(safe-area-inset-bottom);
		padding-bottom: calc(10px + var(--safe-area-inset-bottom));
	}
	.button-front {
		margin: 0 9px 0 9px;
		flex: 1;
		height: 42px;
		font-size: 18px;
		color: #23BE52;
		border-radius: 5px;
		justify-content: center;
		align-items: center;
		line-height: 40px;
		background-color: #E6E6E6;
	}
	.button {
		margin: 0 9px 0 9px;
		flex: 1;
		height: 42px;
		font-size: 18px;
		color: #FFFFFF;
		border-radius: 5px;
		justify-content: center;
		align-items: center;
		line-height: 40px;
		background-color: #78DD73;
	}
</style>
