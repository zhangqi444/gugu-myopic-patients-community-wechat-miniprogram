import ApolloClient from 'apollo-boost';
import Config from './configs/config';
import { CLIENT_TYPE } from './constants';

const client = new ApolloClient({
	// 服务端地址
	uri: Config.GRAPHQL_ENDPOINT,
	fetch: async (url, options) => {
		try {
			const result = await uni.request({
				url,
				withCredentials: true,
				method: options.method,
				data: options.body,
				// header: options.headers,
				header: {
					...options.headers,
					clientType: CLIENT_TYPE
				},
			});
			const { statusCode, data } = result && result[1];
			return {
				ok: () => {
					return statusCode >= 200 && statusCode < 300;
				},
				text: () => {
					return Promise.resolve(JSON.stringify(data));
				},
			};
		} catch(error) {
			return error;
		}
	},
	// defaultOptions: {
	// 	watchQuery: {
	// 		fetchPolicy: 'no-cache',
	// 	},
	// 	query: {
	// 		fetchPolicy: 'no-cache',
	// 	},
	// },
});
export default client;
