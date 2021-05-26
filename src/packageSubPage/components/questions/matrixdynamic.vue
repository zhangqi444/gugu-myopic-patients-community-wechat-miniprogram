<template>
	<wrapper :titleStyle="wrapperTitleStyle" :descriptionStyle="wrapperDescriptionStyle" 
		:descriptionPosition="wrapperDescriptionPosition" :question="question"
		:showTitle="showTitle" :showDescription="showDescription">
		<view class="question-row" v-for="rowIndex in question.rowCount" :key="rowIndex">
			<view class="header-column" v-for="(column, columnIndex) in question.columns" :key="columnIndex">
				<view class="choice" :style="[choiceStyle]" v-if="column.cellType === 'dropdown'">
					<text class="question-text">{{column.title}}</text>
					<picker class="picker" @change="change($event, rowIndex, columnIndex, column.name)" :value="values[rowIndex][column.name]" :range="ranges[columnIndex]">
						<view class="picker-inner-container">
							<span :class="[showPlacehoder && !values[rowIndex][column.name] ? 'input__unselect' : '']">
								{{(ranges[columnIndex])[values[rowIndex][column.name]]}}
							</span>
							<image class="image-arrow" :src="arrowIcon"></image>
						</view>
					</picker>
				</view>
				<!--TODO: 数字键盘无法支持负数，此处只能使用text键盘 -->
				<input class="input" :style="[inputStyle]" v-if="column.cellType === 'text' || column.cellType === 'number'"
					:type="question.inputType === 'number' ? 'digit' : question.inputType"
					:value="values[rowIndex][column.name]" :placeholder="column.placeHolder || `请输入${column.title}`"
					@blur="blur($event, rowIndex, columnIndex, column.name)" />
				<view v-if="columnIndex < question.columns.length - 1" class="spliter" :style="[spliterStyle]"></view>
			</view>
		</view>
	</wrapper>
</template>

<script>
	import wrapper from './wrapper';
	import { objectMap } from '@/common/util';
	import { getStaticResource } from "@/common/util";
	
	export default {
		components: { wrapper },
		data() {
			return {
			};
		},
		props: {
			question: { 
				type: Object, 
				default: () => { return { rowCount: 0, columns: {}, choices: {} }; } 
			},
			result: { type: Array, default: () => [] },
			showPlacehoder: { type: Boolean,  default: true },
			wrapperTitleStyle: { type: Object, default: () => {} },
			wrapperDescriptionStyle: { type: Object, default: () => {} },
			wrapperDescriptionPosition: { type: String, default: 'top' },
			inputStyle: { type: Object, default: () => {} },
			pickerStyle: { type: Object, default: () => {} },
			showTitle: { type: Boolean, default: true },
			showDescription: { type: Boolean, default: true },
			spliterStyle: { type: Object, default: () => {} },
			choiceStyle: { type: Object, default: () => {} },
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
				const values = this.result.map(row => 
					objectMap(row, v => {
						var value;
						if(this.question.choices) { // 如果问题是矩阵选择题，则假设全部子问题都是选择题
							if(v !== undefined && v !== null) {
								value = this.question.choices.findIndex(c => c.value === v) + this.valueOffset;
							} else {
								value = 0;
							}
						} else { // 否则假设全部问题都是填空题
							value = v;
						}
						return value;
					})
				);
				return values;
			},
			arrowIcon() {
				return getStaticResource('arrow');
			}
		},
		methods: {
			change(event, rowIndex, columnIndex, columnName) {
				const { value } = event.target;
				const choiceIndex = value - this.valueOffset;
				const resultValue = choiceIndex < 0 ? null : this.question.choices[choiceIndex].value;
				this.$emit('change', { rowIndex, columnIndex, columnName, value: resultValue });
			},
			blur(event, rowIndex, columnIndex, columnName) {
				let { value } = event.target;
				value = value.trim() === '' ? null : value.trim();
				this.$emit('change', { rowIndex, columnIndex, columnName, value });
			}
		},
	}
</script>

<style scoped>
	.header-column {
		display: flex;
		width: auto;
		flex-direction: column;
	}
	.question-row {
		display: flex;
		flex-direction: column;
	}
	.choice {
		width: 100%;
		height: 51px;
		font-size: 18px;
		line-height: 51px;
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
	}
	.question-text {
		display: flex;
		justify-content: flex-start;
	}
	.picker {
		display: flex;
		flex: 1;
		justify-content: flex-end;
		align-items: center;
	}
	.picker-inner-container {
		display: flex;
		flex-direction: row;
	}
	.image-arrow {
		display: flex;
		justify-content: flex-end;
		align-self: center;
		line-height: 51px;
		width: 11.37px;
		height: 19.92px;
		padding-left: 10px;
	}
	.input {
		display: flex;
		justify-content: left;
		width: 100%;
		align-self: center;
		font-size: 18px;
		height: 52px;
	}
	.input__unselect {
		color: #C1C1C1 !important;
		font-size: 16px !important;
		line-height: 24px !important;
	}
	.spliter {
		display: flex;
		background-color: #EDEDED;
		height: 1px;
		width: 100%;
	}
</style>
