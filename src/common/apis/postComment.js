import client from "@/common/apolloClient";
import gql from "graphql-tag";
import { ACTION_ACTOR_TYPE, ACTION_TARGET_TYPE } from "@/common/constants";

const defaultCondition = { isDeleted: false, isBlocked: false };

export const addPostComment = (postCommentInput) =>
	client.mutate({
		mutation: gql`
			mutation addPostComment($postCommentInput: PostCommentInput!) {
				addPostComment(postCommentInput: $postCommentInput) {
					_id content thumbCount commentCount post { _id } isNestedComment
					securityCheckStatus authorType officialUser { _id } doctor { _id } user { _id } expert { _id }
					isBlocked isDeleted createdAt updatedAt
				}
			}`,
		variables: { postCommentInput }
	});
	
export const postCommentsByPost = (id, userId, option, condition) => 
	client.query({
		query: gql`
			query postCommentsByPost($id: ID!, $userId: ID!, $option: Option!, $condition: Condition) {
				postCommentsByPost(id: $id, userId: $userId, option: $option, condition: $condition) {
					_id content thumbCount commentCount post { _id } isNestedComment securityCheckStatus authorType 
					officialUser { _id name avatar organization { name } }
					doctor { _id name avatar title organization { name } }
					expert { _id name avatar title organization { name } }
					user { _id nickname avatar } 
					isBlocked isDeleted createdAt updatedAt
					self { thumb { _id value } }
				}
			}`,
		variables: { id, userId, option, condition: { ...defaultCondition, ...condition } },
		fetchPolicy: 'no-cache',
	});