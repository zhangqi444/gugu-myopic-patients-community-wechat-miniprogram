<template>
	<impressionBar :showText="false" :item="item" @click="click" :imageStyle="imageStyle" :textStyle="textStyle"
		:containerStyle="containerStyle" :innerContainerStyle="innerContainerStyle" :buttonStyle="buttonStyle" />
</template>


<!-- 
	TODO: 
	这是一个违反了HOC规范的组件，是为了更好的重用业务逻辑层代码而设置。
	理论上，该组件不应当使用apis和store，相关的点击事件应该层层传递到页面曾，再处理。
-->
<script>
	import { mapState } from 'vuex';
	import { addThumbPost } from "@/common/apis/thumb";
	import { addCollectPost } from "@/common/apis/collect";
	import impressionBar from "@/components/impression/impression-bar"
	import { PAGES } from '@/common/constants';
	import { POST_MUTATION_UPDATE_ONE } from "@/store/postStore";
	import { addThumb, addCollect } from "@/common/helpers/actionHelper";
	
	export default {
		components: { impressionBar },
		props: {
			item: { type: Object, default: () => {} },
			containerStyle: { type: Object, default: () => {} },
			innerContainerStyle: { type: Object, default: () => {} },
			buttonStyle: { type: Object, default: () => {} },
			imageStyle: { type: Object, default: () => {} },
		},
		computed: {
			...mapState({
				self: state => state.userStore.self,
			}),
			collected() {
				return this.item && this.item.self && this.item.self.collect && this.item.self.collect.value || false;
			},
			thumbed() {
				return this.item && this.item.self && this.item.self.thumb && this.item.self.thumb.value || false;
			}
		},
		methods: {
			click(type, item) {
				switch(type) {
					case 'thumb':
						this.thumb(); return;
					case 'collect':
						this.collect(); return;
					case 'comment':
						this.comment(true); return;
					case 'share':
					default:
						return;
				}
			},
			comment(isAdding) {
				uni.navigateTo({ url: `${PAGES.POST.path}?id=${this.item._id}&isAdding=${!!isAdding}` });
			},
			async thumb() {
				await addThumb(this.item, this.self, addThumbPost, POST_MUTATION_UPDATE_ONE);
			},
			async collect() {
				await addCollect(this.item, this.self, addCollectPost, POST_MUTATION_UPDATE_ONE);
			},
		}
	}
</script>

<style scoped>
</style>
