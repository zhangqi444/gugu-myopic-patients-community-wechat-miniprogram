import client from "@/common/apolloClient";
import gql from "graphql-tag";
import { ACTION_ACTOR_TYPE, ACTION_TARGET_TYPE } from "@/common/constants";

export const addThumb = (thumbInput) =>
	client.mutate({
		mutation: gql`
			mutation addThumb($thumbInput: ThumbInput!) {
				addThumb(thumbInput: $thumbInput) {
					_id
					value
				}
			}`,
		variables: { thumbInput }
	});

export const addThumbArticle = (target, actor, value) => {
	return addThumb({ actor, target, actorType: ACTION_ACTOR_TYPE.USER, targetType: ACTION_TARGET_TYPE.ARTICLE, value });
};

export const addThumbComment = (target, actor, value) => {
	return addThumb({ actor, target, actorType: ACTION_ACTOR_TYPE.USER, targetType: ACTION_TARGET_TYPE.COMMENT, value });
};

export const addThumbPost = (target, actor, value) => {
	return addThumb({ actor, target, actorType: ACTION_ACTOR_TYPE.USER, targetType: ACTION_TARGET_TYPE.POST, value });
};

export const addThumbPostComment = (target, actor, value) => {
	return addThumb({ actor, target, actorType: ACTION_ACTOR_TYPE.USER, targetType: ACTION_TARGET_TYPE.POST_COMMENT, value });
};