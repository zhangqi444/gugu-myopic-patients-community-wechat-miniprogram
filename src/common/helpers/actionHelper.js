import store from '@/store/index';
import { ACTION_TYPE } from '@/common/constants';

const addThumb = async (source, self, handler, mutation) => {
	await _add(source, self, handler, mutation, ACTION_TYPE.THUMB);
}

const addCollect = async (source, self, handler, mutation) => {
	await _add(source, self, handler, mutation, ACTION_TYPE.COLLECT);
}

const _add = async (source, self, handler, mutation, type) => {
	if(!source || !source.self || !self) return;
	
	let selfField, dataField, associateField;
	
	switch(type) {
		case ACTION_TYPE.THUMB:
			selfField = 'thumb';
			dataField = 'addThumb';
			associateField = 'thumbCount';
			break;
		case ACTION_TYPE.COLLECT:
			selfField = 'collect';
			dataField = 'addCollect';
			associateField = 'collectCount';
			break;
		default:
			return;
	}
	
	const selected = source.self[selfField] && source.self[selfField].value;
	try {
		const result = await handler(source._id, self._id, !selected);
		if(result.data[dataField]._id) {
			const countInc = result.data[dataField].value ? 1 : -1;
			store.commit(mutation, {
				item: {
					...source, 
					[associateField]: source[associateField] + countInc,
					self: { ...source.self, [selfField]: result.data[dataField] }
				}
			});
		}
		// handle error
	} catch(e) {
		console.error(e);
	}
}

export {
	addThumb, addCollect
}
