import Vue from 'vue';

import StoreHelper from './storeHelper.js';

export const DOCTOR_MUTATION_ADD = 'doctorStore/add';
export const DOCTOR_MUTATION_ADD_ONE = 'doctorStore/addOne';
export const DOCTOR_MUTATION_UPDATE = 'doctorStore/update';
export const DOCTOR_MUTATION_UPDATE_ONE = 'doctorStore/updateOne';
export const DOCTOR_GETTER_GET_ONE = 'doctorStore/getOne';
export const DOCTOR_GETTER_GET = 'doctorStore/get';

export default {
	...StoreHelper,
};