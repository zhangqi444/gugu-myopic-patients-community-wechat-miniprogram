export const ARTICLE_FEED_MUTATION_ADD = 'articleFeedStore/add';
export const ARTICLE_FEED_MUTATION_ADD_ONE = 'articleFeedStore/addOne';
export const ARTICLE_FEED_GETTER_GET_ONE = 'articleFeedStore/getOne';

const ARTICLE_FEED_ID_PREFIX = 'ARTICLE_FEED_';

export default const articleFeedStore = {
	state: () => ({ 
		articleFeeds: [],
		articleFeedMap: {},
	}),
	mutations: { 
		addOne(state, payload) {
			const {articleFeed} = payload;
			if (articleFeed) {
				const id = ARTICLE_FEED_ID_PREFIX + state.articleFeeds.length;
				state.articleFeedMap[ARTICLE_FEED_ID_PREFIX] = state.articleFeeds.length;
				state.articleFeeds = [...state.articleFeeds, articleFeed];
				return id;
			}
		},
		add(state, payload) {
			const {articleFeeds} = payload;
			articleFeeds && articleFeeds.forEach(v => {
				this.commit(ARTICLE_FEED_MUTATION_ADD_ONE, {articleFeed: v});
			});
		},
	},
	actions: { 
	},
	getters: { 
		getOne(state) {
			return (id) => {
				const index = state.articleFeedMap[id];
				return state.articleFeeds[index];
			}
		}
	}
}