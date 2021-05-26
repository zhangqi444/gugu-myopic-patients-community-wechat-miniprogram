import client from "@/common/apolloClient";
import gql from "graphql-tag";
import { NOTIFICATION_STATUS } from "@/common/constants";

const defaultCondition = { isDeleted: false, isBlocked: false };

export const notificationsBySelf = (userId, option) =>
	client.query({
		query: gql`
			query notificationsBySelf($userId: ID!, $option: Option!, $condition: Condition) {
				notificationsBySelf(userId: $userId, option: $option, condition: $condition) {
					_id user status type createdAt updatedAt isDeleted
					actorType actor {
						officialUser { _id name avatar organization { name } }
						doctor { _id name avatar title organization { name } }
						expert { _id name avatar title organization { name } }
						user { nickname avatar } 
					}
					targetType target {
						post { _id title }
						article { _id title }
						comment { _id title article isNestedComment comment nestedComment }
					}
				}
			}`,
		variables: { userId, option, condition: defaultCondition },
		fetchPolicy: 'no-cache',
	});

export const notificationSummary = (userId) =>
	client.query({
		query: gql`
			query notificationSummary($userId: ID!) {
				notificationSummary(userId: $userId) {
					summary {
						count
					}
				}
			}`,
		variables: { userId }
	});

export const updateNotification = (id, notificationInput) =>
	client.mutate({
		mutation: gql`
			mutation updateNotification($id: ID!, $notificationInput: NotificationInput) {
				updateNotification(id: $id, notificationInput: $notificationInput) {
					status
				}
			}`,
		variables: { id, notificationInput }
	});
	
export const readNotification = (id, notificationInput) => 
	updateNotification(id, { ...notificationInput, status: NOTIFICATION_STATUS.READ });
