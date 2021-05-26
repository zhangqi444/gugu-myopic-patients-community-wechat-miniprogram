import Vue from 'vue';

import StoreHelper from './storeHelper.js';

export const EXPERT_MUTATION_ADD = 'expertStore/add';
export const EXPERT_MUTATION_ADD_ONE = 'expertStore/addOne';
export const EXPERT_MUTATION_UPDATE = 'expertStore/update';
export const EXPERT_MUTATION_UPDATE_ONE = 'expertStore/updateOne';
export const EXPERT_GETTER_GET_ONE = 'expertStore/getOne';
export const EXPERT_GETTER_GET = 'expertStore/get';

export default {
	...StoreHelper,
};