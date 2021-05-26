import client from "@/common/apolloClient";
import gql from "graphql-tag";

const defaultCondition = { isDeleted: false, isBlocked: false };

export const doctor = (id, option) =>
	client.query({
		query: gql`
			query doctor($id, ID!, $option: Option!, $condition: Condition) {
				doctor(id: $id, option: $option, condition: $condition) {
					_id name gender avatar title otherTitles
					tags { name _id } organization { _id name }
					isVerified
				}
			}`,
		variables: { id, option, condition: defaultCondition }
	});
	

export const doctors = (option) =>
	client.query({
		query: gql`
			query doctors($option: Option!, $condition: Condition) {
				doctors(option: $option, condition: $condition) {
					_id name gender avatar province city birthYear title otherTitles
					tags { name _id } organization { _id name }
					qualification specialty introduction
					isVerified updatedAt
				}
			}`,
		variables: { option, condition: defaultCondition }
	});