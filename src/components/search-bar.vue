<template>
	<view class="uni-searchbar">
		<view 
			:style="{
				borderRadius: radius+'px',
				backgroundColor: bgColor,
				width: width ? width+'px' : '100%',
			}" 
			class="uni-searchbar__box" 
			@click="searchClick">
			<image class="uni-searchbar__box-icon-search" src="../static/search@3x.png"></image>
			<input 
				:focus="showSync" 
				:placeholder="placeholder" 
				:maxlength="maxlength" 
				@confirm="confirm" 
				@input="input"
				class="uni-searchbar__box-search-input"
				confirm-type="search" 
				type="text" 
				:disabled="disabled"
				v-model="searchVal" />
			<view 
				v-if="show && (clearButton==='always'||clearButton==='auto'&&searchVal!=='')" 
				class="uni-searchbar__box-icon-clear" 
				@click="clear">
				<image class="clear" src="../static/clear@3x.png" />
			</view>
		</view>
		<text @click="cancel" class="uni-searchbar__cancel" v-if="cancelButton ==='always' || show && cancelButton ==='auto'">{{cancelText}}</text>
	</view>
</template>

<script>

	/**
	 * SearchBar 搜索栏
	 * @description 评分组件
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=866
	 * @property {Number} radius 搜索栏圆角
	 * @property {Number} maxlength 输入最大长度
	 * @property {String} placeholder 搜索栏Placeholder
	 * @property {String} clearButton = [always|auto|none] 是否显示清除按钮
	 * 	@value always 一直显示
	 * 	@value auto 输入框不为空时显示
	 * 	@value none 一直不显示
	 * @property {String} cancelButton = [always|auto|none] 是否显示取消按钮
	 * 	@value always 一直显示
	 * 	@value auto 输入框不为空时显示
	 * 	@value none 一直不显示
	 * @property {String} cancelText 取消按钮的文字
	 * @property {String} bgColor 输入框背景颜色
	 * @event {Function} confirm uniSearchBar 的输入框 confirm 事件，返回参数为uniSearchBar的value，e={value:Number}
	 * @event {Function} input uniSearchBar 的 value 改变时触发事件，返回参数为uniSearchBar的value，e={value:Number}
	 * @event {Function} cancel 点击取消按钮时触发事件，返回参数为uniSearchBar的value，e={value:Number}
	 */

	export default {
		name: "searchBar",
		props: {
			placeholder: {
				type: String,
				default: "请输入搜索内容"
			},
			radius: {
				type: [Number, String],
				default: 100
			},
			clearButton: {
				type: String,
				default: "auto"
			},
			cancelButton: {
				type: String,
				default: "none"
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			bgColor: {
				type: String,
				default: "#F8F8F8"
			},
			maxlength: {
				type: [Number, String],
				default: 100
			},
			width: {
				type: Number,
				default: 0
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				show: false,
				showSync: false,
				searchVal: ""
			}
		},
		watch: {
			searchVal() {
				this.$emit("input", {
					value: this.searchVal
				})
			}
		},
		methods: {
			searchClick() {
				if (this.show) {
					return
				}
				this.searchVal = ""
				this.show = true;
				this.$nextTick(() => {
					this.showSync = true;
				})
			},
			clear() {
				this.searchVal = ""
				this.$emit("cancel", {
					value: this.searchVal
				});
			},
			input() {
				this.$emit("input", {
					value: this.searchVal
				});
			},
			cancel() {
				this.$emit("cancel", {
					value: this.searchVal
				});
				this.searchVal = ""
				this.show = false
				this.showSync = false
				uni.hideKeyboard()
			},
			confirm() {
				uni.hideKeyboard();
				this.$emit("confirm", {
					value: this.searchVal
				})
			},
			updateSearch(searchVal) {
				this.searchVal = searchVal;
				this.show = true;
			}
		}
	};
</script>

<style lang="scss" scoped>
	$uni-searchbar-height: 35px;

	.uni-searchbar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		position: relative;
		background-color: #F3F3F3;
		height: 100%;
		width: 100%;
		border-radius: 18px;
	}

	.uni-searchbar__box {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		overflow: hidden;
		position: relative;
		flex: 1;
		justify-content: flex-start;
		flex-direction: row;
		align-items: center;
		height: $uni-searchbar-height;
		padding-left: 7px;
		padding-right: 7px;
	}

	.uni-searchbar__box-icon-search {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		width: 20px;
		height: 31px;
		justify-content: center;
		align-items: center;
	}

	.uni-searchbar__box-search-input {
		flex: 1;
		font-size: 14px;
		line-height: 20px;
		color: $uni-text-color;
		margin-left: 5px;
	}

	.uni-searchbar__box-icon-clear {
		align-items: center;
		justify-content: center;
	}

	.uni-searchbar__text-placeholder {
		flex: 1;
		font-size: $uni-font-size-base;
		color: $uni-text-color-placeholder;
		margin-left: 5px;
		font-size: 14px;
		line-height: 20px;
		color: #AAAAAA;
	}

	.uni-searchbar__cancel {
		padding-left: 10px;
		line-height: $uni-searchbar-height;
		font-size: 14px;
		color: $uni-text-color;
	}
	
	.clear {
		width: 14px;
		height: 25px;
		padding-right: 10px;
		padding-left: 10px;
		margin-top: 2px;
	}
</style>
