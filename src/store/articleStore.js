import Vue from 'vue';

import StoreHelper from './storeHelper.js';

export const ARTICLE_MUTATION_ADD = 'articleStore/add';
export const ARTICLE_MUTATION_ADD_ONE = 'articleStore/addOne';
export const ARTICLE_MUTATION_UPDATE = 'articleStore/update';
export const ARTICLE_MUTATION_UPDATE_ONE = 'articleStore/updateOne';
export const ARTICLE_GETTER_GET_ONE = 'articleStore/getOne';

export default {
	...StoreHelper,
};