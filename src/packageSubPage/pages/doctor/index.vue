<template>
	<view class="container">
		<scroll-view id="tab-bar" class="tab-bar" :scroll="false" :scroll-x="true" :show-scrollbar="false"
			 :scroll-into-view="scrollInto" scroll-anchoring="true">
			<view class="flex column">
				<view class="tab-item-containter">
					<view class="uni-tab-item" v-for="(tab,index) in tabList" :key="tab.id" :id="tab.id" :ref="'tabitem'+index"
						:data-id="index" :data-current="index" @click="ontabtap">
						<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<doctorDetails :item="item"></doctorDetails>
	</view>
</template>

<script>
	import doctorDetails from './doctor-details';
	import { doctor } from '@/common/apis/doctor';
	import { mapState } from 'vuex';
	import { DOCTOR_GETTER_GET_ONE } from '@/store/doctorStore';
	
	export default { 
		components:{ doctorDetails },
		data() {
			return {
				tabList: [
					{ id: 'tab01', name: '医生详情'},
					{ id: 'tab02', name: '预约挂号'}
				],
				currentTab: 0,
				scrollInto: '',
				id: ''
			};
		},
		computed: {
			...mapState({
				self: state => state.userStore.self
			}),
			item() {
				return this.id ? this.$store.getters[DOCTOR_GETTER_GET_ONE](this.id) : {};
			}
		},
		async onLoad(option) {
			this.id = option && option.id;
		},
		async onReady() {
			// this._lastTabIndex = 0;
			// this.swiperWidth = 0;
			// this.tabbarWidth = 0;
			// this.tabListSize = {};
			// this._touchTabIndex = 0;
			
			this.switchTab(this.tabIndex);
			
		},
		method:{
			async load() {				
				if(this.id) {
					const result = await doctor(this.id);					
					this.$store.commit(DOCTOR_MUTATION_UPDATE_ONE, { item: result.data.doctor });
				}
			},
			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				//let offsetIndex = this._touchTabIndex = Math.abs(index - this._lastTabIndex) > 1;
			
				// #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
				// this.isTap = true;
				// var currentSize = this.tabListSize[index];
				// this.updateIndicator(currentSize.left, currentSize.width);
				// this._touchTabIndex = index;
				// #endif
			
				this.switchTab(index);
			},
			swipe(e) {
				let { current } = e.target;
				this.currentTab = current;
				this.loadMore(current);
			}
			// animationfinish(e) {
			// 	// #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
			// 	let index = e.detail.current;
			// 	if (this._touchTabIndex === index) {
			// 		this.isTap = false;
			// 	}
			// 	this._lastTabIndex = index;
			// 	this.switchTab(index);
			// 	this.updateIndicator(this.tabListSize[index].left, this.tabListSize[index].width);
			// 	// #endif
			// },
			// switchTab(index) {
			// 		const isSwitchToSameTab = index === this.tabIndex;
			// 		this.tabIndex = index;
					
			// 		if (this.pageList[index].dataList.length === 0) {
			// 			this.loadTabData(index);
			// 		}

			// 		if (isSwitchToSameTab) return;

			// 		// #ifdef APP-NVUE
			// 		this.scrollTabTo(index);
			// 		// #endif
			// 		// #ifndef APP-NVUE
			// 		this.scrollInto = th is.tabList[index].id;
			// 		// #endif

			// },
			// loadTabData(index) {
			// 	this.pageList[index].$refs.list.loadMore();
			// },
			// clearTabData(index) {
			// 	this.pageList[index].clear();
			// }
		}
	}
	
</script>

<style>
/* #ifndef APP-NVUE */
	.tab-bar ::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	/* #endif */

	.scroll-view-indicator {
		position: relative;
	}

	.scroll-view-underline {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 24.5;
		right: 24.5;
		height: 3px;
		background-color: #2FCE56;
	}

	.scroll-view-animation {
		transition-duration: 0.2s;
		transition-property: left;
	}

	.tab-bar-line {
		height: 1px;
		background-color: #E4E4E4;
	}

	.tab-box {
		flex: 1;
	}
	
	.tab-bar {
		width: 100%;
		height: 40px;
	}
	.uni-tab-item {
		display: flex;
		flex-wrap: nowrap;
		width: 90px;
		height: 37.5px;
		padding-top: 12px;
		align-items: center;
		justify-content: center;
	}
	
	.uni-tab-item-title {
		color: #2E2E2E;
		font-size: 15px;
		line-height: 21px;
		flex-wrap: nowrap;
		font-weight: normal;
	}
	
	.uni-tab-item-title-active {
		color: #2E2E2E;
		font-weight: bold;
	}
	
	.swiper-item {
		flex: 1;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}
</style>
