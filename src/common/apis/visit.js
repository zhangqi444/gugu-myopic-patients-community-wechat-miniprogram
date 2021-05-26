import client from "@/common/apolloClient";
import gql from "graphql-tag";
import { ACTION_TARGET_TYPE } from "@/common/constants";

export const addVisitSelf = (target, targetType) => addVisit(null, target, null, targetType)

export const addVisit = (actor, target, actorType, targetType) =>
	client.mutate({
		mutation: gql`
			mutation addVisit($visitInput: VisitInput!) {
				addVisit(visitInput: $visitInput) {
					_id
				}
			}`,
		variables: { visitInput: {actor, target, actorType, targetType} }
	});
	
export const addVisitArticle = (target) => {
	return addVisitSelf(target, ACTION_TARGET_TYPE.ARTICLE);
};

export const addVisitMine = (target) => {
	return addVisitSelf(target, ACTION_TARGET_TYPE.MINE);
};

export const addVisitComment = (target) => {
	return addVisitSelf(target, ACTION_TARGET_TYPE.COMMENT);
};