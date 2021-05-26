import Vue from 'vue';

import StoreHelper from './storeHelper';

export const SURVEY_MUTATION_UPDATE_ONE = 'surveyStore/updateOne';
export const SURVEY_MUTATION_ADD_ONE = 'surveyStore/addOne';
export const SURVEY_MUTATION_ADD = 'surveyStore/add';
export const SURVEY_GETTER_GET_ONE = 'surveyStore/getOne';

export default {
	...StoreHelper
};