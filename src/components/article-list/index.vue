<template>
	<view class='container'>
		<list class="listview" ref="list" @loadMore="loadMore" :showLoadMore="loadMoreEnabled || !loaded">
			<uni-cell>
				<slot name="header"></slot>
			</uni-cell>
			<uni-cell v-for="(item, index) in dataList" :key="item._id">
				<articleItem
					v-if="item.video.vid || item.content"
					:ref="'article-item-' + item._id"
					:item="item"
					@click="goToArticle"/>
				<view class="spliter" v-if="item.video.vid || item.content && index < dataList.length - 1" />
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
	import articleItem from './article-item';
	import Strings from '@/common/strings';
	import { PAGES } from '@/common/constants';
	import uniCell from '@/components/uni-cell';

	export default {
		components: {
			articleItem,
			list,
			uniCell
		},
		props: {
			limit: { type: Number, default: 5 }, // page size
			_id: { type: String, default: '' },
			loadMoreEnabled: { type: Boolean, default: true }
		},
		data() {
			return {
				dataList: [],
				navigateFlag: false,
				skip: 0,
				loaded: false
			}
		},
		created() {
			this.skip = 0;
		},
		methods: {
			loadMore(refresh, callback) {
				if (this.loadMoreEnabled || !this.loaded) {
					this.$emit('loadMore', this._id, { skip: this.skip, limit: this.limit }, (result) => {
						this.dataList = refresh ? result : this.dataList.concat(result);
						this.skip = this.dataList.length;
						this.loaded = true;
						callback(result, this.limit);
					});
				}
			},
			goToArticle(item) {
				if (this.navigateFlag) return;
				this.navigateFlag = true;
				uni.navigateTo({ url: `${PAGES.ARTICLE.path}?id=${item._id}` });
				setTimeout(() => {
					this.navigateFlag = false;
				}, 200)
			},
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
		padding-bottom: 1px;
	}
	.listview {
		display: flex;
		flex: 1;
		height: 100%;
		width: 100%;
	}
</style>
