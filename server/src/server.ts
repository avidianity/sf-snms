import './shims';
import app from './app';
import { config } from 'dotenv';
config();
import db from './database';
import { Server } from 'socket.io';
import { createServer } from 'http';

const port = process.env.PORT;

db.then(() => {
	const server = createServer(app);
	const io = new Server(server, {
		cors: {
			origin: '*',
			methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		},
	});

	app.set('io', io);

	server.listen(port, () => console.log(`⚡: Listening on port: ${port}`));
}).catch((error) => {
	console.error(error);
	process.exit(500);
});
