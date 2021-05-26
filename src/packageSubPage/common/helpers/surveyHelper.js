import { 
	HYPEROPIA_RESERVATION_STANDARD,
	AXIAL_LENGTH_STANDARD,
	KERATOMETRY_STANDARD,
	VISION_STANDARD,
	MYOPIC_AGE_RANGE,
	MYOPIC_LOW_VISION_THRESHOLD,
	MYOPIC_SE_THRESHOLD,
	getAgeRange
} from "@/packageSubPage/common/helpers/medicalHelper";
import {
	CHART_TYPE,
	HYPEROPIA_RESERVATION_BASIC_CHART_DATA, AXIAL_LENGTH_BASIC_CHART_DATA, VISION_BASIC_CHART_DATA,
} from '@/packageSubPage/common/helpers/chartHelper';
import { buildQustionMapFromResults } from '@/packageSubPage/common/helpers/questionHelper';

const AGES_CHART_CATEGORIES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(a => `${a}岁`);

const TEXT_LEFT_EYE = "左眼";
const TEXT_RIGNT_EYE = "右眼";
const TEXT_BOTH_EYES = "双眼";
const TEXT_PREFIX = "您孩子的";
const TEXT_OTHER_PREFIX = "非常抱歉，我们无法对您孩子的";
const TEXT_OTHER_SUFFIX = "作出判断，请补充信息或到医院接受检查。";
const NEW_LINE = '<p style="height: 13px;">&nbsp;</p>';

const SURVEY_TYPE_LEFT_EYE = 'LEFT_EYE';
const SURVEY_TYPE_RIGNT_EYE = 'RIGNT_EYE';
const SURVEY_TYPE_BOTH_EYES = 'BOTH_EYES';
const SURVEY_TYPE_ABNORMAL = 'ABNORMAL';
const SURVEY_TYPE_NORMAL = 'NORMAL';
const SURVEY_TYPE_OTHER = 'OTHER';

const SURVEY_TYPE_MYOPIC_PREFIX = "MYOPIC";
const SURVEY_TYPE_VISION_PREFIX = "VISION";
const SURVEY_TYPE_HYPEROPIA_RESERVATION_PREFIX = "HYPEROPIA_RESERVATION";
const SURVEY_TYPE_AXIAL_LENGTH_PREFIX = "AXIAL_LENGTH";
const SURVEY_TYPE_KERATOMETRY_PREFIX = "KERATOMETRY";
const SURVEY_TYPE_META_GROUP = {
	MYOPIC: {
		CORRECTED_VISION_DECREASED: { // 戴镜视力下降
			type: `${SURVEY_TYPE_MYOPIC_PREFIX}_CORRECTED_VISION_DECREASED`, 
			textPrefix: '<h3>综合结果</h3>' + NEW_LINE + TEXT_PREFIX,
			textSuffix: "戴镜视力下降，建议及时到医疗机构复查，确定是否需要更换眼镜。"
		},
		CORRECTED_VISION_NORMAL: { // 戴镜视力正常
			type: `${SURVEY_TYPE_MYOPIC_PREFIX}_CORRECTED_VISION_NORMAL`,
			textPrefix: '<h3>综合结果</h3>' + NEW_LINE + TEXT_PREFIX,
			textSuffix: "戴镜视力正常，建议每6~12个月检查裸眼视力和戴镜视力。"
		},
		VISION_DECREASED_WITH_ABNORMAL_FUNCTION: { // 裸眼视力下降，可能伴有视功能异常
			type: `${SURVEY_TYPE_MYOPIC_PREFIX}_VISION_DECREASED_WITH_ABNORMAL_FUNCTION`,
			textPrefix: '<h3>综合结果</h3>' + NEW_LINE + TEXT_PREFIX,
			textSuffix: "裸眼视力下降、视功能可能异常，建议到医疗结构接受检查，明确诊断并及时采取措施。" 
		},
		VISION_DECREASED_WITH_AMETROPIA: { // 裸眼视力下降，并伴有屈光不正
			type: `${SURVEY_TYPE_MYOPIC_PREFIX}_VISION_DECREASED_WITH_AMETROPIA`,
			textPrefix: '<h3>综合结果</h3>' + NEW_LINE + TEXT_PREFIX,
			textSuffix: "裸眼视力下降、合并较为明显的屈光不正，请到医疗机构明确诊断并及时矫治。"
		},
		VISION_NORMAL: { // 裸眼视力正常
			type: `${SURVEY_TYPE_MYOPIC_PREFIX}_VISION_NORMAL`,
			textPrefix: '<h3>综合结果</h3>' + NEW_LINE + TEXT_PREFIX,
			textSuffix: "视力正常，请继续保持！"
		},
		OTHER: { 
			type: `${SURVEY_TYPE_MYOPIC_PREFIX}_${SURVEY_TYPE_OTHER}`,
			textPrefix: '<h3>综合结果</h3>' + NEW_LINE + TEXT_OTHER_PREFIX,
			textSuffix: `视力${TEXT_OTHER_SUFFIX}`
		},
	},
	HYPEROPIA_RESERVATION: {
		ABNORMAL: {
			type: `${SURVEY_TYPE_HYPEROPIA_RESERVATION_PREFIX}_${SURVEY_TYPE_ABNORMAL}`,
			textPrefix: '<h3>远视储备</h3>' + NEW_LINE + TEXT_PREFIX,
			textSuffix: "远视储备不足，请到医疗机构明确诊断并及时矫治。"
		},
		NORMAL: {
			type: `${SURVEY_TYPE_HYPEROPIA_RESERVATION_PREFIX}_${SURVEY_TYPE_NORMAL}`,
			textPrefix: '<h3>远视储备</h3>' + NEW_LINE + TEXT_PREFIX,
			textSuffix: "远视储备充足，请继续保持。"
		},
		OTHER: {
			type: `${SURVEY_TYPE_HYPEROPIA_RESERVATION_PREFIX}_${SURVEY_TYPE_OTHER}`,
			textPrefix: '<h3>远视储备</h3>' + NEW_LINE + TEXT_OTHER_PREFIX,
			textSuffix: `远视储备${TEXT_OTHER_SUFFIX}`
		}
	},
	VISION: {
		ABNORMAL: {
			type: `${SURVEY_TYPE_VISION_PREFIX}_${SURVEY_TYPE_ABNORMAL}`,
			textPrefix: '<h3>视力发育</h3>' + NEW_LINE + TEXT_PREFIX,
			textSuffix: "视力发育水平低于正常，请到医疗机构明确诊断并及时矫治。",
		},
		NORMAL: {
			type: `${SURVEY_TYPE_VISION_PREFIX}_${SURVEY_TYPE_NORMAL}`,
			textPrefix: '<h3>视力发育</h3>' + NEW_LINE + TEXT_PREFIX,
			textSuffix: "视力发育水平正常，请继续保持。"
		},
		OTHER: {
			type: `${SURVEY_TYPE_VISION_PREFIX}_${SURVEY_TYPE_OTHER}`,
			textPrefix: '<h3>视力发育</h3>' + NEW_LINE + TEXT_OTHER_PREFIX,
			textSuffix: `视力发育水平${TEXT_OTHER_SUFFIX}`
		}
	},
	AXIAL_LENGTH: {
		ABNORMAL: {
			type: `${SURVEY_TYPE_AXIAL_LENGTH_PREFIX}_${SURVEY_TYPE_ABNORMAL}`,
			textPrefix: '<h3>眼轴长度</h3>' + NEW_LINE + TEXT_PREFIX,
			textSuffix: "眼轴长度不在正常范围之内，请到医疗机构明确诊断并及时矫治。",
		},
		NORMAL: {
			type: `${SURVEY_TYPE_AXIAL_LENGTH_PREFIX}_${SURVEY_TYPE_NORMAL}`,
			textPrefix: '<h3>眼轴长度</h3>' + NEW_LINE + TEXT_PREFIX,
			textSuffix: "眼轴长度处于正常范围，请继续保持。"
		},
		OTHER: {
			type: `${SURVEY_TYPE_AXIAL_LENGTH_PREFIX}_${SURVEY_TYPE_OTHER}`,
			textPrefix: '<h3>眼轴长度</h3>' + NEW_LINE + TEXT_OTHER_PREFIX,
			textSuffix: `眼轴长度${TEXT_OTHER_SUFFIX}`
		}
	},
	KERATOMETRY: {
		ABNORMAL: {
			type: `${SURVEY_TYPE_KERATOMETRY_PREFIX}_${SURVEY_TYPE_ABNORMAL}`,
			textPrefix: '<h3>角膜曲率</h3>' + NEW_LINE + TEXT_PREFIX,
			textSuffix: "角膜曲率不在正常范围之内，请到医疗机构明确诊断并及时矫治。",
		},
		NORMAL: {
			type: `${SURVEY_TYPE_KERATOMETRY_PREFIX}_${SURVEY_TYPE_NORMAL}`,
			textPrefix: '<h3>角膜曲率</h3>' + NEW_LINE + TEXT_PREFIX,
			textSuffix: "角膜曲率处于正常范围，请继续保持。"
		},
		OTHER: {
			type: `${SURVEY_TYPE_KERATOMETRY_PREFIX}_${SURVEY_TYPE_OTHER}`,
			textPrefix: '<h3>角膜曲率</h3>' + NEW_LINE + TEXT_OTHER_PREFIX,
			textSuffix: `角膜曲率${TEXT_OTHER_SUFFIX}`
		}
	}
};

function isSurveyQuestionVisible(question, surveyResult) {
	if(question['visibleIf']) {
		let visibleIf = question['visibleIf'].split('=');
		if(visibleIf[0] && visibleIf[1]) {
			const key = visibleIf[0].trim().slice(1, -1);
			const value = visibleIf[1].trim();
			return surveyResult && surveyResult['result'] && surveyResult['result'][key] === value;
		}
	}
	
	return true;
}

function _parseChartData(age, bothEyeData, basicData, result, key) {
	
	const leftData = Array(AGES_CHART_CATEGORIES.length).fill(null);
	leftData[age] = parseFloat(bothEyeData['left']);
	
	const rightData = Array(AGES_CHART_CATEGORIES.length).fill(null);
	rightData[age] = parseFloat(bothEyeData['right']);

	const question = result && key && buildQustionMapFromResults([result], 'survey')[key];
	const series = [
		{ data: leftData, name: "左眼", unit: question && question.columns[0].unit }, 
		{ data: rightData, name: "右眼", unit: question && question.columns[1].unit }, 
	];
	const categories = AGES_CHART_CATEGORIES;
	return { series, categories, basicData };
}

function _parseMyopicSurveyResult(result) {
	const typeMetaGroup = SURVEY_TYPE_META_GROUP.MYOPIC;
	const typeMetas = {
		left: typeMetaGroup.OTHER,
		right: typeMetaGroup.OTHER
	};
	
	if(result && result['question-age'] && result['question-gender']) {
		
		const _ = (eye) => {
			try {
				const ageRange = getAgeRange(result['question-age']);
				const vision = Number(result['question-vision'] && result['question-vision'][0] && result['question-vision'][0][eye]);
				const correctedVision = Number(result['question-correctedVision'] && result['question-correctedVision'][0] && result['question-correctedVision'][0][eye]);
				const se = Number(
					result['question-diopter']
					&& result['question-diopter']['se'] 
					&& result['question-diopter']['se'][eye]);
				const cylindrical = Math.abs(Number(
					result['question-diopter']
					&& result['question-diopter']['cylindrical'] 
					&& result['question-diopter']['cylindrical'][eye]));
				const glass = result['question-glass'] && result['question-glass'][eye];
				const other = result['question-other'];
				
				if(vision > MYOPIC_LOW_VISION_THRESHOLD[ageRange]) return typeMetaGroup.VISION_NORMAL;
				
				let questionOtherResult;
				switch(ageRange) {
					case MYOPIC_AGE_RANGE.THREE_YEARS_OLD:
					case MYOPIC_AGE_RANGE.FOUR_TO_FIVE_YEARS_OLD:
					case MYOPIC_AGE_RANGE.SIX_YEARS_OLD:
						questionOtherResult = other === 'true';
					case MYOPIC_AGE_RANGE.SEVEN_YEARS_OLD_AND_OLDER:
						if(glass === 'true') {
							return correctedVision < MYOPIC_LOW_VISION_THRESHOLD[ageRange]
								? typeMetaGroup.CORRECTED_VISION_DECREASED
								: typeMetaGroup.CORRECTED_VISION_NORMAL;
						} else {
							const visionFunctionAbnormal = questionOtherResult
								|| (se >= MYOPIC_SE_THRESHOLD[ageRange].LOWERBOUND
									&& se < MYOPIC_SE_THRESHOLD[ageRange].UPPERBOUND 
									&& cylindrical <= 1.50);
							return correctedVision < MYOPIC_LOW_VISION_THRESHOLD[ageRange]
								? typeMetaGroup.CORRECTED_VISION_DECREASED
								: typeMetaGroup.CORRECTED_VISION_NORMAL;
						}
					case MYOPIC_AGE_RANGE.TWO_YEARS_OLD_AND_YOUNGER:
					default:
						return typeMetaGroup.OTHER;
				}
			} catch(e) {
				console.error(e);
				return typeMetaGroup.OTHER; 
			}
		}
		
		typeMetas['left'] = _('left');
		typeMetas['right'] = _('right');
		
	}
	const headerTextResult = _parseSurveyHeaderResult(typeMetas);
	
	return { headerTextResult };
}

function _parseHyperopiaReservationSurveyResult(result, surveyResult) {
	const age = result['question-age'];
	const diopterSE = _getDiopterSE(result) || {};
	
	const typeMetaGroup = SURVEY_TYPE_META_GROUP.HYPEROPIA_RESERVATION;
	const typeMetas = {
		left: typeMetaGroup.OTHER,
		right: typeMetaGroup.OTHER
	};
	
	if(age) {
		const entries = diopterSE;
		Object.keys(entries).forEach(eye => { // key is left or right
			if(entries[eye]) {
				const value = Number(entries[eye]);
				const normal = value > HYPEROPIA_RESERVATION_STANDARD[age].value;
				typeMetas[eye] = normal ? typeMetaGroup.NORMAL : typeMetaGroup.ABNORMAL;
			}
		});
	}
	const headerTextResult = _parseSurveyHeaderResult(typeMetas);
	
	const chartResult = _parseChartData(age, diopterSE, HYPEROPIA_RESERVATION_BASIC_CHART_DATA, surveyResult, 'question-diopter');
	return { headerTextResult, chartResult };
}

function _parseVisionSurveyResult(result) {
	const age = result['question-age'];
	const vision = _getBestVision(result) || {};
	
	const typeMetaGroup = SURVEY_TYPE_META_GROUP.VISION;
	const typeMetas = {
		left: typeMetaGroup.OTHER,
		right: typeMetaGroup.OTHER
	};
	
	if(age) {
		const entries = vision;
		Object.keys(vision).forEach(eye => { // key is left or right
			if(entries[eye]) {
				const value = Number(entries[eye]);
				const normal = value > VISION_STANDARD[age].value;
				typeMetas[eye] = normal ? typeMetaGroup.NORMAL : typeMetaGroup.ABNORMAL;
			}
		});
	}	
	const headerTextResult = _parseSurveyHeaderResult(typeMetas);
	
	const chartResult = _parseChartData(age, vision, VISION_BASIC_CHART_DATA);
	return { headerTextResult, chartResult };
}

function _parseAxialLengthSurveyResult(result, surveyResult) {
	
	const age = result['question-age'];
	const gender = result['question-gender'];
	const axialLength = result['question-axialLength'];
	
	const typeMetaGroup = SURVEY_TYPE_META_GROUP.AXIAL_LENGTH;
	const typeMetas = {
		left: typeMetaGroup.OTHER,
		right: typeMetaGroup.OTHER
	};

	if(age && age >= 3 && gender && axialLength && axialLength[0]) {
		const entries = axialLength[0];
		Object.keys(entries).forEach(eye => { // key is left or right
			if(entries[eye]) {
				const value = Number(entries[eye]);
				const { length, error } = AXIAL_LENGTH_STANDARD[gender][age];
				const normal = value >= (length - error) && value <= (length + error);
				typeMetas[eye] = normal ? typeMetaGroup.NORMAL : typeMetaGroup.ABNORMAL;
			}
		});
	}
	const headerTextResult = _parseSurveyHeaderResult(typeMetas);
	
	const chartResult = _parseChartData(
		age, 
		axialLength && axialLength[0], 
		AXIAL_LENGTH_BASIC_CHART_DATA[gender], 
		surveyResult, 
		'question-axialLength'
	);
	return { headerTextResult, chartResult };
}

function _parseSurveyHeaderResult(typeMetas) {
	
	const { left, right } = typeMetas;
	
	const parsedSurveyResult = {
		leftType: left.type,
		rightType: right.type,
	};
		
	if(left.type === right.type) {
		parsedSurveyResult['text'] = `${left.textPrefix}${TEXT_BOTH_EYES}${left.textSuffix}`;
	} else {
		const leftText = `${left.textPrefix}${TEXT_LEFT_EYE}${left.textSuffix}`;
		const rightText = `${right.textPrefix}${TEXT_RIGHT_EYE}${right.textSuffix}`;
		parsedSurveyResult['text'] = `${leftText}${rightText}`;
	}

	return parsedSurveyResult;
}

function _getBestVision(result) {
	const bestVision = {};
	const correctedVision = result['question-correctedVision'] 
		&& result['question-correctedVision'][0];
	const vision = result['question-vision']
		&& result['question-vision'][0];
	
	bestVision['left'] = Math.max(
		Number(correctedVision && correctedVision['left']), 
		Number(vision && vision['left']));
	bestVision['right'] = Math.max(
		Number(correctedVision && correctedVision['right']), 
		Number(vision && vision['right']));
		
	return bestVision;
}

function _getDiopterSE(result) {
	if(!result['question-diopter']) return;
	
	const diopter = result['question-diopter']['se'];
	
	const spherical = result['question-diopter']['spherical'];
	const cylindrical = result['question-diopter']['cylindrical'];
	
	diopter['left'] = diopter['left'] || ((spherical && spherical['left']) + (cylindrical && cylindrical['left']/2));
	diopter['right'] = diopter['right'] || ((spherical && spherical['right']) + (cylindrical && cylindrical['right']/2));
	
	return diopter;
}

function parseSurveyResult(surveyResult) {
	if(!surveyResult || !surveyResult.survey || !surveyResult.result) return;

	const { survey, result } = surveyResult;	
	const parsedSurveyResults = {};
	
	if('question-diopter' in result) {
		parsedSurveyResults.diopter = _parseHyperopiaReservationSurveyResult(result, surveyResult);
	}
	
	if('question-axialLength' in result) {		
		parsedSurveyResults.axialLength = _parseAxialLengthSurveyResult(result, surveyResult);
	}
	
	if('question-correctedVision' in result || 'question-vision' in result) {
		parsedSurveyResults.vision = _parseVisionSurveyResult(result, surveyResult);
	}
	
	if('question-diopter' in result
		&& 'question-glass' in result && 'question-other' in result
		&& 'question-correctedVision' in result || 'question-vision' in result) {
		parsedSurveyResults.myopic = _parseMyopicSurveyResult(result, surveyResult);
	}
	
	return parsedSurveyResults;
}

export {
	parseSurveyResult,
	isSurveyQuestionVisible,
}
