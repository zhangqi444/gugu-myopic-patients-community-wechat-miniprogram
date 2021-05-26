import { 
	HYPEROPIA_RESERVATION_STANDARD, VISION_STANDARD, AXIAL_LENGTH_STANDARD, KERATOMETRY_STANDARD,
	convertVisionFromDecimal
} from '@/packageSubPage/common/helpers/medicalHelper';

export const CHART_TEMPLATE = {
	SINGLE_YAXIS: 'SINGLE_YAXIS', DUAL_YAXIS: 'DUAL_YAXIS',
};

const _buildStandardData = (standardData) => {
	return { 
		type: "line", color: '#7ED395', name: "标准值",
		data: standardData.map(i => (i.value !== null && i.value !== undefined) ? i.value : null),
	};
};
const _buildData = (name, gender, factor) => {
	return { 
		name, type: "line", color: '#7ED395',
		data: AXIAL_LENGTH_STANDARD[gender].map(i => (i.length !== null && i.length !== undefined) ? (i.length + i.error * factor).toFixed(2) : NaN)
	};
};
export const AXIAL_LENGTH_BASIC_CHART_DATA = {
	male: [ _buildData("最小标准值", 'male', -1), _buildData("最大标准值", 'male', 1) ],
	female: [ _buildData("最小标准值", 'female', -1), _buildData("最大标准值", 'female', 1) ],
};
export const HYPEROPIA_RESERVATION_BASIC_CHART_DATA = [ _buildStandardData(HYPEROPIA_RESERVATION_STANDARD) ];
export const VISION_BASIC_CHART_DATA = [ _buildStandardData(VISION_STANDARD) ];

const KERATOMETRY_CHART_DATA = [
	// { name: "最小值标准线", type: "line", data: AXIAL_LENGTH_STANDARD.map(i => i.growth), color: '#F2FBF4' },
	// { name: "最大值标准线", type: "line", data: AXIAL_LENGTH_STANDARD.map(i => i.growthMax), color: '#F2FBF4' },
];

function getChartConfig(template, inputOne, inputTwo) {
	switch(template) {
		case CHART_TEMPLATE.SINGLE_YAXIS:
			return _getSingleYAxisChartConfig(inputOne);
		case CHART_TEMPLATE.DUAL_YAXIS:
			return _getDualYAxisChartConfig(inputOne, inputTwo);
		default:
			return _getSingleYAxisChartConfig(inputOne);
	}
}

function _getSingleYAxisChartConfig(input) {
	const chartData = _getChartData(input);
	const { series } = chartData;
	let unit = _getUnitFromSeries(series);;
	const config = _getBasicChartConfig(chartData, {
		...input, 
		title: unit && `单位：${unit['zh_CN']}(${unit['en_US']})`,
	});
	return { config };
}

function _getDualYAxisChartConfig(inputOne, inputTwo) {
	const configOne = _buildDualAxis(inputOne);
	const configTwo = _buildDualAxis(inputTwo);
	const yAxis = [ configOne.yAxis ];
	if(configTwo && configTwo.yAxis && configTwo.chartData) {
		yAxis.push(configTwo.yAxis);
		configTwo.chartData.series = configTwo.chartData.series.map(s => {
			return { ...s, yAxisIndex: 1};
		});
	}
		
	const xAxis = {
		type: 'time', minInterval: 3600 * 24 * 1000,
		axisLabel: { formatter: '{yy}/{MM}/{dd}' },
	};
	
	const dataZoom = [{ type: 'inside', minValueSpan: 3600 * 24 * 1000 * 30 }];
	
	const legend = {
		bottom: null, top: 0, left: 'center', align: 'right', 
		textStyle: { fontSize: 10, width: 60, overflow: 'break' }
	};
	
	const grid = { top: '15%', bottom: 0 };
	
	const config = _getBasicChartConfig(
		{ 
			categories: configOne.chartData.categories, 
			series: configOne.chartData.series.concat(configTwo && configTwo.chartData.series)
		},
		{ ...inputOne, yAxis, xAxis, dataZoom, legend, grid, title: null, },
	);
			
	return { config };
}

function _buildDualAxis(input) {
	if(!input) return;
	
	const chartData = _getChartData(input);
	
	let unit = _getUnitFromSeries(input.series);
	unit = unit ? `(单位：${unit['zh_CN']}${unit['en_US']})` : '';
	
	const yAxis = {
		type: 'value', 
		min: 'dataMin',	
		name: `${input.title}\n${unit}`,
		nameTextStyle: { fontSize: 10, }
	};
		
	chartData.series[0].name = (chartData.series[0].name ? chartData.series[0].name : '') + input.title;
	if(chartData.series[1]) {
		chartData.series[1].name = (chartData.series[1].name ? chartData.series[1].name : '') + input.title;
		chartData.series[1].lineStyle = {
			type: 'dashed'
		};
	}
		
	return { yAxis, chartData };
}

/**
 * @param {Object} data 用户输入的双眼数据
 * @param {Object} basicData 基准线数据
 * @param {Object} xMin 所显示的图表的x轴最小范围
 * @param {Object} xMax 所显示的图表的x轴最大范围
 */
function _getChartData(input, xMin, xMax) {

	const { series, basicData, categories } = input;

	if(xMin === undefined || xMin === null) xMin = 0;
	if(xMax === undefined || xMax === null) xMax = -1;
	
	const build = (array, categories, type) => {
		return (!array || !categories) ? [] : array.map(v => {
			let data = v.data.slice(xMin, xMax === -1 ? v.data.length : xMax);
			return { ...v, data, type: 'line' };
		});
	};	
	const parsedBasicData = build(basicData, categories);
	
	const parsedInputData = build(series, categories);
				
	const chartData = { 
		categories: categories.slice(xMin, xMax === -1 ? categories.length : xMax),
		series: parsedBasicData.concat(parsedInputData)
	};
		
	return chartData;
}

function _getUnitFromSeries(series) {
	let unit;
	series && series.some(s => {
		unit = s.unit;
		return unit;
	});
	return unit;
}

function _getBasicChartConfig(data, config) {	
	const { title, xAxis, tooltip, yAxis, toolbox, dataZoom, legend, grid } = config;

	return {
		lazyLoad: true,
		option: {
			title: { 
				text: title, show: title, top: 0, right: '12',
				textStyle: {
					color: '#AAAAAA', fontStyle: 'normal', fontWeight: 'normal', fontSize: 12
				},
			},
			color: ['#FD672F', '#40B3E6', '#FFC400', '#6640E6' ],
			tooltip: {
				trigger: 'axis', backgroundColor: 'rgba(0,0,0,0.7)', snap: true, confine: true,
				shadowStyle: { color: '#000000', opacity: 0.16, shadowBlur: 6 },
				textStyle: { color: '#FFFFFF', fontSize: 10, lineHeight: 18, },
				lineStyle: { color: '#ACACAC', width: 0.8 },
				axisPointer: { type: 'line', axis: 'x' },
				...tooltip
			},
			grid: {
				left: '5%', right: '5%', top: '12%', bottom: '12%', containLabel: true,
				...grid
			},
			legend: {
				data: data.series.map(v => v.name), bottom: 0, left: 'center',
				...legend
			},
			xAxis: Array.isArray(xAxis) ? xAxis : {
				type: 'category', splitLine: { show: false }, boundaryGap: false,
				data: data.categories || [],
				...xAxis,
			},
			yAxis: Array.isArray(yAxis) ? yAxis : { type: 'value', min: 'dataMin', ...yAxis },
			toolbox,
			dataZoom,
			series: data.series
		}
	};
}

function generateCanvasId() {
	return `canvas_${Math.ceil(Math.random(5) * 10000)}`;
}

export {
	getChartConfig,
	generateCanvasId,
}
