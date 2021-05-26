import client from "@/common/apolloClient";
import gql from "graphql-tag";

const defaultCondition = { isDeleted: false, isBlocked: false };

export const examRecordResultsBySelf = (userId, option) =>
	client.query({
		query: gql`
			query examRecordResultsBySelf($userId: ID, $option: Option!, $condition: Condition) {
				examRecordResultsBySelf(userId: $userId, option: $option, condition: $condition) {
					_id updatedAt createdAt isBlocked isDeleted
					recordedAt user { _id } screenshots note result 
					examRecord { 
						_id type title cover content description
						updatedAt createdAt isBlocked isDeleted 
					}
				}
			}`,
		variables: { userId, option, condition: defaultCondition },
		fetchPolicy: 'no-cache',
	});
	
export const addExamRecordResult = (examRecordResultInput) =>
	client.mutate({
		mutation: gql`
			mutation addExamRecordResult($examRecordResultInput: ExamRecordResultInput!) {
				addExamRecordResult(examRecordResultInput: $examRecordResultInput) {
					_id
				}
			}`,
		variables: { examRecordResultInput }
	});
	
export const updateExamRecordResult = (id, examRecordResultInput) =>
	client.mutate({
		mutation: gql`
			mutation updateExamRecordResult($id: ID!, $examRecordResultInput: ExamRecordResultInput!) {
				updateExamRecordResult(id: $id, examRecordResultInput: $examRecordResultInput) {
					_id
				}
			}`,
		variables: { id, examRecordResultInput }
	});
	
export const deleteExamRecordResult = (id, examRecordResultInput) =>
	client.mutate({
		mutation: gql`
			mutation deleteExamRecordResult($id: ID!, $examRecordResultInput: ExamRecordResultInput) {
				deleteExamRecordResult(id: $id, examRecordResultInput: $examRecordResultInput) {
					_id
				}
			}`,
		variables: { id, examRecordResultInput },
	});