export const APP = {
	APP_NAME: '咕咕青少年近视防控',
	APP_SHORT_NAME: '咕咕眼健康',
	SLOGAN: '宝贝的眼睛，咕咕在用心~'
};
export const CLIENT_TYPE = 'GUGU_WECHAT_MINI';
export const ACTION_TYPE = {
	VISIT: 'Visit',
	COMMENT: 'Comment',
	COLLECT: 'Collect',
	SHARE: 'Share',
};
export const ACTION_TARGET_TYPE = {
    APP: 'APP',
	USER: 'User',
	OFFICIAL_USER: 'OfficialUser',
	DOCTOR: 'Doctor',
	ARTICLE: 'Article',
	POST: 'Post',
	POST_PUBLISH: 'PostPublish',
	POST_COMMENT: 'PostComment',
	ORGANIZATION: 'Organization',
	SURVEY: 'Survey',
	SURVEY_RESULT: 'SurveyResult',
	SURVEY_DETAIL: 'SurveyDetail',
	COMMENT: 'Comment',
	EXAM_RECORD: 'ExamRecord',
	EXAM_RECORD_ADD_LIST: 'ExamRecordAddList',
	EXAM_RECORD_ADD: 'ExamRecordAdd',
	EXAM_RECORD_RESULT_LIST: 'ExamRecordResultList',
	EXAM_RECORD_ANALYZE: 'ExamRecordResultAnalyze'
};
export const PAGES = {
	HOME: { tag: "HOME", path: "/pages/home/index", ref: 'Home' },
	CIRCLE: { tag: "CIRCLE", path: "/pages/circle/index", ref: 'Circle' },
	POST: { tag: "POST", path: "/packageSubPage/pages/post/index", ref: 'Post' },
	POST_PUBLISH: { tag: "POST_PUBLISH", path: "/pages/post-publish/index", ref: 'PostPublish' },
	MINE: { tag: "MINE", path: "/pages/mine/index" },
	ARTICLE: { tag: "ARTICLE", path: "/packageSubPage/pages/article/index" },
	SURVEY: { tag: "SURVEY", path: "/packageSubPage/pages/survey/index", title: "近视评测", description: "想全面评估孩子的眼健康？", ref: ACTION_TARGET_TYPE['SURVEY'] },
	SURVEY_DETAIL: { tag: "SURVEY_DETAIL", path: "/packageSubPage/pages/survey/survey-detail", title: "近视评测", ref: ACTION_TARGET_TYPE['SURVEY_DETAIL'] },
	SURVEY_RESULT: { tag: "SURVEY_RESULT", path: "/packageSubPage/pages/survey/survey-result", title: "近视评测",  ref: ACTION_TARGET_TYPE['SURVEY_RESULT'] },
	COLLECT: { tag: "COLLECT", path: "/packageSubPage/pages/collect/index" },
	SEARCH: { tag: "SEARCH", path: "/packageSubPage/pages/search/index" },
	DOCTOR: { tag: "DOCTOR", path: "/packageSubPage/pages/doctor/index" },
	WIKI: { tag: "WIKI", path: "/packageSubPage/pages/wiki/index" },
	EXAM_RECORD: { tag: "EXAM_RECORD", path: "/packageSubPage/pages/exam-record/index", ref: ACTION_TARGET_TYPE['EXAM_RECORD'] },
	EXAM_RECORD_ADD_LIST: { tag: "EXAM_RECORD_ADD_LIST", path: "/packageSubPage/pages/exam-record/exam-record-add-list", ref: ACTION_TARGET_TYPE['EXAM_RECORD_ADD_LIST'] },
	EXAM_RECORD_ADD: { tag: "EXAM_RECORD_ADD", path: "/packageSubPage/pages/exam-record/exam-record-add", ref: ACTION_TARGET_TYPE['EXAM_RECORD_ADD'] },
	EXAM_RECORD_RESULT_LIST: { tag: "EXAM_RECORD_RESULT_LIST", path: "/packageSubPage/pages/exam-record/exam-record-result-list", ref: ACTION_TARGET_TYPE['EXAM_RECORD_RESULT_LIST'] },
	EXAM_RECORD_ANALYZE: { tag: "EXAM_RECORD_ANALYZE", path: "/packageSubPage/pages/exam-record/exam-record-analyze", ref: ACTION_TARGET_TYPE['EXAM_RECORD_ANALYZE'] },
	ABOUT: { tag: "ABOUT", path: "/packageSubPage/pages/about/index", ref: 'About' },
	COMMENT: { tag: "COMMENT", path: "/packageSubPage/pages/comment/index", ref: 'Comment' },
	SETTING: { tag: "SETTING", path: "/packageSubPage/pages/setting/index", ref: 'Setting' }
};
export const AUTHOR_TYPE = {
	DOCTOR: 'Doctor',
	OFFICIAL_USER: 'OfficialUser',
	USER: 'User',
	EXPERT: 'Expert'
};
export const LOCAL_STORAGE_KEYS = {
	SEARCH_HISTORY_KEY: 'SEARCH_HISTORY_KEY'
};
export const ACTION_ACTOR_TYPE = {
	DOCTOR: 'Doctor',
	OFFICIAL_USER: 'OfficialUser',
	USER: 'User',
	EXPERT: 'Expert'
};
export const ARTICLE_TYPE = {
    WIKI: 'WIKI',
    DEFAULT: 'DEFAULT',
};
export const POST_TYPE = {
    DEFAULT: 'DEFAULT',
};
export const ARTICLE_MEDIA_TYPE = {
    VIDEO: 'VIDEO',
    TEXT: 'TEXT',
    IMAGE_TEXT: 'IMAGE_TEXT',
    DEFAULT: 'DEFAULT',
};
export const EXAM_RECORD_TYPE = {
    BASIC: "BASIC", // 基础检查
    VISION: "VISION", // 视力
    OPTOMETRY: "OPTOMETRY", // 验光
    OPTICAL_BIOMETRY: "OPTICAL_BIOMETRY", // 光学生物测量
	GROWTH: "GROWTH", // 生长发育
    OTHER: "OTHER" // 其他检查
};
export const ONBOARDING_STATUS = {
	ONBOARDED: 'ONBOARDED',
	VERIFIED: 'VERIFIED',
	DEFAULT: 'DEFAULT',
};
export const SECURITY_CHECK_STATUS = {
    CHECKING: 'CHECKING',
    PASSED: 'PASSED',
    FAILED: 'FAILED',
};
export const NOTIFICATION_STATUS = {
    INIT: 'INIT',
    READ: 'READ',
    VIEWED: 'VIEWED',
};
