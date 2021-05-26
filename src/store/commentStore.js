import Vue from 'vue';

import StoreHelper from './storeHelper.js';

export const COMMENT_MUTATION_ADD = 'commentStore/add';
export const COMMENT_MUTATION_ADD_ONE = 'commentStore/addOne';
export const COMMENT_MUTATION_UPDATE = 'commentStore/update';
export const COMMENT_MUTATION_UPDATE_ONE = 'commentStore/updateOne';
export const COMMENT_GETTER_GET_ONE = 'commentStore/getOne';
export const COMMENT_GETTER_GET = 'commentStore/get';

export default {
	...StoreHelper,
};