import { CHART_TEMPLATE } from '@/packageSubPage/common/helpers/chartHelper';
import { buildQustionMapFromResults } from '@/packageSubPage/common/helpers/questionHelper';

function _buildChartData(results, questionMap, key) {
			
	const categories = [];
	let series;
	
	const type = questionMap[key].type;
	switch(type) {
		case 'text':
			series = [ { data: [] } ];
			results.forEach(v => {
				if(!v.result[key]) return;
				categories.push(v.recordedAt);
				series[0].data.push([v.recordedAt, v.result[key]]);
				series[0].unit = questionMap[key].unit;
			});
			if(series[0].data.length === 0) return;
			break;
		case 'matrixdynamic':
			series = [ { data: [], name: '左眼' }, { data: [], name: '右眼' } ];
			results.forEach(v => {
				if(!v.result[key][0]) return;
				const { left, right } = v.result[key][0];
				if(!left && !right) return;
				categories.push(v.recordedAt);
				series[0].data.push([v.recordedAt, left]);
				series[0].unit = questionMap[key].columns[0].unit;
				series[1].data.push([v.recordedAt, right]);
				series[1].unit = questionMap[key].columns[1].unit;
			});
			if(series[0].data.length === 0 && series[1].data.length === 0) return;
			break;
		default:
			break;
	}
	
	const xAxis = { 
		type: 'time', minInterval: 3600 * 24 * 1000, 
		axisLabel: { rotate: 45, formatter: '{yy}/{MM}/{dd}' },
	};
	return { categories, series, xAxis, title: questionMap[key].title };
}

function parseExamRecordResults(examRecordResults) {
	if(!examRecordResults || examRecordResults.length <= 0) return;

	const questionMap = buildQustionMapFromResults(examRecordResults, 'examRecord');

	const groupedResults = {}, parsedResults = {};
	examRecordResults.forEach(r => {
		if(!r || !r.result) return;
		
		Object.keys(r.result).forEach((k, i) => {
			if(groupedResults[k]) {
				groupedResults[k].push(r);
			} else {
				groupedResults[k] = [r];
			}
		});
	});

	Object.keys(groupedResults).forEach(key => {
		const chartResult = _buildChartData(groupedResults[key], questionMap, key);
		if(chartResult) {
			parsedResults[key] = { chartResult, title: questionMap[key].title };
		}
	});
		
	return parsedResults;
}

export {
	parseExamRecordResults,
}
