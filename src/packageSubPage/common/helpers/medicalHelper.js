const AGES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const HYPEROPIA_RESERVATION_STANDARD = [ // 远视储备标准，来自《小学生防控近视手册》
	{ value: 3.00 }, 
	{ value: 3.00 }, 
	{ value: 3.00 }, 
	{ value: 3.00 }, 
	{ value: 2.00 }, 
	{ value: 2.00 }, 
	{ value: 1.50 }, 
	{ value: 1.50 }, 
	{ value: 1.00 }, 
	{ value: 0.75 }, 
	{ value: 0.50 }, 
	{ value: 0.25 }, 
	{ value: 0 }, 
	{ value: 0 }, 
	{ value: 0 }, 
	{ value: 0 }, 
	{ value: 0 }, 
	{ value: 0 }, 
	{ value: 0 }
];
const VISION_STANDARD = [ // 视力发育标准
	{ value: 0.1 }, 
	{ value: 0.2 }, 
	{ value: 0.5 }, 
	{ value: 0.6 }, 
	{ value: 0.8 }, 
	{ value: 1.0 }, 
	{ value: 1.2 }, 
	{ value: 1.2 },
	{ value: 1.2 },
	{ value: 1.2 },
	{ value: 1.2 },
	{ value: 1.2 }, 
	{ value: 1.2 },
	{ value: 1.2 },
	{ value: 1.2 },
	{ value: 1.2 },
	{ value: 1.2 },
	{ value: 1.2 },
	{ value: 1.2 },
];
const AXIAL_LENGTH_STANDARD = { // 眼轴发育标准
	male: [
		{ length: null, error: null },
		{ length: null, error: null },
		{ length: null, error: null },
		{ length: null, error: null }, 
		{ length: 22.52, error: 0.17 },
		{ length: 22.62, error: 0.09 },
		{ length: 22.81, error: 0.09 },
		{ length: 23.03, error: 0.10 },
		{ length: 23.40, error: 0.14 },
		{ length: 23.50, error: 0.19 },
		{ length: 23.76, error: 0.18 },
		{ length: 23.74, error: 0.24 },
		{ length: 24.21, error: 0.24 },
		{ length: 24.32, error: 0.30 },
		{ length: 24.37, error: 0.30 },
		{ length: 25.74, error: 0.29 },
		{ length: 25.07, error: 0.26 },
		{ length: null, error: null },
		{ length: null, error: null },
	],
	female: [
		{ length: null, error: null },
		{ length: null, error: null },
		{ length: null, error: null },
		{ length: null, error: null }, 
		{ length: 21.90, error: 0.20 },
		{ length: 22.10, error: 0.10 },
		{ length: 22.25, error: 0.09 },
		{ length: 22.49, error: 0.09 },
		{ length: 22.77, error: 0.11 },
		{ length: 22.93, error: 0.18 },
		{ length: 23.30, error: 0.18 },
		{ length: 23.59, error: 0.21 },
		{ length: 23.68, error: 0.27 },
		{ length: 23.81, error: 0.27 },
		{ length: 23.89, error: 0.29 },
		{ length: 24.72, error: 0.24 },
		{ length: 24.64, error: 0.24 },
		{ length: null, error: null },
		{ length: null, error: null },
	]
	
};
const KERATOMETRY_STANDARD = [ // 曲率发育标准
	{ length: 16.2, lengthMax: null, growth: 0.6, growthMax: 0.6 },
	{ length: 17.7, lengthMax: null, growth: 0.6, growthMax: 0.6 },
	{ length: 18.7, lengthMax: 20.5, growth: 0.5, growthMax: 0.5 },
	{ length: 19.6, lengthMax: 21.1, growth: 0.4, growthMax: 0.4 },
	{ length: 20.3, lengthMax: 21.5, growth: 0.4, growthMax: 0.4 },
	{ length: 21.1, lengthMax: 22.0, growth: 0.4, growthMax: 0.4 },
	{ length: 21.6, lengthMax: 22.4, growth: 0.3, growthMax: 0.4 },
	{ length: 22.0, lengthMax: 22.6, growth: 0.3, growthMax: 0.4 },
	{ length: 22.4, lengthMax: 22.9, growth: 0.3, growthMax: 0.3 },
	{ length: 22.7, lengthMax: 23.2, growth: 0.3, growthMax: 0.3 },
	{ length: 23.0, lengthMax: 23.6, growth: 0.2, growthMax: 0.3 },
	{ length: 23.3, lengthMax: 23.9, growth: 0.2, growthMax: 0.3 },
	{ length: 23.5, lengthMax: 24.1, growth: 0.2, growthMax: 0.2 },
	{ length: 23.7, lengthMax: 24.3, growth: 0.2, growthMax: 0.2 },
	{ length: 23.8, lengthMax: 24.5, growth: 0.1, growthMax: 0.1 },
	{ length: 24.0, lengthMax: 24.7, growth: 0.0, growthMax: 0.0 },
];

const MYOPIC_AGE_RANGE = {
	TWO_YEARS_OLD_AND_YOUNGER: 'TWO_YEARS_OLD_AND_YOUNGER',
	THREE_YEARS_OLD: 'THREE_YEARS_OLD',
	FOUR_TO_FIVE_YEARS_OLD: 'FOUR_TO_FIVE_YEARS_OLD',
	SIX_YEARS_OLD: 'SIX_YEARS_OLD',
	SEVEN_YEARS_OLD_AND_OLDER: 'SEVEN_YEARS_OLD_AND_OLDER'
};
const MYOPIC_LOW_VISION_THRESHOLD = {
	THREE_YEARS_OLD: 0.5,
	FOUR_TO_FIVE_YEARS_OLD: 0.6,
	SIX_YEARS_OLD: 0.8,
	SEVEN_YEARS_OLD_AND_OLDER: 0.8
};
const MYOPIC_SE_THRESHOLD = {
	THREE_YEARS_OLD: { LOWERBOUND: 0, UPPERBOUND: 2.0 },
	FOUR_TO_FIVE_YEARS_OLD: { LOWERBOUND: 0, UPPERBOUND: 2.0 },
	SIX_YEARS_OLD: { LOWERBOUND: 0, UPPERBOUND: 2.0 },
	SEVEN_YEARS_OLD_AND_OLDER: { LOWERBOUND: -0.5, UPPERBOUND: 3.0 }
};

function getAgeRange(age) {
	if(age === undefined || age === null) return;
	
	if(age > 0 && age < 3) { //3岁以下
		return MYOPIC_AGE_RANGE.TWO_YEARS_OLD_AND_YOUNGER;
	} else if(age === 3) { // 3岁
		return MYOPIC_AGE_RANGE.THREE_YEARS_OLD;
	} else if(age < 6) { // 4~5岁
		return MYOPIC_AGE_RANGE.FOUR_TO_FIVE_YEARS_OLD;
	} else if(age === 6) { // 6岁
		return MYOPIC_AGE_RANGE.SIX_YEARS_OLD;
	} else { // 7岁及以上
		return MYOPIC_AGE_RANGE.SEVEN_YEARS_OLD_AND_OLDER;
	}
}

function convertVisionFromDecimal(decimal) {
	switch(decimal) {
		case 0.03: return 3.5;
		case 0.04: return 3.6;
		case 0.05: return 3.7;
		case 0.06: return 3.8;
		case 0.08: return 3.9;
		case 0.1: return 4.0;
		case 0.12: return 4.1;
		case 0.15: return 4.2;
		case 0.2: return 4.3;
		case 0.25: return 4.4;
		case 0.3: return 4.5;
		case 0.4: return 4.6;
		case 0.5: return 4.7;
		case 0.6: return 4.8;
		case 0.8: return 4.9;
		case 1.0: return 5.0;
		case 1.2: return 5.1;
		case 1.5: return 5.2;
		case 2.0: return 5.3;
		default: return;
	}
}

export {
	AGES,
	HYPEROPIA_RESERVATION_STANDARD,
	VISION_STANDARD,
	AXIAL_LENGTH_STANDARD,
	KERATOMETRY_STANDARD,
	MYOPIC_AGE_RANGE,
	MYOPIC_LOW_VISION_THRESHOLD,
	MYOPIC_SE_THRESHOLD,
	getAgeRange,
	convertVisionFromDecimal
}
