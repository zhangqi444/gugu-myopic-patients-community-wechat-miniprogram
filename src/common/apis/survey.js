import client from "@/common/apolloClient";
import gql from "graphql-tag";

const defaultCondition = { isDeleted: false, isBlocked: false };
const defaultOption = { limit: 100, skip: 0 };
	
export const survey = (id, option) =>
	client.query({
		query: gql`
			query survey($id: id, $condition: Condition) {
				survey(id: $id, condition: $condition) {
					_id completeCount updatedAt createdAt
					title description reference cover estTime content
				}
			}`,
		variables: { id, condition: defaultCondition }
	});	

export const surveys = (option) =>
	client.query({
		query: gql`
			query surveys($option: Option!, $condition: Condition) {
				surveys(option: $option, condition: $condition) {
					_id completeCount updatedAt createdAt
					title description reference cover estTime content
				}
			}`,
		variables: { option: { ...defaultOption, ...option }, condition: defaultCondition }
	});