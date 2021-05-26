import client from "@/common/apolloClient";
import gql from "graphql-tag";
import { ACTION_ACTOR_TYPE, ACTION_TARGET_TYPE } from "@/common/constants";

const defaultCondition = { isDeleted: false, isBlocked: false };

export const collectsBySelf = (userId, option) =>
	client.query({
		query: gql`
			query collectsBySelf($userId: ID!, $option: Option!, $condition: Condition) {
				collectsBySelf(userId: $userId, option: $option, condition: $condition) {
					_id targetType value target
				}
			}`,
		variables: { userId, option, condition: defaultCondition },
		fetchPolicy: 'no-cache',
	});

export const addCollect = (collectInput) =>
	client.mutate({
		mutation: gql`
			mutation addCollect($collectInput: CollectInput!) {
				addCollect(collectInput: $collectInput) {
					_id
					value
				}
			}`,
		variables: { collectInput }
	});

export const addCollectArticle = (target, actor, value) => {
	return addCollect({ actor, target, actorType: ACTION_ACTOR_TYPE.USER, targetType: ACTION_TARGET_TYPE.ARTICLE, value });
};


export const addCollectPost = (target, actor, value) => {
	return addCollect({ actor, target, actorType: ACTION_ACTOR_TYPE.USER, targetType: ACTION_TARGET_TYPE.POST, value });
};