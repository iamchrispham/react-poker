// my config from q2
require('dotenv').config();

module.exports = {
	development: {
		client: 'postgresql',
		connection: {
			database: 'stacked_dev',
			user: 'postgres',
			password: 'nathanK'
		}
	},

	test: {
		client: 'postgresql',
		connection: {
			database: 'stacked_test'
		}
	},

	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL + '?ssl=true'
	}
};
