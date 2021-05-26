<template>
	<view id="template" class="container">
		<view v-if="item && item.headerTextResult" class="parser">
			<parser :html="item.headerTextResult.text" ref="header" />
		</view>
		<view v-if="item && item.chartResult" class="chart-cavans-container" :style="[chartContainerStyle]">
			<uniEcCanvas class="chart-canvas" ref="canvas" :canvas-id="canvasId" :style="[canvasStyle]" :ec="ec" />
		</view>
		
		<view v-if="item && item.footerTextResult" class="spliter"></view>
		<view v-if="item && item.footerTextResult" class="parser">
			<parser :html="item.footerTextResult" ref="footer" />
		</view>
	</view>
</template>

<script>
	import parser from "@/components/parser";
	import uniEcCanvas from '@/packageSubPage/components/uni-ec-canvas/uni-ec-canvas'
	import { getChartConfig, CHART_TEMPLATE } from '@/packageSubPage/common/helpers/chartHelper';
	
	const canvasMap = {};
	
	let canvasIdSeed = 0;

	export default {
		name: 'echartElement',
		components: { parser, uniEcCanvas },
		data() {
			return {
				canvasId: `canvasId_${canvasIdSeed++}`,
				ec: { lazyLoad: true }
			};
		},
		props: {
			item: { type: Object, default: () => {} }, // 左Y轴数据
			itemTwo: { type: Object, default: () => {} }, // 右Y轴数据
			template: { type: String, default: CHART_TEMPLATE.SINGLE_YAXIS },
			chartConfig: { type: Object, default: () => {} },
			chartContainerStyle: { type: Object, default: () => {} },
			canvasStyle: { type: Object, default: () => { return {width: '750rpx', height: '500rpx'};} },
		},
		watch: {
			item: {
				handler: function(value) {
					if(!this.item || !this.item.chartResult || !this.canvasId) {
						return;
					}
					setTimeout(()=>this.loadCharts(), 500);  		
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			loadCharts() {
				const { config } = getChartConfig(this.template, this.item.chartResult, this.itemTwo && this.itemTwo.chartResult);
				this.ec = config;
				this.$refs['canvas'] && this.$refs['canvas'].init()
			},
			toJSON() {},
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		flex: 1;
		box-sizing: border-box;
	}
	.parser {
		width: auto;
		position: relative;
		padding: 0px 36upx 26upx 36upx;
		justify-content: center;
		font-size: 32upx;
		line-height: 52upx;
	}
	.chart-cavans-container {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
	}
	.spliter {
		height: 36upx;
		width: 100%;
		background-color: #FFFFFF;
	}
	.chart-canvas {
	    width: 678upx;
	    height: 534upx;
	    display: block;
	}
</style>
