import Vue from 'vue';

const addOne = (state, payload) => {
	const {item} = payload;
	if (item && item._id) {
		Vue.set(state.itemMap, item._id, item);
		Vue.set(state.items, state.items.length, item._id);
	}
}

const updateOne = (state, payload) => {
	const {item} = payload;
	if (item && item._id) {
		const object = state.itemMap[item._id];
		if(object) {
			Vue.set(state.itemMap, item._id, item);
		} else {
			addOne(state, {item});
		}
	}
}

const deleteOne = (state, payload) => {
	const {id} = payload;
	
	Vue.delete(state.itemMap, id);
	
	const index = state.items.indexOf(id);
	if (index > -1) {
		Vue.delete(state.items, index);
	}
}

const inProgressAddOne = (state, payload) => {
	const { item, key } = payload;
	if (item && key) {
		Vue.set(state.inProgressItemMap, key, item);
		Vue.set(state.inProgressItems, state.inProgressItems.length, key);
	}
};

const sort = (state, payload) => {
	const {items} = state;
	const {sortKey, desc} = payload;
	if(sortKey && items.length > 1) {
		const sortedItems = items.sort((a, b) => {
			return (a[sortKey] - b[sortKey]) * desc;
		});
		Vue.set(state, 'items', sortedItems);
	}
};

const storeHelper = {
	namespaced: true,
	state: () => ({ 
		items: [],
		itemMap: {},
		inProgressItems: [],
		inProgressItemMap: {},
	}),
	mutations: {
		addOne(state, payload) {
			addOne(state, payload);
			sort(state, payload);
		},
		add(state, payload) {
			const {items} = payload;
			items && items.forEach(v => {
				addOne(state, {item: v});
			});
			sort(state, payload);
		},
		updateOne(state, payload) {
			updateOne(state, payload);
			sort(state, payload);
		},
		update(state, payload) {
			const {items} = payload;
			items && items.forEach(v => {
				updateOne(state, {item: v});
			});
			sort(state, payload);
		},
		deleteOne,
		inProgressAddOne,
		inProgressUpdateOne(state, payload) {
			const { item, key } = payload;
			if (item && key) {
				const object = state.inProgressItemMap[key];
				if(object) {
					Vue.set(state.inProgressItemMap, key, item);
				} else {
					inProgressAddOne(state, payload);
				}
			}
		},
	},
	actions: { },
	getters: {
		getOne(state) {
			return (id) => {
				return state.itemMap[id];
			}
		},
		get(state) {
			return (ids) => {
				return ids && ids.map(i => state.itemMap[i]);
			}
		},
		getAll(state) {
			return () => {
				return state.items && state.items.map(i => state.itemMap[i]);
			}
		},
		inProgressGetOne(state, id) {
			return (id) => {
				return state.inProgressItemMap[id];
			}
		}
	}
};

export default storeHelper;