import { userLogin, onboardSelf } from '@/common/apis/user';
import { USER_MUTATION_UPDATE_SELF, USER_GETTER_GET_SELF } from '@/store/userStore';
import store from '@/store/index';

function login(vm) {
	
	// 在store中无法进行async getter操作，故该部分逻辑无法合并入userStore中，只能在组件中显式调用
	// https://forum.vuejs.org/t/how-to-return-asynchronous-result-from-vuex-getter/10787
	let promise = new Promise((resolve, reject) => {		
		const self = _getSelf();
		if(!self._id) {
			uni.login({
				provider: 'weixin',
				fail: function(error) {
					reject();
					console.error('error: ' + JSON.stringify(error));
				},
				complete: async function(result) {
					try {
						if(result.errMsg === 'login:ok' && result.code) {
							const userLoginResult = await userLogin({ jscode: result.code });
							const user = userLoginResult.data.userLogin;
							if(user._id) {
								store.commit(USER_MUTATION_UPDATE_SELF, { self: user });
								resolve(user);
							}
						}
						reject();
					} catch(e) {
						reject();
						console.error(e);
					}
					
				},
			});
		}
	});
	
	return promise;
	
}

const onboardByWechatUserInfo = async (userInfo) => {
	const self = _getSelf();
	
	if(userInfo && self && self._id) {
		const { nickName, avatarUrl, city, country, province, gender } = userInfo;
		let result = await onboardSelf(self._id, { 
			nickname: userInfo.nickName, avatar: userInfo.avatarUrl,
			city, country, province, gender
		});
		result = result && result.data.onboardSelf;					
		if(result) store.commit(USER_MUTATION_UPDATE_SELF, { self: { ...self, ...result } });
	}
}

function _getSelf() {
	return store.getters[USER_GETTER_GET_SELF]();
}

export {
	login, onboardByWechatUserInfo
}
