<template>
	<surveyQuestionWrapper :question="question" :showTitle="showTitle" :showDescription="showDescription">
		<view class="container" v-for="(row, rowIndex) in question.rows" :key="rowIndex">
			<text class="question-title-text">{{row.text}}</text>
			<view class="inner-container">
				<view class="item" v-for="(column, columnIndex) in question.columns" :key="columnIndex">
					<view class="choice" v-if="column.cellType === 'dropdown'">
						<text class="question-text">{{column.title}}</text>
						<picker class="picker" @change="change($event, rowIndex, row.value, columnIndex, column.name)" :value="values[row.value][column.name]" :range="ranges[columnIndex]">
							<view class="uni-input">{{ranges[columnIndex][values[row.value][column.name]]}}</view>
						</picker>
						<image class="image-arrow" :src="arrowIcon"></image>
					</view>
					<!--TODO: 数字键盘无法支持负数，此处只能使用text键盘 -->
					<input class="input" v-if="column.cellType === 'text' || column.cellType === 'number'" :value="values[row.value][column.name]" :placeholder="column.placeHolder || `请输入${column.title}`"
						:type="question.inputType === 'number' ? 'digit' : question.inputType"
						@blur="blur($event, rowIndex, row.value, columnIndex, column.name)"  />
					<view v-if="columnIndex < question.columns.length - 1" class="spliter"></view>
				</view>
			</view>
			<view v-if="rowIndex < question.rows.length - 1" class="spliter"></view>
			<view v-if="rowIndex < question.rows.length - 1" class="block"></view>
		</view>
	</surveyQuestionWrapper>
</template>

<script>
	import surveyQuestionWrapper from './wrapper';
	import { objectMap } from '@/common/util';
	import { getStaticResource } from "@/common/util";
	
	export default {
		components: { surveyQuestionWrapper },
		data() {
			return {
			};
		},
		props: {
			question: { 
				type: Object, 
				default: () => { return { columns: {}, choices: {}, rows: {} }; } 
			},
			result: { type: Object, default: () => {} },
			showPlacehoder: { type: Boolean,  default: true },
			showTitle: { type: Boolean, default: true },
			showDescription: { type: Boolean, default: true },
		},
		computed: {
			ranges() {
				const range = this.question.choices && this.question.choices.map(c => c.text);
				if(!range) return;
				const ranges = this.question.columns && this.question.columns.map(c => {
					const result = [ ...range ];
					if(this.showPlacehoder) {
						result.unshift('请选择');
					}
					return result;
				});
				return ranges;
			},
			valueOffset() {
				return this.showPlacehoder ? 1 : 0;
			},
			values() { // 所有picker的选项对应的索引
				if(this.question.choices) {
					return objectMap(this.result, rv =>
						objectMap(rv, v => {
							var value = 0;
							if(v !== undefined && v !== null) {
								value = this.question.choices.findIndex(c => c.value === v) + this.valueOffset;
							}
							return value;
						})
					);
				} else {
					return {...this.result};
				}
			},
			arrowIcon() {
				return getStaticResource('arrow');
			}
		},
		methods: {
			change(event, rowIndex, rowName, columnIndex, columnName) {
				const { value } = event.target;
				const resultValue = this.question.choices[value - this.valueOffset].value;
				this.$emit('change', { rowIndex, rowName, columnIndex, columnName, value: resultValue });
			},
			blur(event, rowIndex, rowName, columnIndex, columnName) {
				let { value } = event.target;
				value = value.trim() === '' ? null : value.trim();
				this.$emit('change', { rowIndex, rowName, columnIndex, columnName, value });
			}
		},
	}
</script>

<style>
	.container {
		flex-direction: column;
		display: flex;
		padding: 34rpx 20rpx 0px 0px;
	}
	.inner-container {
		flex-direction: column;
		display: flex;
		padding: 0px 20rpx 0px 0px;
	}
	.question-title-text {
		position: relative;
		font-size: 36rpx;
		color: #171717;
		line-height: 44rpx;
	}
	.item {
		display: flex;
		width: 100%;
		height: 102rpx;
		line-height: 102rpx;
		flex-direction: column;
	}
	.question-text {
		display: flex;
		justify-content: flex-start;
	}
	.picker {
		padding-right: 20rpx;
		display: flex;
		flex: 1;
		justify-content: flex-end;
	}
	.image-arrow {
		display: flex;
		justify-content: flex-end;
		align-self: center;
		width: 22.74rpx;
		height: 39.84rpx;
		line-height: 102rpx;
		padding-right: 38rpx;
	}
	.choice {
		width: 100%;
		height: 102rpx;
		font-size: 36rpx;
		line-height: 102rpx;
		display: flex;
		flex-direction: row;
	}
	.input {
		display: flex;
		justify-content: left;
		width: 100%;
		align-self: center;
		font-size: 36rpx;
		height: 104rpx;
	}
	.spliter {
		display: flex;
		position: relative;
		width: 100%;
		background-color: #EDEDED;
		height: 2rpx;
	}
	.block {
		display: flex;
		position: relative;
		width: 100%;
		height: 24rpx;
	}
</style>
