import client from "@/common/apolloClient";
import gql from "graphql-tag";

const defaultCondition = { isDeleted: false, isBlocked: false };

export const examRecord = (id, option) =>
	client.query({
		query: gql`
			query examRecord($id: ID!, $option: Option!, $condition: Condition) {
				examRecord(id: $id, option: $option, condition: $condition) {
					_id type title cover content description
					updatedAt createdAt isBlocked isDeleted
				}
			}`,
		variables: { id, option, condition: defaultCondition }
	});

export const examRecords = (option) =>
	client.query({
		query: gql`
			query examRecords($option: Option!, $condition: Condition) {
				examRecords(option: $option, condition: $condition) {
					_id type title cover content description
					updatedAt createdAt isBlocked isDeleted
				}
			}`,
		variables: { option, condition: defaultCondition }
	});