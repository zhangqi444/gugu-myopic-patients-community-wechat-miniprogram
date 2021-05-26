<template>
	<view class="uni-form-item uni-column container">
		<view class="title">
			<span class="title-content" v-text="title"></span>
			<span class="title-tips" v-text="titleTips"></span>
		</view>
		<sunui-upimg @chooseImage="chooseImage" @change="change" :url="url" :signature="signature" :upload_before_list="upload_before_list"></sunui-upimg>
	</view>
</template>

<script>
	import sunuiUpimg from '@/packageSubPage/components/sunui-upimg.vue';
	import config from '@/common/configs/config.js';
	import { aliyunSignature } from '@/common/apis/aliyun';

	export default {
		name: 'image-uploader',
		props: {
			title: { type: String, default: '' },
			titleTips: { type: String, default: '' },
			previews: { type: Array, default: () => [] },
			url: { type: String, default: config.ALIYUN_OSS_HOST },
		},
		computed: {
			upload_before_list() {
				return this.previews ? this.previews.map(p => { 
					return { path: p }; 
				}) : [];
			}
		},
		data() {
			return { inputValue: '', signature: '' };
		},
		async created() {
			try {
				this.signature = await aliyunSignature();
				this.signature = this.signature.data.aliyunSignature.signature;
			} catch(e) {
				console.error(e);
			}
		},
		components: { sunuiUpimg },
		methods: {
			change(list) {
				this.$emit('change', list);
			}
		}
	};
</script>

<style scoped>
	.container {
		background-color: #FFFFFF;
		margin-bottom: 14px;
		padding: 16px;
		border-radius: 8px;
	}

	.title {
		margin-bottom: 10px;
	}

	.title-content {
		color: #2E2E2E;
		font-size: 16px;
		line-height: 24px;
	}

	.title-tips {
		display: inline-block;
		margin-left: 10px;
		color: #C1C1C1;
		font-size: 14px;
		line-height: 20px;
	}
</style>
