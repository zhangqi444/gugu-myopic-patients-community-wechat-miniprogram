import Vuex from 'vuex';
import Vue from 'vue';
import articleStore from './articleStore';
import userStore from './userStore';
import surveyStore from './surveyStore';
import surveyResultStore from './surveyResultStore';
import examRecordStore from './examRecordStore';
import examRecordResultStore from './examRecordResultStore';
import postStore from './postStore';
import postCommentStore from './postCommentStore';
import commentStore from './commentStore';
import expertStore from './expertStore';
import officialUserStore from './officialUserStore';
import doctorStore from './doctorStore';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		userStore,
		articleStore,
		surveyStore,
		surveyResultStore,
		examRecordStore,
		examRecordResultStore,
		postStore,
		postCommentStore,
		commentStore,
		doctorStore,
		officialUserStore,
		expertStore
	}
});

export default store;