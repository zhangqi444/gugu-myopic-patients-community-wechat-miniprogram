<template>
	<view class='container'>
		<list class="listview" ref="list" @loadMore="loadMore" :showLoadMore="showLoadMore" :refresherEnabled="refresherEnabled">
			<uni-cell>
				<slot name="header"></slot>
			</uni-cell>
			<uni-cell v-for="(item, index) in dataList" :key="item._id">
				<slot name="item" v-bind:item="item"></slot>
				<slot name="spliter" v-bind:item="item" v-if="index < dataList.length - 1" ></slot>
			</uni-cell>
			<uni-cell  v-if="!dataList || dataList.length === 0">
				<slot name="placeholder"></slot>
			</uni-cell>
			<template v-slot:footer>
				<slot name="footer"></slot>
			</template>
		</list>
	</view>
</template>

<script>
	import { friendlyDate } from '@/common/util';
	import list from '../list/index';
	import Strings from '@/common/strings';
	import { PAGES } from '@/common/constants';
	import uniCell from '@/components/uni-cell';

	export default {
		components: { list, uniCell },
		props: {
			limit: { type: Number, default: 5 }, // page size
			_id: { type: String, default: '' },
			refresherEnabled: { type: Boolean, default: false },
			loadMoreEnabled: { type: Boolean, default: true },
			getter: { type: String, default: '' }
		},
		data() {
			return {
				navigateFlag: false, skip: 0, loaded: false, dataIdList: [], localDataIdList: []
			}
		},
		computed: {
			dataList() {
				// TODO: 理想情况下应当遵循HOC模式，store应该在页面一级访问				
				if(this.getter && this.$store.getters[this.getter]) {
					const localDataList = this.$store.getters[this.getter](this.localDataIdList) || [];
					const remoteDataList = this.$store.getters[this.getter](this.dataIdList);
					return localDataList.concat(remoteDataList);
				}
			},
			showLoadMore() {
				return (this.loadMoreEnabled || !this.loaded ) && (this.dataList && this.dataList.length > 0);
			}
		},
		created() {
			this.skip = 0;
		},
		methods: {
			loadMore(refresh, callback) {
				if (this.loadMoreEnabled || !this.loaded) {
					
					if(refresh) {
						this.skip = 0;
					}
					
					this.$emit('loadMore', this._id, { skip: this.skip, limit: this.limit }, (result) => {
						const resultIdList = result.map(r => r._id);
						this.dataIdList = refresh ? resultIdList : this.dataIdList.concat(resultIdList);
						this.localDataIdList = refresh ? [] : this.localDataIdList;
						this.skip = this.dataIdList.length;
						this.loaded = true;
						callback(result, this.limit);
					});
				}
			},
			unshiftLocalIdList(id) {
				this.localDataIdList.unshift(id);
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex: 1;
		flex-direction: column;
		position: relative;
		height: 100%;
		width: 100%;
		overflow: auto;
	}
	.spliter {
		background-color: #F5F5F5;
		padding-bottom: 2rpx;
	}
	.listview {
		display: flex;
		flex: 1;
		height: 100%;
		width: 100%;
	}
</style>
