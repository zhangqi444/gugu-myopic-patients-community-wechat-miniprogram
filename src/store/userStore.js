import Vue from 'vue';

import StoreHelper from './storeHelper';

export const USER_MUTATION_UPDATE_SELF = 'userStore/updateSelf';
export const USER_GETTER_GET_SELF = 'userStore/getSelf';

export const USER_MUTATION_UPDATE_ONE = 'userStore/updateOne';
export const USER_MUTATION_ADD_ONE = 'userStore/addOne';
export const USER_MUTATION_ADD = 'userStore/add';
export const USER_GETTER_GET_ONE = 'userStore/getOne';

const store = { 
	...StoreHelper,
	state: () => ({
		items: [],
		itemMap: {},
		inProgressItems: [],
		inProgressItemMap: {},
		self: {}
	}),
};

store.mutations.updateSelf = (state, payload) => {
	payload && Vue.set(state, 'self', payload.self);
};

store.getters.getSelf = (state) => {
	return () => {
		return state.self;
	}
};

export default store;