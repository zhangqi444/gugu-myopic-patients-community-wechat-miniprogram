<template>
	<view class="impression-container" :style="[containerStyle]">
		<view class="impression-inner-container" :style="[innerContainerStyle]" v-for="(impression, index) in impressionList" :key="index">
			<button class="impression-button" :style="[buttonStyle, (index === impressionList.length - 1 && buttonStyle) ? {'margin-right': '0'} : null]" plain="true" 
				:open-type="impression.openType" :id="item._id"
				hover-class="none" style="border-width: 0px;" @click="click($event, impression.type)" >
				<image class="impression-image" :style="[imageStyle]" :src="impression.icon"/>
			</button>
			<text v-if="showText" :class="textPosition !== 'top' ? 'impression-text' : 'impression-text-top'" >{{impression.text}}</text>
		</view>
	</view>
</template>

<script>
	import { getStaticResource } from "@/common/util";
	
	export default {
		data() {
			return {
			};
		},
		props: {
			item: { type: Object, default: () => {} },
			containerStyle: { type: Object, default: () => {} },
			innerContainerStyle: { type: Object, default: () => {} },
			buttonStyle: { type: Object, default: () => {} },
			imageStyle: { type: Object, default: () => {} },
			textPosition: { type: String, default: 'bottom' },
			showText: { type: Boolean, default: true }, // 是否显示按钮附加的文字
			showCommentButton: { type: Boolean, default: true }, // 是否显示评论按钮
		},
		computed: {
			impressionList() {
				const collectIcon = this.collected ? getStaticResource('collect-selected') : getStaticResource('collect');
				const thumbIcon = this.thumbed ? getStaticResource('thumb-selected') : getStaticResource('thumb');
				const commentIcon = getStaticResource('comment');
				const shareIcon = getStaticResource('share');
				
				const thumbCount = this.item && typeof(this.item.thumbCount) === 'number' ? this.item.thumbCount : 0;
				const collectCount = this.item && typeof(this.item.collectCount) === 'number' ? this.item.collectCount : 0;
				const commentCount = this.item && typeof(this.item.commentCount) === 'number' ? this.item.commentCount : 0;
				
				const isTextPositionTop = this.textPosition === 'top';
				
				let result = [
					{ type: 'thumb', icon: thumbIcon, text: isTextPositionTop ? thumbCount : `有帮助 ${thumbCount}` },
					{ type: 'collect', icon: collectIcon, text: isTextPositionTop ? collectCount : `已收藏 ${collectCount}` },
					{ type: 'comment', icon: commentIcon, text: `评论 ${commentCount}` },
					{ type: 'share', icon: shareIcon, text: isTextPositionTop ? '' : `分享`, openType: 'share' },
				];
				
				if(!this.showCommentButton) result.splice(2, 1);
				
				return result;
			},
			collected() {
				return this.item && this.item.self && this.item.self.collect && this.item.self.collect.value || false;
			},
			thumbed() {
				return this.item && this.item.self && this.item.self.thumb && this.item.self.thumb.value || false;
			},
		},
		methods: {
			click(event, type) {
				// TODO: 注意阻止点击穿透
				// event.stopPropagation();
				// event.preventDefault();
				this.$emit('click', type, this.item);
			},
		}
	}
</script>

<style scoped>
	.impression-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		border: 0rpx; 
		align-items: center;
		padding: 6rpx 0;
		background-color: #FFFFFF;
	}
	.impression-inner-container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		flex: 1;
	}
	.impression-text {
		line-height: 30rpx;
		font-size: 20rpx;
		color: #202020;
	}
	.impression-text-top {
		color: #505050;
		font-size: 20rpx;
		line-height: 20rpx;
		position: absolute;
		top: 0;
		left: 44rpx;
	}
	.impression-button {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0rpx;
		border-width: 0rpx;
		width: 56rpx;
		height: 56rpx;
	}
	.impression-image {
		width: 40rpx;
		height: 40rpx;
	}
</style>
