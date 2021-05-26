import client from "@/common/apolloClient";
import gql from "graphql-tag";
import { POST_TYPE } from "@/common/constants";

const defaultCondition = { isDeleted: false, isBlocked: false };
	
export const postsByCircles = (circles, userId, option, condition) => 
	client.query({
		query: gql`
			query postsByCircles($circles: [ID!]!, $userId: ID!, $option: Option!, $condition: Condition) {
				postsByCircles(circles: $circles, userId: $userId, option: $option, condition: $condition) {
					_id title content updatedAt type securityCheckStatus authorType
					officialUser { _id name avatar organization { name } }
					doctor { _id name avatar title organization { name } }
					expert { _id name avatar title organization { name } }
					user { _id nickname avatar }
					visitCount thumbCount collectCount commentCount 
					topics { name _id }
					self { visit { _id } thumb { _id value } collect { _id value } }
				}
			}`,
		variables: { 
			circles: ["60145352db3cb80150bdebed"], 
			userId, option, condition: { ...defaultCondition, type: POST_TYPE.DEFAULT, ...condition } ,
		},
		fetchPolicy: 'no-cache',
	});

export const postsBySelf = (userId, option, condition) => 
	client.query({
		query: gql`
			query postsBySelf($userId: ID!, $option: Option!, $condition: Condition) {
				postsBySelf(userId: $userId, option: $option, condition: $condition) {
					_id title content updatedAt type securityCheckStatus authorType
					officialUser { _id name avatar organization { name } }
					doctor { _id name avatar title organization { name } }
					expert { _id name avatar title organization { name } }
					user { _id nickname avatar }
					visitCount thumbCount collectCount commentCount 
					topics { name _id }
					self { visit { _id } thumb { _id value } collect { _id value } }
				}
			}`,
		variables: { userId, option, condition: { ...defaultCondition, type: POST_TYPE.DEFAULT, ...condition } },
		fetchPolicy: 'no-cache',
	});
	
export const postsBySearch = (query, option, condition) => 
	client.query({
		query: gql`
			query postsBySearch($query: String!, $option: Option!, $condition: Condition) {
				postsBySearch(query: $query, option: $option, condition: $condition) {
					_id title content updatedAt type securityCheckStatus authorType
					officialUser { _id name avatar organization { name } }
					doctor { _id name avatar title organization { name } }
					expert { _id name avatar title organization { name } }
					user { _id nickname avatar }
					visitCount thumbCount collectCount commentCount 
					topics { name _id }
				}
			}`,
		variables: { query, option, condition: { ...defaultCondition, ...condition } },
		fetchPolicy: 'no-cache',
	});
	
export const postRich = (id, userId) =>
	client.query({
		query: gql`
			query postRich($id: ID!, $userId: ID!) {
				postRich(id: $id, userId: $userId) {
					_id title content updatedAt type securityCheckStatus authorType
					officialUser { _id name avatar organization { name } }
					doctor { _id name avatar title organization { name } }
					expert { _id name avatar title organization { name } }
					user { _id nickname avatar } 
					visitCount thumbCount collectCount commentCount 
					topics { name _id }
					self { visit { _id } thumb { _id value } collect { _id value } }
				}
			}`,
		variables: { id, userId },
		fetchPolicy: 'no-cache',
	});
	
export const addPost = (postInput) =>
	client.mutate({
		mutation: gql`
			mutation addPost($postInput: PostInput!) {
				addPost(postInput: $postInput) {
					_id title content updatedAt type securityCheckStatus authorType
					officialUser { _id name avatar organization { name } }
					doctor { _id name avatar title organization { name } }
					expert { _id name avatar title organization { name } }
					user { _id nickname avatar }
					visitCount thumbCount collectCount commentCount 
					topics { name _id }
					self { visit { _id } thumb { _id value } collect { _id value } }
				}
			}`,
		variables: { postInput: { ...postInput, circle: "60145352db3cb80150bdebed" } }
	});
	
export const updatePost = (id, postInput) =>
	client.mutate({
		mutation: gql`
			mutation updatePost($id: ID!, $postInput: PostInput!) {
				updatePost(id: $id, postInput: $postInput) {
					_id title content updatedAt type securityCheckStatus authorType
					officialUser { _id name avatar organization { name } }
					doctor { _id name avatar title organization { name } }
					expert { _id name avatar title organization { name } }
					user { _id nickname avatar }
					visitCount thumbCount collectCount commentCount 
					topics { name _id }
					self { visit { _id } thumb { _id value } collect { _id value } }
				}
			}`,
		variables: { id, postInput: { ...postInput, circle: "60145352db3cb80150bdebed" } }
	});
	
export const deletePost = (id, postInput) =>
	client.mutate({
		mutation: gql`
			mutation deletePost($id: ID!, $postInput: PostInput!) {
				deletePost(id: $id, postInput: $postInput) {
					_id isDeleted
				}
			}`,
		variables: { id, postInput: { ...postInput, circle: "60145352db3cb80150bdebed" } }
	});