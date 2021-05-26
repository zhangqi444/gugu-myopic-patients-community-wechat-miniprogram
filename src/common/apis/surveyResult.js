import client from "@/common/apolloClient";
import gql from "graphql-tag";

const defaultCondition = { isDeleted: false, isBlocked: false };
const defaultOption = { limit: 100, skip: 0 };
	
export const surveyResult = (id) =>
	client.query({
		query: gql`
			query surveyResult($id: ID!) {
				surveyResult(id: $id) {
					_id result summary updatedAt createdAt isCompleted
					user { _id } survey { _id }
				}
			}`,
		variables: { id }
	});	

export const surveyResultsBySelf = (userId, option) =>
	client.query({
		query: gql`
			query surveyResultsBySelf($userId: ID, $option: Option!, $condition: Condition) {
				surveyResultsBySelf(userId: $userId, option: $option, condition: $condition) {
					_id result summary updatedAt createdAt isCompleted
					user { _id } survey { _id }
				}
			}`,
		variables: { userId, option: { ...defaultOption, ...option }, condition: defaultCondition },
		fetchPolicy: 'no-cache',
	});	

export const addSurveyResult = (surveyResultInput) =>
	client.mutate({
		mutation: gql`
			mutation addSurveyResult($surveyResultInput: SurveyResultInput!) {
				addSurveyResult(surveyResultInput: $surveyResultInput) {
					_id result summary updatedAt createdAt isCompleted
					user { _id } survey { _id }
				}
			}`,
		variables: { surveyResultInput }
	});