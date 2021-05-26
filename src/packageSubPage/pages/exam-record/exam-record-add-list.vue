<template>
	<view v-if="!loading" class="container">
		<text class="text-header">请选择您要添加的记录类别</text>
		<list class="listview" @loadMore="onLoadMore" ref="page" :loadMoreEnabled="false">
			<uni-cell class="cell" v-for="(item, i) in dataList" :key="item._id">
				<view class="item-container" @click="goTo(item)">
					<view class="item-text-container">
						<text class="item-text-title">{{item.title}}</text>
						<text class="item-text-description">{{item.description}}</text>
					</view>
					<image class="item-image" :src="item.cover"></image>
				</view>
			</uni-cell>
		</list>
	</view>
</template>

<script>
	import list from '@/components/list/index';
	import uniCell from '@/components/uni-cell';
	import { examRecords } from '@/common/apis/examRecord';
	import { EXAM_RECORD_MUTATION_UPDATE, EXAM_RECORD_GETTER_GET_ALL } from '@/store/examRecordStore';
	import { PAGES } from '@/common/constants';
	import { addVisitSelf } from "@/common/apis/visit";
	import { ACTION_TARGET_TYPE } from "@/common/constants";
	import { login } from '@/common/helpers/authHelper';
	import { mapState } from 'vuex';
	
	export default {
		components: { list, uniCell },
		data() {
			return {
				skip: 0, limit: 100, navigateFlag: false, loading: false
			};
		},
		computed: mapState({
			self: state => state.userStore.self,
			dataList(state) {
				let result = this.$store.getters[EXAM_RECORD_GETTER_GET_ALL]();
				result = [...result].sort((a, b) => a._id - b._id);
				return result;
			}
		}),
		onShareAppMessage(res) {
			return {
				title: PAGES.EXAM_RECORD.title,
				path: PAGES.EXAM_RECORD.path,
				content: PAGES.EXAM_RECORD.description,
			}
		},
		async onReady() {
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline'],
				title: PAGES.EXAM_RECORD.title,
				path: PAGES.EXAM_RECORD.path,
				content: PAGES.EXAM_RECORD.description,
			});
			
			if(!this.self._id) await login(this);
			
			addVisitSelf(null, PAGES.EXAM_RECORD_ADD.ref);
			
			this.loadMore();
		},
		methods: {
			goTo(item) {
				if (this.navigateFlag) return;
				let url = `${PAGES.EXAM_RECORD_ADD.path}?examRecordId=${item._id}`;
				uni.navigateTo( { url } );
				setTimeout(() => { this.navigateFlag = false; }, 200);
			},
			async onLoadMore(refresh, callback) {
				try {
					let option = { skip: this.skip, limit: this.limit };
					let result = await await examRecords(option);
					result = result.data.examRecords;
					this.$store.commit(EXAM_RECORD_MUTATION_UPDATE, { items: result });
					callback(result, this.limit);
				} catch(e) {
					console.error(e);
					callback(null);
				}
			},
			loadMore() {
				this.$refs.page.loadMore();
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
		background-color: #F7F8FB;
	}
	.text-header {
		font-size: 14px;
		line-height: 20px;
		margin: 16px 18px 12px 18px;
	}
	.item-container {
		display: flex;
		flex-direction: row;
		background-color: #FFFFFF;
		height: 42px;
		border-radius: 5px;
		justify-content: space-between;
		align-items: center;
		margin: 0 18px 12px 18px;
		padding: 14px 12px 14px 12px;
	}
	.item-text-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		height: 42px;
		flex: 1;
	}
	.item-text-title {
		color: #2E2E2E;
		font-size: 14px;
		line-height: 20px;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; /* number of lines to show */
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.item-text-description {
		color: #979797;
		font-size: 12px;
		line-height: 17px;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; /* number of lines to show */
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.item-image {
		display: flex;
		height: 30px;
		width: 30px;
		margin-left: 12px;
	}
</style>
