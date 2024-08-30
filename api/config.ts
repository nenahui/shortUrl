import type { CorsOptions } from 'cors';

const corsWhiteList = ['http://localhost:3000'];

const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		if (!origin || corsWhiteList.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	}
};

const config = {
	corsOptions,
	databaseUrl: 'mongodb://localhost/shop'
};

export default config;