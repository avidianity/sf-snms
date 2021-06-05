import 'reflect-metadata';
import { createConnection } from 'typeorm';

const type = process.env.DB_CONNECTION as 'mysql' | 'mariadb';
const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const port = process.env.DB_PORT as number | undefined;
const env = process.env.ENV as 'local' | 'production';

export default createConnection({
	type,
	host,
	port,
	username,
	password,
	database,
	entities: [`${__dirname}/models/*.ts`, `${__dirname}/models/*.js`],
	synchronize: env !== 'production',
	logging: true,
}).then(() => console.log(`⚡: ${type}:${host}@${port} connected.`));
