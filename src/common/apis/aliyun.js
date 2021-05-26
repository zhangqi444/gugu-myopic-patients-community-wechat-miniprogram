import client from "@/common/apolloClient";
import gql from "graphql-tag";

export const aliyunPutSignatureUrl = (name) =>
	client.query({
		query: gql`
			query aliyunPutSignatureUrl($name: String) {
				aliyunPutSignatureUrl(name: $name) {
					signatureUrl
				}
			}`,
		variables: { name }
	});
	
export const aliyunSignature = () =>
	client.query({
		query: gql`
			query aliyunSignature {
				aliyunSignature {
					signature
				}
			}`,
		variables: { }
	});