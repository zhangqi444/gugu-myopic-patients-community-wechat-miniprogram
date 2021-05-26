import store from "@/store/index";
import { AUTHOR_TYPE } from "@/common/constants";
import { DOCTOR_MUTATION_ADD_ONE } from "@/store/doctorStore";
import { EXPERT_MUTATION_ADD_ONE } from "@/store/expertStore";
import { OFFICIAL_USER_MUTATION_ADD_ONE } from "@/store/officialUserStore";
import { USER_MUTATION_ADD_ONE } from "@/store/userStore";
import { PAGES } from "@/common/constants";

function parseAuthor(source) {
	if(!source) return;
	
	let author = _getAuthor(source);
	let organization, fullTitle;
	switch (source.authorType) {
		case AUTHOR_TYPE.OFFICIAL_USER:
			const coAuthorsTitle = _parseCoAuthors(source.coAuthors);
			const coAuthorsLongTitle = _parseCoAuthorsLongTitle(source.coAuthors) || '';
			return {
				...author,
				// 如“医信眼科 | 王凯主任医师“。
				fullTitle: `${author.name}${coAuthorsTitle ? (' | ' + coAuthorsTitle) : ''}`, // 用于列表
				coAuthorsLongTitle, // 用于详情
			};
		case AUTHOR_TYPE.DOCTOR:
		case AUTHOR_TYPE.EXPERT:
			return {
				...author,
				fullTitle: _getFullTitle(author, true), // 用于列表，详情页面直接使用name
			};
		case AUTHOR_TYPE.USER:
			return {
				...author,
				fullTitle: author.nickname,
				name: author.nickname
			};
		default:
			return {};
	}
}

function addAuthor(source) {
	if(!source) return;
	
	switch (source.authorType) {
		case AUTHOR_TYPE.OFFICIAL_USER:
			store.commit(OFFICIAL_USER_MUTATION_ADD_ONE, { item: source.officialUser });
			break;
		case AUTHOR_TYPE.DOCTOR:
			store.commit(DOCTOR_MUTATION_ADD_ONE, { item: source.doctor });
			break;
		case AUTHOR_TYPE.EXPERT:
			store.commit(EXPERT_MUTATION_ADD_ONE, { item: source.expert });
			break;
		case AUTHOR_TYPE.USER:
			store.commit(USER_MUTATION_ADD_ONE, { item: source.user });
			break;
		default:
			break;
	}
}

function navigateToAuthorPage(source) {
	
	if(process.env.NODE_ENV !== 'local' && process.env.NODE_ENV !== 'development') return;
	
	if(!source) return;
		
	switch (source.authorType) {
		case AUTHOR_TYPE.DOCTOR:
			source.doctor && source.doctor._id && uni.navigateTo({ url: `${PAGES.DOCTOR.path}?id=${source.doctor._id}` });
			break;
		case AUTHOR_TYPE.OFFICIAL_USER:
		case AUTHOR_TYPE.EXPERT:
		case AUTHOR_TYPE.USER:
		default:
			break;
	}
}

/**
 * 短版本联合作者称呼，如“高华主任医师 | 邓世靖主任医师"，用于文章列表。
 * @param {Object} coAuthors
 */
function _parseCoAuthors(coAuthors) {
	if(!coAuthors || coAuthors.length === 0) return;
	return coAuthors.map((ca, index) => {
		const author = _getAuthor(ca);
		const title = _getShortTitle(author, true);
		return `${title}${index === coAuthors.length - 1 ? '' : ' | '}`;
	});
}

/**
 * 长版本联合作者称呼，如“山东省眼科医院高华主任医师、北京同仁医院邓世靖主任医师"。用于文章详情。
 * @param {Object} coAuthors
 */
function _parseCoAuthorsLongTitle(coAuthors) {
	if(!coAuthors || coAuthors.length === 0) return;
	return coAuthors.map((ca, index) => {
		const author = _getAuthor(ca);
		const title = _getLongTitle(author, true);
		return `${title}${index !== coAuthors.length - 1 ? '、' : ''}`;
	});
}

/**
 * 附带职称的称呼，如“高华主任医师"。主要用于列表的联合作者信息。
 * 
 * @param {Object} author
 * @param {Object} isDoctorOrExpert
 */
function _getShortTitle(author, isDoctorOrExpert) {
	if(!author) return;
		
	let { name, title } = author;
	name = name ? name : '';
	title = title ? title : '';
	return `${name}${isDoctorOrExpert ? ' ' : ''}${title}`;
}

/**
 * 附带职称和单位的称呼，如“山东省眼科医院高华主任医师"。主要用于详情页面的联合作者信息。
 * 
 * @param {Object} author
 */
function _getLongTitle(author) {
	if(!author) return;
		
	let { name, title, organization } = author;
	name = name ? name : '';
	title = title ? title : '';
	organization = organization ? organization["name"] : '';
	return `${organization}${name}${title}`;
}

/**
 * 附带职称和单位的称呼，如“高华主任医师 | 山东省眼科医院"。主要用于列表。
 * 
 * @param {Object} author
 * @param {Object} isDoctorOrExpert
 */
function _getFullTitle(author, isDoctorOrExpert) {
	const { organization } = author;
	const shortTitle = _getShortTitle(author, isDoctorOrExpert)
	const organizationName = organization && author.organization.name ? author.organization.name : '';
	
	return `${shortTitle} ${organizationName ? (' | ' + organizationName) : ''}`;
}

function _getAuthor(source) {
	if(!source) return {};
	
	switch (source.authorType) {
		case AUTHOR_TYPE.OFFICIAL_USER:
			return source.officialUser;
		case AUTHOR_TYPE.DOCTOR:
			return source.doctor;
		case AUTHOR_TYPE.EXPERT:
			return source.expert;
		case AUTHOR_TYPE.USER:
			return source.user;
		default:
			return {};
	}
}

function isAuthorDoctorOrExpert(source) {
	return source.authorType === AUTHOR_TYPE.DOCTOR || source.authorType === AUTHOR_TYPE.EXPERT;
}

export {
	parseAuthor, isAuthorDoctorOrExpert, addAuthor, navigateToAuthorPage
}
