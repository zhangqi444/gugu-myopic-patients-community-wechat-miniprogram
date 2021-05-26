import Vue from 'vue';

import StoreHelper from './storeHelper';

export const EXAM_RECORD_MUTATION_UPDATE_ONE = 'examRecordStore/updateOne';
export const EXAM_RECORD_MUTATION_UPDATE = 'examRecordStore/update';
export const EXAM_RECORD_MUTATION_ADD_ONE = 'examRecordStore/addOne';
export const EXAM_RECORD_MUTATION_ADD = 'examRecordStore/add';
export const EXAM_RECORD_GETTER_GET_ONE = 'examRecordStore/getOne';
export const EXAM_RECORD_GETTER_GET = 'examRecordStore/get';
export const EXAM_RECORD_GETTER_GET_ALL = 'examRecordStore/getAll';

export default {
	...StoreHelper
};