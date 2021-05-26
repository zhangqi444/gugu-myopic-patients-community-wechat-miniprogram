import Vue from 'vue';

import StoreHelper from './storeHelper';

export const SURVEY_RESULT_MUTATION_UPDATE_ONE = 'surveyResultStore/updateOne';
export const SURVEY_RESULT_MUTATION_ADD_ONE = 'surveyResultStore/addOne';
export const SURVEY_RESULT_MUTATION_ADD = 'surveyResultStore/add';
export const SURVEY_RESULT_GETTER_GET_ONE = 'surveyResultStore/getOne';
export const SURVEY_RESULT_MUTATION_IN_PROGRESS_ADD_ONE = 'surveyResultStore/inProgressAddOne';
export const SURVEY_RESULT_MUTATION_IN_PROGRESS_UPDATE_ONE = 'surveyResultStore/inProgressUpdateOne';
export const SURVEY_RESULT_GETTER_IN_PROGRESS_GET_ONE= 'surveyResultStore/inProgressGetOne';

export default { ...StoreHelper };