import Vue from 'vue';

import StoreHelper from './storeHelper.js';

export const POST_MUTATION_ADD = 'postStore/add';
export const POST_MUTATION_ADD_ONE = 'postStore/addOne';
export const POST_MUTATION_UPDATE = 'postStore/update';
export const POST_MUTATION_UPDATE_ONE = 'postStore/updateOne';
export const POST_GETTER_GET_ONE = 'postStore/getOne';
export const POST_GETTER_GET = 'postStore/get';

export default {
	...StoreHelper,
};