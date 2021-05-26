import Vue from 'vue';

import StoreHelper from './storeHelper';

export const EXAM_RECORD_RESULT_MUTATION_UPDATE_ONE = 'examRecordResultStore/updateOne';
export const EXAM_RECORD_RESULT_MUTATION_UPDATE = 'examRecordResultStore/update';
export const EXAM_RECORD_RESULT_MUTATION_ADD_ONE = 'examRecordResultStore/addOne';
export const EXAM_RECORD_RESULT_MUTATION_ADD = 'examRecordResultStore/add';
export const EXAM_RECORD_RESULT_MUTATION_DELETE_ONE = 'examRecordResultStore/deleteOne';
export const EXAM_RECORD_RESULT_GETTER_GET_ONE = 'examRecordResultStore/getOne';
export const EXAM_RECORD_RESULT_GETTER_GET_ALL = 'examRecordResultStore/getAll';
export const EXAM_RECORD_RESULT_GETTER_GET = 'examRecordResultStore/get';
export const EXAM_RECORD_RESULT_MUTATION_IN_PROGRESS_ADD_ONE = 'examRecordResultStore/inProgressAddOne';
export const EXAM_RECORD_RESULT_MUTATION_IN_PROGRESS_UPDATE_ONE = 'examRecordResultStore/inProgressUpdateOne';
export const EXAM_RECORD_RESULT_GETTER_IN_PROGRESS_GET_ONE = 'examRecordResultStore/inProgressGetOne';

export default { 
	...StoreHelper,
};