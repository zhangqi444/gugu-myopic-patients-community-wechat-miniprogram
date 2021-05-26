<template>
	<view class="root">
		<uniPopup id="errorPopup" ref="errorPopup" type="message">
			<uniPopupMessage type="error" :message="errorMessage" :duration="2000"></uniPopupMessage>
		</uniPopup>
		<view class="form-container">
			<scroll-view class="form" :show-scrollbar="true" :scroll-anchoring="true">
				<view class="date">
					<date-input :date="examRecordResult.recordedAt" @open="onDatePickerOpen" @confirm="onDatePickerConfirm" 
						title="检查日期" @close="onDatePickerClose" />
				</view>
				<view class="uni-form-item uni-column page" v-for="(page, index) in examRecord.content" :key="index">
					<view class="question" v-for="(question, questionIndex) in page.elements" :key="questionIndex">
						<questionText :wrapperTitleStyle="wrapperTitleStyle" :wrapperDescriptionStyle="wrapperDescriptionStyle"
							wrapperDescriptionPosition="bottom" :question="question" v-if="question.type === 'text'"
							:inputStyle="inputStyle" @change="onTextChange($event, question)" :result="examRecordResult.result[question.name]" />
						<matrixDynamic :wrapperTitleStyle="wrapperTitleStyle" :wrapperDescriptionStyle="wrapperDescriptionStyle"
							wrapperDescriptionPosition="bottom" :question="question" v-if="question.type === 'matrixdynamic'" 
							:inputStyle="inputStyle" :spliterStyle="spliterStyle" :choiceStyle="choiceStyle"
							@change="onMatrixdynamicChange($event, question)" :result="examRecordResult.result[question.name]" />
					</view>
				</view>
				<image-uploader title="上传报告单" titleTips="(供临床医师参考)" @change="screenshotsChange" :previews="examRecordResult.screenshots" />
				<view class="note">
					<span class="note-text">备注</span>
					<textarea class="note-input" placeholder="请添加任意内容" :value="examRecordResult.note || ''" @input='onNoteInput' />
				</view>
			</scroll-view>
		</view>
		<view v-if="showSaveButton" class="bottom-container">
			<view class="button" @click="finish">保存记录</view>
		</view>
	</view>
</template>

<script>
	import matrixDynamic from '@/packageSubPage/components/questions/matrixdynamic';
	import questionText from '@/packageSubPage/components/questions/text';
	import DateInput from '@/packageSubPage/pages/exam-record/add/date-input';
	import Button from '@/components/button';
	import ImageUploader from '@/packageSubPage/pages/exam-record/add/image-uploader';
	import { EXAM_RECORD_GETTER_GET_ONE, EXAM_RECORD_MUTATION_UPDATE_ONE } from "@/store/examRecordStore";
	import { 
		EXAM_RECORD_RESULT_GETTER_GET_ONE, 
		EXAM_RECORD_RESULT_MUTATION_IN_PROGRESS_UPDATE_ONE,
		EXAM_RECORD_RESULT_GETTER_IN_PROGRESS_GET_ONE,
		EXAM_RECORD_RESULT_MUTATION_UPDATE_ONE
	} from "@/store/examRecordResultStore";
	import { mapState } from 'vuex';
	import Strings from '@/common/strings';
	import { examRecord } from '@/common/apis/examRecord';
	import { login } from '@/common/helpers/authHelper';
	import { PAGES, APP } from '@/common/constants';
	import { getStaticResource } from "@/common/util";
	import { addExamRecordResult, updateExamRecordResult } from "@/common/apis/examRecordResult";
	import { buildInitResult, VALIDATION_TYPE } from "@/packageSubPage/common/helpers/questionHelper";
	import uniPopup from '@/components/uni-popup/uni-popup';
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog';
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message';
	import { addVisitSelf } from "@/common/apis/visit";
	import { aliyunSignature } from '@/common/apis/aliyun';
	import { isQuestionPageResultValid } from "@/packageSubPage/common/helpers/questionHelper";
	import { objectMap } from '@/common/util';

	export default {
		components: { uniPopup, uniPopupDialog, uniPopupMessage, ImageUploader, Button, matrixDynamic, questionText, DateInput },
		data() {
			return {
				examRecordId: null,
				examRecordResultId: null,
				errorMessage: '',
				showSaveButton: true,
				imageUploadUrl: null,
				wrapperTitleStyle: {
					'margin-bottom': '8px',
					'color': '#2E2E2E',
					'font-size': '16px',
					'line-height': '24px',
					'text-overflow': 'ellipsis',
					'display': '-webkit-box',
					'-webkit-line-clamp': '1',
					/* number of lines to show */
					'-webkit-box-orient': 'vertical',
					'overflow': 'hidden',
					'padding': 0,
				},
				wrapperDescriptionStyle: {
					'color': '#979797',
					'font-size': '12px',
					'line-height': '17px',
					'text-overflow': 'ellipsis',
					'display': '-webkit-box',
					'-webkit-line-clamp': '2',
					/* number of lines to show */
					'-webkit-box-orient': 'vertical',
					'overflow': 'hidden',
					'text-align': 'right',
					'margin': '10px 0 0 0',
					'padding': 0,
				},
				inputStyle: {
					'height': '50px',
					'border-radius': '6px',
					'padding': '0 15px',
					'font-size': '16px',
					'background-color': '#F7F8FB',
					'box-sizing': 'border-box',
				},
				spliterStyle: {
					'background-color': '#FFFFFF',
					'height': '10px',
				},
				choiceStyle: {
					'position': 'relative',
					'display': 'flex',
					'flex-direction': 'row',
					'justify-content': 'flex-start',
					'align-items': 'center',
					'height': '50px',
					'border-radius': '6px',
					'padding': '0 14px',
					'background-color': '#F7FAFB',
					'font-size': '16px'
				}
			};
		},
		computed: mapState({
			self: state => state.userStore.self,
			examRecord() {
				return this.$store.getters[EXAM_RECORD_GETTER_GET_ONE](this.examRecordId);
			},
			examRecordResult() {
				if (!this.examRecordResultId) { // 创建
					return this.$store.getters[EXAM_RECORD_RESULT_GETTER_IN_PROGRESS_GET_ONE](this.examRecordId);
				} else { // 更新
					let result = this.$store.getters[EXAM_RECORD_RESULT_GETTER_GET_ONE](this.examRecordResultId);
					if (result && result.examRecord) {
						this.$store.commit(EXAM_RECORD_MUTATION_UPDATE_ONE, {item: result.examRecord});
						this.examRecordId = result.examRecord._id;
					}
					return result;
				}
			},
			isUpdating() {
				return !!this.examRecordResultId;
			}
		}),
		async onLoad(option) {
			this.loading = true;
			uni.showLoading({
			    title: Strings.GLOBAL.LOADING
			});
			
			this.examRecordId = option && option.examRecordId;
			this.examRecordResultId = option && option.examRecordResultId;
						
			if (!this.self._id) await login(this);
			
			// 如果是创建新记录，初始化结果数据结构
			if(!this.examRecordResultId) {
				this.$store.commit(EXAM_RECORD_RESULT_MUTATION_IN_PROGRESS_UPDATE_ONE, { 
					item: { result: buildInitResult(this.examRecord), user: this.self, examRecord: this.examRecord }, 
					key: this.examRecordId,
				});
			}
			
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
			
			addVisitSelf(this.examRecordResultId || this.examRecordId, PAGES.EXAM_RECORD_ADD.ref);
		},
		onShareAppMessage(res) {
			return {
				title: PAGES.EXAM_RECORD.title,
				path: PAGES.EXAM_RECORD.path,
				content: PAGES.EXAM_RECORD.description,
			}
		},
		methods: {
			async finish() {
				if(!this.validate()) return;
				
				try {
										
					this.loading = true;
					uni.showLoading({
						title: Strings.GLOBAL.LOADING
					});
					let result;
					const payload = { ...this.examRecordResult };
					delete payload.__typename;
					payload.updatedAt = Date.now();
					payload.examRecord = payload.examRecord._id;
					payload.user = payload.user._id;
					
					if(this.isUpdating) {
						delete payload._id;
						result = await updateExamRecordResult(this.examRecordResult._id, payload);
						result = result.data.updateExamRecordResult;
					} else {
						result = await addExamRecordResult(payload);
						result = result.data.addExamRecordResult;
					}
					
					if (result._id) {
						const item = { ...this.examRecordResult, _id: result._id };
						
						this.$store.commit(EXAM_RECORD_RESULT_MUTATION_IN_PROGRESS_UPDATE_ONE, { item, key: this.examRecordId });
						this.$store.commit(EXAM_RECORD_RESULT_MUTATION_UPDATE_ONE, { item, sortKey: 'recordedAt', desc: 1});
					
						this.examRecordResultId = result._id; // 需要加在212行获取item和commit之后
												
						const _self = this;
						uni.showModal({
							title: '添加成功', content: APP.SLOGAN,
							confirmText: '查看结果', cancelText: '继续添加',
							success: function (res) {
								if (_self.navigateFlag) return;
								_self.navigateFlag = true;
								if(res.confirm) {
									uni.navigateBack({ delta: 2 });
								} else {
									uni.navigateBack({ });
								}
								uni.$emit('newExamRecordAdded');
								setTimeout(() => {
									_self.navigateFlag = false;
								}, 200);
							}
						});
					}
					uni.hideLoading();
					this.loading = false;
				} catch (e) {
					console.error(e);
				}
			},
			validate() {
				if(!this.examRecordResult.recordedAt) {
					this.errorMessage = `请先输入检查日期。`;
					this.$refs.errorPopup.open();
					return false;
				}
				
				let isValid = true;
				const _self = this;
				this.examRecord.content.some(c => {
					
					// 验证必填项
					let isPageValid = isQuestionPageResultValid(c, _self.examRecordResult.result);
					
					if(isPageValid && !isPageValid.isValid) {
						switch(isPageValid.type) {
							case VALIDATION_TYPE.REQUIRED:
								this.errorMessage = `请先完善${isPageValid.question.title}对应的双眼数据，或将其清空。`
								this.$refs.errorPopup.open();
								break;
							case VALIDATION_TYPE.INPUT_TYPE:
								this.errorMessage = `请选择数字作为${isPageValid.question.title}的输入类型。`
								this.$refs.errorPopup.open();
								break;
							case VALIDATION_TYPE.BOTH_EYE_EXISTING_OR_NULL:
								this.errorMessage = `请确认已输入的${isPageValid.question.title}同时包含双眼，或将其清空。`
								this.$refs.errorPopup.open();
								break;
							default:
								break;
						}
						
						isValid = false
						return true;
					}
				});
					
				return isValid;
			},
			onMatrixdynamicChange(event, question) {
				const { rowIndex, columnIndex, columnName, value } = event;
				const result = Object.assign({}, this.examRecordResult.result);
				result[question.name][rowIndex][columnName] = value;
				this.updateData('result', result);
			},
			onTextChange(event, question) {
				const result = Object.assign({}, this.examRecordResult.result);
				result[question.name] = event.value;
				this.updateData('result', result);
			},
			onDatePickerConfirm(event) {
				this.showSaveButton = true;
				this.updateData('recordedAt', Date.parse(event.fulldate));
			},
			onDatePickerOpen(e) {
				this.showSaveButton = false;
			},
			onDatePickerClose(e) {
				this.showSaveButton = true;
			},
			onNoteInput(e) {
				this.updateData('note', e.detail.value);
			},
			screenshotsChange(list) {
				this.updateData('screenshots', list);
			},
			updateData(key, value) {				
				const examRecordResult = Object.assign({}, this.examRecordResult);
				examRecordResult[key] = value;
				
				if(this.isUpdating) {
					this.$store.commit(EXAM_RECORD_RESULT_MUTATION_UPDATE_ONE, { item: examRecordResult, sortKey: 'recordedAt', desc: 1});
				} else {
					this.$store.commit(EXAM_RECORD_RESULT_MUTATION_IN_PROGRESS_UPDATE_ONE, { item: examRecordResult, key: this.examRecordId });
				}
			}
		} 
	};
</script>

<style scoped>
	
	.root {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		overflow: auto;
		flex: 1;
		min-height: 100%;
		position: absolute;
		width: 100%;
		height: auto;
		background-color: #f9fafb;
		padding: 12px 10px 12px 10px;
		margin-bottom: calc(66px + var(--safe-area-inset-bottom));
	}
	
	.form-container {
		display: flex;
		flex: 1;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}
	
	.form {
		display: flex;
		flex: 1;
		flex-direction: column;
		height: 100%;
		width: 100%;
		position: relative;
	}

	.date {
		margin-bottom: 14px;
	}
	
	.page {
		margin-bottom: 14px;
		background-color: #FFFFFF;
		padding: 10px 15px 10px 15px;
		border-radius: 8px;
	}
	
	.question {
		flex-direction: column;
	}
	
	.note {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		padding: 20rpx 30rpx 40rpx 30rpx;
	}
	
	.note-text {
		color: #2E2E2E;
		margin-bottom: 20rpx;
		padding: 14rpx 0;
		font-size: 32rpx;
		line-height: 38rpx;
	}
	
	.note-input {
		background-color: #F7F8FB;
		height: 200rpx;
		font-size: 32rpx;
		line-height: 38rpx;
		padding: 14rpx 20rpx;
		width: auto;
	}

	.bottom-container {
		position: fixed;
		display: flex;
		background: #fff;
		padding: 10px 18px 10px 18px;
		--safe-area-inset-bottom: env(safe-area-inset-bottom);
		padding-bottom: calc(10px + var(--safe-area-inset-bottom));
		bottom: 0;
		width: 100%;
		z-index: 99999;
		margin: 0 -10px 0 -10px;
		box-sizing: border-box;
		box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.1);
	}

	.button {
		display: flex;
		width: 100%;
		margin: auto;
		height: 46px;
		justify-content: center;
		align-items: center;
		background: #7ED395;
		color: #FFFFFF;
		border-radius: 7px;
		font-size: 16px;
		font-weight: bold;
	}
</style>
