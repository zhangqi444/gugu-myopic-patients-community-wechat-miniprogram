import client from "@/common/apolloClient";
import gql from "graphql-tag";
import { ARTICLE_TYPE } from "@/common/constants";

const defaultCondition = { isDeleted: false, isBlocked: false };

export const articles = (option, condition) =>
	client.query({
		query: gql`
			query articles($option: Option!, $condition: Condition) {
				articles(option: $option, condition: $condition) {
					_id title cover content updatedAt video { vid url source }
					authorType
					officialUser { _id name avatar organization { name } }
					doctor { _id name avatar title organization { name } }
					expert { _id name avatar title organization { name } }
					visitCount thumbCount collectCount commentCount tags { name _id } 
					coAuthors { 
						authorType
						officialUser { _id name avatar organization { name } }
						doctor { _id name avatar title organization { name } }
						expert { _id name avatar title organization { name } }
					}
					self { collect { _id value } }
				}
			}`,
		variables: { option, condition: { ...defaultCondition, ...condition } }
	});
	
export const articlesByAnyTags = (tags, option) => 
	client.query({
		query: gql`
			query articlesByAnyTags($tags: [String]!, $option: Option!, $condition: Condition) {
				articlesByAnyTags(tags: $tags, option: $option, condition: $condition) {
					_id title cover content updatedAt video { vid url source }
					authorType
					officialUser { _id name avatar organization { name } }
					doctor { _id name avatar title organization { name } }
					expert { _id name avatar title organization { name } }
					visitCount thumbCount collectCount commentCount tags { name _id }
					coAuthors {
						authorType
						officialUser { _id name avatar organization { name } }
						doctor { _id name avatar title organization { name } }
						expert { _id name avatar title organization { name } }
					}
				}
			}`,
		variables: { tags, option, condition: { ...defaultCondition, type: ARTICLE_TYPE.DEFAULT } }
	});
	
export const articlesByTags = (tags, option, condition) => 
	client.query({
		query: gql`
			query articlesByTags($tags: [String]!, $option: Option!, $condition: Condition) {
				articlesByTags(tags: $tags, option: $option, condition: $condition) {
					_id title cover content updatedAt video { vid url source }
					authorType
					officialUser { _id name avatar organization { name } }
					doctor { _id name avatar title organization { name } }
					expert { _id name avatar title organization { name } }
					visitCount thumbCount collectCount commentCount tags { name _id }
					coAuthors {
						authorType
						officialUser { _id name avatar organization { name } }
						doctor { _id name avatar title organization { name } }
						expert { _id name avatar title organization { name } }
					}
				}
			}`,
		variables: { tags, option, condition: { ...defaultCondition, ...condition } }
	});
	
export const articlesBySearch = (query, option, condition) => 
	client.query({
		query: gql`
			query articlesBySearch($query: String!, $option: Option!, $condition: Condition) {
				articlesBySearch(query: $query, option: $option, condition: $condition) {
					_id title cover content updatedAt video { vid url source }
					authorType
					officialUser { _id name avatar organization { name } }
					doctor { _id name avatar title organization { name } }
					expert { _id name avatar title organization { name } }
					visitCount thumbCount collectCount commentCount tags { name _id }
					coAuthors {
						authorType
						officialUser { _id name avatar organization { name } }
						doctor { _id name avatar title organization { name } }
						expert { _id name avatar title organization { name } }
					}
				}
			}`,
		variables: { query, option, condition: { ...defaultCondition, ...condition } }
	});
	
export const articleRich = (id, userId) =>
	client.query({
		query: gql`
			query articleRich($id: ID!, $userId: ID) {
				articleRich(id: $id, userId: $userId) {
					_id title cover content updatedAt video { vid url source }
					authorType
					officialUser { _id name avatar organization { name } }
					doctor { _id name avatar title organization { name } }
					expert { _id name avatar title organization { name } }
					visitCount thumbCount collectCount commentCount tags { name _id }
					coAuthors {
						authorType
						officialUser { _id name avatar organization { name } }
						doctor { _id name avatar title organization { name } }
						expert { _id name avatar title organization { name } }
					}
					self { visit { _id } thumb { _id value } collect { _id value } }
					comments {
						_id content thumbCount commentCount 
						article { _id } isNestedComment 
						comment { 
							_id authorType
							officialUser { _id name avatar organization { name } }
							doctor { _id name avatar title organization { name } }
							expert { _id name avatar title organization { name } }
							user { nickname avatar } 
						}  
						nestedComment { 
							_id authorType
							officialUser { _id name avatar organization { name } }
							doctor { _id name avatar title organization { name } }
							expert { _id name avatar title organization { name } }
							user { nickname avatar } 
						} 
						securityCheckStatus authorType
						officialUser { _id name avatar organization { name } }
						doctor { _id name avatar title organization { name } }
						expert { _id name avatar title organization { name } }
						user { nickname avatar } 
						isBlocked isDeleted createdAt updatedAt
						self { thumb { _id value } }
					}
				}
			}`,
		variables: { id, userId },
		fetchPolicy: 'no-cache',
	});
	
export const articleWikis = (option, condition) =>
	client.query({
		query: gql`
			query articles($option: Option!, $condition: Condition) {
				articles(option: $option, condition: $condition) {
					_id title cover content updatedAt video { vid url source }
					authorType
					officialUser { _id ame avatar organization { name } }
					doctor { _id name avatar title organization { name } }
					expert { _id name avatar title organization { name } }
					visitCount thumbCount collectCount commentCount tags { name _id } 
					coAuthors { 
						authorType
						officialUser { _id name avatar organization { name } }
						doctor { _id name avatar title organization { name } }
						expert { _id name avatar title organization { name } }
					}
					self { collect { _id value } }
				}
			}`,
		variables: { option, condition: { ...defaultCondition, type: ARTICLE_TYPE.WIKI, ...condition } },
		fetchPolicy: 'no-cache',
	});