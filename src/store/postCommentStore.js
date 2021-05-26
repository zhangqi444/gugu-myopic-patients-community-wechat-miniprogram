import Vue from 'vue';

import StoreHelper from './storeHelper.js';

export const POST_COMMENT_MUTATION_ADD = 'postCommentStore/add';
export const POST_COMMENT_MUTATION_ADD_ONE = 'postCommentStore/addOne';
export const POST_COMMENT_MUTATION_UPDATE = 'postCommentStore/update';
export const POST_COMMENT_MUTATION_UPDATE_ONE = 'postCommentStore/updateOne';
export const POST_COMMENT_GETTER_GET_ONE = 'postCommentStore/getOne';
export const POST_COMMENT_GETTER_GET = 'postCommentStore/get';

export default {
	...StoreHelper,
};