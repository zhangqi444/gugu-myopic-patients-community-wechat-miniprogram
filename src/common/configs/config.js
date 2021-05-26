import LocalConfig from './config.local.js';
import DefaultConfig from './config.default.js';
import DevelopmentConfig from './config.development.js';
import ProductionConfig from './config.production.js';

const NODE_ENV_LOCAL = 'local';
const NODE_ENV_PRODUCTION = 'production';
const NODE_ENV_DEVELOPMENT = 'development';

const init = () => {
	switch (process.env.NODE_ENV) {
		case NODE_ENV_LOCAL:
			return {
				...DefaultConfig,
				...LocalConfig
			};
		case NODE_ENV_DEVELOPMENT:
			return {
				...DefaultConfig,
				...DevelopmentConfig
			};
		case NODE_ENV_PRODUCTION:
			return {
				...DefaultConfig,
				...ProductionConfig
			};
		default:
			return DefaultConfig;
	};
};

const config = init();
export default config;