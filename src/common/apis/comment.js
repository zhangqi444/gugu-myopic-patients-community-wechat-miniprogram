import client from "@/common/apolloClient";
import gql from "graphql-tag";
import { ACTION_ACTOR_TYPE, ACTION_TARGET_TYPE } from "@/common/constants";

const defaultCondition = { isDeleted: false, isBlocked: false };

export const addComment = (commentInput) =>
	client.mutate({
		mutation: gql`
			mutation addComment($commentInput: CommentInput!) {
				addComment(commentInput: $commentInput) {
					_id content thumbCount commentCount
					article { _id } isNestedComment 
					comment {
						_id authorType
						officialUser { _id name avatar organization { name } }
						doctor { _id name avatar title organization { name } }
						expert { _id name avatar title organization { name } }
						user { _id nickname avatar } 
					}  
					nestedComment { 
						_id authorType
						officialUser { _id name avatar organization { name } }
						doctor { _id name avatar title organization { name } }
						expert { _id name avatar title organization { name } }
						user { _id nickname avatar } 
					}
					securityCheckStatus authorType 
					officialUser { _id name avatar organization { name } }
					doctor { _id name avatar title organization { name } }
					expert { _id name avatar title organization { name } }
					user { _id nickname avatar } 
					isBlocked isDeleted createdAt updatedAt
				}
			}`,
		variables: { commentInput }
	});
	
export const commentsByArticle = (id, userId, option, condition) => 
	client.query({
		query: gql`
			query commentsByArticle($id: ID!, $userId: ID!, $option: Option!, $condition: Condition) {
				commentsByArticle(id: $id, userId: $userId, option: $option, condition: $condition) {
					_id content thumbCount commentCount securityCheckStatus authorType 
					officialUser { _id name avatar organization { name } }
					doctor { _id name avatar title organization { name } }
					expert { _id name avatar title organization { name } }
					user { _id nickname avatar } 
					article { _id } isNestedComment 
					comment {
						_id authorType
						officialUser { _id name avatar organization { name } }
						doctor { _id name avatar title organization { name } }
						expert { _id name avatar title organization { name } }
						user { _id nickname avatar } 
					}  
					nestedComment { 
						_id authorType
						officialUser { _id name avatar organization { name } }
						doctor { _id name avatar title organization { name } }
						expert { _id name avatar title organization { name } }
						user { _id nickname avatar } 
					} 
					isBlocked isDeleted createdAt updatedAt
					self { thumb { _id value } }
				}
			}`,
		variables: { id, userId, option, condition: { ...defaultCondition, ...condition } },
		fetchPolicy: 'no-cache',
	});
	
export const commentsBySelf = (userId, option, condition) => 
	client.query({
		query: gql`
			query commentsBySelf($userId: ID!, $option: Option!, $condition: Condition) {
				commentsBySelf(userId: $userId, option: $option, condition: $condition) {
					_id content thumbCount commentCount securityCheckStatus authorType 
					officialUser { _id name avatar organization { name } }
					doctor { _id name avatar title organization { name } }
					expert { _id name avatar title organization { name } }
					user { _id nickname avatar } 
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
						user { _id nickname avatar } 
					} 
					isBlocked isDeleted createdAt updatedAt
					self { thumb { _id value } }
				}
			}`,
		variables: { userId, option, condition: { ...defaultCondition, ...condition } },
		fetchPolicy: 'no-cache',
	});