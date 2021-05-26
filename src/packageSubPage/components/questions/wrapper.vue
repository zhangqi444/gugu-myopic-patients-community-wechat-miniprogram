<template>
	<view class="uni-form-item uni-column container">
		<view v-if="showTitle" class="title" :style="[titleStyle]">{{question.title}}</view>
		<text v-if="showDescription && descriptionPosition === 'top'" class="description" :style="[descriptionStyle]">{{question.description}}</text>
		<slot />
		<text v-if="showDescription && descriptionPosition === 'bottom'" class="description" :style="[descriptionStyle]">{{question.description}}</text>
	</view>
</template>

<script>	
	export default {
		name: 'wrapper',
		data() {
			return {
				index: [],
			};
		},
		props: {
			question: { 
				type: Object, 
				default: () => {
					return { title: "", rowCount: 0, columns: {}, choices: {} };
				},
			},
			titleStyle: { type: Object, default: () => {} },
			descriptionStyle: { type: Object, default: () => {} },
			descriptionPosition: { type: String, default: 'top' },
			showTitle: { type: Boolean },
			showDescription: { type: Boolean },
		},
		methods: {
		},
	}
</script>

<style scoped>
	.title {
		position: relative;
		padding-right: 60rpx;
		padding-left: 32rpx;
		font-size: 36rpx;
		color: #171717;
		line-height: 44rpx;
	}
	.description {
		display: flex;
		position: relative;
		line-height: 44rpx;
		padding: 0 0 26rpx 0;
		font-size: 24rpx;
		color: #9B9B9B;
	}
</style>
