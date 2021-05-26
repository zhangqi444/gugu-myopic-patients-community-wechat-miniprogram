import { objectMap } from '@/common/util';

export const VALIDATION_TYPE = {
	REQUIRED: 'REQUIRED',
	INPUT_TYPE: 'INPUT_TYPE',
	BOTH_EYE_EXISTING_OR_NULL: 'BOTH_EYE_EXISTING_OR_NULL'
};

function isQuestionVisible(question, questionResult) {
	if(question['visibleIf']) {
		let visibleIf = question['visibleIf'].split('=');
		if(visibleIf[0] && visibleIf[1]) {
			const key = visibleIf[0].trim().slice(1, -1);
			const value = visibleIf[1].trim();
			return questionResult && questionResult['result'] && questionResult['result'][key] === value;
		}
	}
	
	return true;
}

function isQuestionPageResultValid(page, results) {
	if(!page || !results) return false;
	
	const question = page.elements[0]; // TODO: 支持每页大于一个问题
	const result = results[question.name];
	
	if(!_isQuestionPageResultValid_Qequired(question, result)) {
		return { 
			isValid: false, 
			type: VALIDATION_TYPE.REQUIRED, 
			question,
		};
	}
	
	if(!_isQuestionPageResultValid_BothEyeExistingOrNull(question, result)) {
		return { 
			isValid: false, 
			type: VALIDATION_TYPE.BOTH_EYE_EXISTING_OR_NULL, 
			question,
		};
	}
	
	if(!_isQuestionPageResultValid_Type(question, result)) {
		return { 
			isValid: false, 
			type: VALIDATION_TYPE.INPUT_TYPE, 
			question
		};
	}
	
	return { isValid: true };
}

/**
 * @param {Object} results 可以是examRecordResult或者是surveyResult
 * @param {Object} contentKey examRecord，survey等
 */
function buildQustionMapFromResults(results, contentKey) {
	const questionMap = {};
	results.forEach(r => {
		const pages = r[contentKey].content;
		pages.forEach(p => {
			const questionName = p.elements[0].name; // 目前每页只支持一个问题
			questionMap[questionName] = p.elements[0];
		});
	});
	
	return questionMap;
}

function _findQuestionColumnByName(question, name) {
	return question.columns.find(c => c.name === name);
}

function _isQuestionPageResultValid_Type(question, result) {
	let isValid = true;
	
	const _checkType = (r) => {
		let resultValid = true;
		
		r && objectMap(r, (v, k) => {
			if(!resultValid) return;
			const column = _findQuestionColumnByName(question, k);
			if(column && column.inputType) {
				resultValid = _checkInputType(v, column.inputType);
			}
		});
		return resultValid;
	};
	
	const _checkInputType = (v, inputType) => {
		let resultValid = true;
		if(v !== undefined && v !== null && inputType) {
			switch(inputType) {
				case 'number':
				case 'digit':
					resultValid = !isNaN(Number(v));
					break;
				case 'text':
					resultValid = typeof(v) === 'string';
					break;
				default:
					break;
			}
		}
		return resultValid;
	}

	if(result) {
		switch(question.type) {
			case 'matrixdynamic':
				isValid = result.every(r => _checkType(r));
				break;
			case 'matrixdropdown':
				objectMap(result, (rvv, rvk) => {
					if(!isValid) return;
					isValid = _checkType(rvv);
				});
				break;
			case 'text':
				isValid = _checkInputType(result, question.inputType);
			case 'radiogroup':
			default:
				break;
		}
	}
	
	return isValid;
}

function _isQuestionPageResultValid_Qequired(question, result) {

	if(!question.isRequired) return true;

	let isValid = false;
	
	switch(question.type) {
		case 'text':
			isValid = result !== null && result !== undefined && result.trim() !== '';
			break;
		case 'radiogroup':
			isValid = result !== null && result !== undefined;
			break;
		case 'matrixdynamic':
			isValid = !!result && result.length === question.rowCount;
			if(isValid) {
				result.forEach(r => {
					if(!r) {
						isValid = false;
						return;
					}
					question.columns.forEach((c => {
						if(!r[c.name]) {
							isValid = false;
							return;
						}
					}));
				});
			}
			break;
		case 'matrixdropdown':
			isValid = !!result && !!Object.keys(result) && Object.keys(result).length === question.rows.length;
			if(isValid) {
				question.rows.forEach(r => {
					question.columns.forEach((c => {
						if(!result[r.value] || !result[r.value][c.name]) {
							isValid = false;
							return;
						}
					}));
				})
			}
			break;
			
		default:
			break;
	}
	
	return isValid;
}

// TODO：ucharts图的第一条线必须没有null值，暂时增加下方逻辑去保证双眼数据同时具备
function _isQuestionPageResultValid_BothEyeExistingOrNull(question, result) {
	let isValid = true;
	switch(question.type) {
		case 'matrixdynamic':
			isValid = result.every(r => (!r.left && !r.right) || (!!r.left && !!r.right));
			break;
		case 'matrixdropdown':
			objectMap(result, (v, k) => {
				if(!isValid) return;
				isValid = (!v.left && !v.right) || (!!v.left && !!v.right);
			})
			break;
		default:
			break;
	}
	return isValid;
}

function buildInitResult(item) {
	if(item && item.content) {
		const result = {};
		// 目前每次启动总获取新问卷，未来数据可以从服务器端暂存的问卷
		item.content.forEach(page => {
			page.elements.forEach(question => {
				switch(question.type) {
					case 'matrixdynamic':
					case 'matrixdropdown':
						const columnsResult = question.columns.reduce(function(acc, cur, i) {
							acc[cur.name] = null;
							return acc;
						}, {});
						if(question.rows && question.rows.length > 0) {
							result[question.name] = question.rows.reduce(function(acc, cur, i) {
								acc[cur.value] = { ...columnsResult };
								return acc;
							}, {});
						} else {
							result[question.name] = Array.from(Array(question.rowCount), function () {
								return { ...columnsResult };
							});
						}
						break;
					case 'radiogroup':
					default:
						result[question.name] = null;
						break;
				}
			});
		});
		return result;
	}
}

export {
	buildInitResult,
	isQuestionVisible,
	isQuestionPageResultValid,
	buildQustionMapFromResults,
}
