import client from "@/common/apolloClient";
import gql from "graphql-tag";

export const userLogin = (userLoginPayload) =>
	client.query({
		query: gql`
			query userLogin($userLoginPayload: UserLoginPayload!) {
				userLogin(userLoginPayload: $userLoginPayload) {
					_id createdAt updatedAt loginedAt onboardingStatus
					nickname gender province city birthYear avatar
				}
			}`,
		variables: { userLoginPayload },
		fetchPolicy: 'no-cache',
	});

export const userRich = (id) =>
	client.query({
		query: gql`
			query userRich($id: ID!) {
				userRich(id: $id) {
					_id createdAt updatedAt loginedAt onboardingStatus
					nickname gender province city birthYear avatar
					commentCount postCount postCommentCount collectCount notificationCount surveyResultCount examRecordResultCount
				}
			}`,
		variables: { id },
		fetchPolicy: 'no-cache',
	});
	
export const onboardSelf = (id, userInput) =>
	client.mutate({
		mutation: gql`
			mutation onboardSelf($id: ID!, $userInput: UserInput!) {
				onboardSelf(id: $id, userInput: $userInput) {
					_id createdAt updatedAt loginedAt onboardingStatus
					nickname gender province city birthYear avatar
				}
			}`,
		variables: { id, userInput }
	});