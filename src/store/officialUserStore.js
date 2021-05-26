import Vue from 'vue';

import StoreHelper from './storeHelper.js';

export const OFFICIAL_USER_MUTATION_ADD = 'officialUserStore/add';
export const OFFICIAL_USER_MUTATION_ADD_ONE = 'officialUserStore/addOne';
export const OFFICIAL_USER_MUTATION_UPDATE = 'officialUserStore/update';
export const OFFICIAL_USER_MUTATION_UPDATE_ONE = 'officialUserStore/updateOne';
export const OFFICIAL_USER_GETTER_GET_ONE = 'officialUserStore/getOne';
export const OFFICIAL_USER_GETTER_GET = 'officialUserStore/get';

export default {
	...StoreHelper,
};