<script>
	import 'weapp-cookie';
	import { login } from '@/common/helpers/authHelper';
	
	export default {
		onLaunch: function() {
			
			const vm = this;
			
			// #ifdef APP-NVUE
			plus.screen.lockOrientation('portrait-primary');
			// let appid = plus.runtime.appid;
			// if (appid && appid.toLocaleLowerCase() != "hbuilder") {
			// 	uni.request({
			// 		url: 'https://uniapp.dcloud.io/update', //检查更新的服务器地址
			// 		data: {
			// 			appid: plus.runtime.appid,
			// 			version: plus.runtime.version
			// 		},
			// 		success: (res) => {
			// 			console.log('success', res);
			// 			if (res.statusCode == 200 && res.data.isUpdate) {
			// 				let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
			// 				// 提醒用户更新
			// 				uni.showModal({
			// 					title: '更新提示',
			// 					content: res.data.note ? res.data.note : '是否选择更新',
			// 					success: (showResult) => {
			// 						if (showResult.confirm) {
			// 							plus.runtime.openURL(openUrl);
			// 						}
			// 					}
			// 				})
			// 			}
			// 		}
			// 	})
			// }

			var domModule = weex.requireModule('dom');
			domModule.addRule('fontFace', {
				'fontFamily': "texticons",
				'src': "url('./static/text-icon.ttf')"
			});
			// #endif
			
		},
		onShow: function() {
			console.log('App Show')
			login(this);
			// TODO: 添加登陆的错误处理。
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
	.flex {
		display: flex;
	}
	.row {
		flex-direction: row;
	}
	.column {
		flex-direction: column;
	}
	.flex-wrap {
		display: flex;
		flex-wrap: wrap;
	}
	.flex-one {
		flex: 1;
	}
	.flex-wrap {
		flex-wrap: wrap;
	}
	.justify-content-center {
		justify-content: center;
	}
	.align-items-center {
		align-items: center;
	}
	.min-height-100 {
		min-height: 100%;
	}
</style>
