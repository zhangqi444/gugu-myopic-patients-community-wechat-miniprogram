<template>
	<view class="container">
		<scroll-view class="listview" :enableBackToTop="true" :scroll-y="true" @scrolltolower="loadMore($event, false)" 
			:refresher-enabled="refresherEnabled" @refresherrefresh="onRefresh" :refresher-triggered="refreshing">
            <!-- <uni-refresh class="refresh" @refresh="onRefresh" @pullingdown="onPullingDown" :display="refreshing ? 'show' : 'hide'">
                <div class="refresh-view">
                    <image class="refresh-icon" :src="refreshIcon" :style="{width: (refreshing || pulling) ? 0: '32px'}"
                        :class="{'refresh-icon-active': refreshFlag}"></image>
                    <uni-load-more v-if="refreshing" class="loading-icon" status="loading" :contentText="loadingMoreText"></uni-load-more>
                    <text class="loading-text">{{refreshText}}</text>
                </div>
            </uni-refresh> -->
			<slot />
			<uni-load-more
				v-if="showLoadMore"
				class="loading-icon"
				showIcon="true"
				:status="isLoading ? 'loading' : (isNoData ? 'noMore' : 'more')" 
				@clickLoadMore="clickLoadMore"
				:contentText="loadingMoreText" />
			<slot name="footer"></slot>
        </scroll-view>
		<no-data class="no-data" v-if="isRetryable" @retry="loadMore"></no-data>
	</view>
</template>

<script>
	import { friendlyDate } from '@/common/util';
	
	import uniList from '@/components/uni-list';
	import uniCell from '@/components/uni-cell';
	import uniRefresh from '@/components/uni-refresh';
	import uniLoadMore from '@/components/uni-load-more';
	import noData from '@/components/nodata';
	import Strings from '@/common/strings';

	export default {
		components: {
			uniList,
			uniCell,
			uniRefresh,
			uniLoadMore,
			noData
		},
		props: {
			limit: { type: Number },
			refresherEnabled: { type: Boolean, default: false },
			showLoadMore: { type: Boolean, default: true },
			dataList: { type: Array, default: () => [] }
		},
		data() {
			return {
				pulling: false,
				refreshing: false,
				refreshFlag: false,
				refreshText: "",
				isLoading: false,
				loadingText: Strings.GLOBAL.LOADING,
				noMoreDataText: Strings.GLOBAL.NO_MORE_DATA,
				isNoData: false,
				isRetryable: false,
				pulling: false,
				angle: 0,
				loadingMoreText: {
					contentdown: '查看更多',
					contentrefresh: Strings.GLOBAL.LOADING,
					contentnomore: Strings.GLOBAL.NO_MORE_DATA
				},
				refreshIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5QTFRFcHBw3Nzct7e39vb2ycnJioqK7e3tpqam29vb////D8oK7wAAAAp0Uk5T////////////ALLMLM8AAABxSURBVHja7JVBDoAgDASrjqj//7CJBi90iyYeOHTPMwmFZrHjYyyFYYUy1bwUZqtJIYVxhf1a6u0R7iUvWsCcrEtwJHp8MwMdvh2amHduiZD3rpWId9+BgPd7Cc2LIkPyqvlQvKxKBJ//Qwq/CacAAwDUv0a0YuKhzgAAAABJRU5ErkJggg=="
			}
		},
		created() {
			this.pullTimer = null;
		},
		onPullDownRefresh() {
			this.loadMore();
		},
		methods: {
			loadMore(event, refresh) {
				if (this.isLoading) return;
				
				this.isLoading = true;
				this.isNoData = false;
				this.isRetryable = false;
				
				this.$emit('loadMore', refresh, (result, limit) => {
					if(!result) {
						if (result.length == 0) {
							this.isRetryable = true;
						}
						this.isLoading = false;
						return;
					}
					this.isNoData = (result.length < limit);
					this.isLoading = false;
					
					if(refresh) {
						this.refreshing = false;
						this.refreshFlag = false;
						this.refreshText = "已刷新";
						if (this.pullTimer) {
							clearTimeout(this.pullTimer);
						}
						this.pullTimer = setTimeout(() => {
							this.pulling = false;
						}, 1000);
					}
				});
			},
			clear(result) {
				result.length = 0;
				this.requestParams.skip = 0;
			},
			clickLoadMore(status) {
				if(status && status.detail && status.detail.status === 'more') {
					this.loadMore();
				}
			},
			// closeItem(index) {
			// 	uni.showModal({
			// 		content: '不感兴趣？',
			// 		success: (res) => {
			// 			if (res.confirm) {
			// 				this.dataList.splice(index, 1);
			// 			}
			// 		}
			// 	})
			// },
			refreshData(e) {
				if (this.isLoading) {
					return;
				}
				this.pulling = true;
				this.refreshing = true;
				this.refreshText = "正在刷新...";
				this.loadMore(e, true);
			},
			onRefresh(e) {
				this.refreshData(e);
			},
			// onPullingDown(e) {
				
			// 	if (this.refreshing) {
			// 		return;
			// 	}
				
				// var angle = (e.pullingDistance) / e.viewHeight * 180;
				// if (angle > 180) {
				// 	angle = 180;
				// }
				// tab.angle = angle;

			// 	this.pulling = false;
			// 	if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
			// 		this.refreshFlag = true;
			// 		this.refreshText = "释放立即刷新";
			// 	} else {
			// 		this.refreshFlag = false;
			// 		this.refreshText = "下拉可以刷新";
			// 	}
			// }
		}
	}
</script>

<style scoped>
	.no-data {
		flex: 1;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
	}

	.container {
		display: flex;
		flex: 1;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}

	.listview {
		display: flex;
		flex: 1;
		flex-direction: column;
		height: 100%;
		width: 100%;
		position: relative;
	}

	.refresh {
		justify-content: center;
	}

	.refresh-view {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		width: 750rpx;
		height: 64px;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}

	.refresh-icon {
		width: 32px;
		height: 32px;
		transition-duration: .5s;
		transition-property: transform;
		transform: rotate(0deg);
		transform-origin: 15px 15px;
	}

	.refresh-icon-active {
		transform: rotate(180deg);
	}

	.loading-icon {
		width: 28px;
		height: 28px;
		margin-right: 5px;
		color: #B2ACAC;
	}

	.loading-text {
		margin-left: 2px;
		font-size: 16px;
		color: #999999;
	}
</style>
