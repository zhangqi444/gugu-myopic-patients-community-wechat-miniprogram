import client from "@/common/apolloClient";
import gql from "graphql-tag";

export const addClickstream = (clickstreamInput) =>
	client.mutate({
		mutation: gql`
			mutation addClickstream($clickstreamInput: ClickstreamInput!) {
				addClickstream(clickstreamInput: $clickstreamInput) {
					_id
				}
			}`,
		variables: { clickstreamInput }
	});