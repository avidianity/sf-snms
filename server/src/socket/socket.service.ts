import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';
import {
	EventNames,
	EventParams,
	EventsMap,
	ReservedOrUserEventNames,
	ReservedOrUserListener,
} from 'socket.io/dist/typed-events';
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { ExtendedError } from 'socket.io/dist/namespace';

type Users = Array<{ user: User; id: string }>;

@Injectable()
export class SocketService {
	protected server: Server;

	protected connections = 0;

	protected users: Users = [];

	constructor(
		protected readonly config: ConfigService,
		protected readonly auth: AuthService,
	) {}

	setServer(server: Server) {
		this.server = server;

		return this;
	}

	getServer() {
		return this.server;
	}

	setup(httpServer: any) {
		const io = new Server(httpServer, {
			cors: {
				credentials: true,
				origin: (origin, callback) => callback(null, origin),
			},
		});

		const driver = this.config.get<string>('SOCKET_DRIVER');

		if (driver === 'redis') {
			const pubClient = createClient({
				host: this.config.get<string>('REDIS_HOST'),

				port: this.config.get<number>('REDIS_PORT'),
			});

			const subClient = pubClient.duplicate();

			io.adapter(createAdapter(pubClient, subClient));
		}

		this.setServer(io).init();

		return io;
	}

	init() {
		this.use(async (socket, next) => {
			try {
				let header = '';

				if (
					socket.handshake.headers['authorization'] ||
					typeof socket.handshake.headers['authorization'] ===
						'string'
				) {
					header = socket.handshake.headers['authorization'];
				} else if (
					socket.request.headers['authorization'] &&
					typeof socket.request.headers['authorization'] === 'string'
				) {
					header = socket.request.headers['authorization'];
				}

				const fragments = header.split(' ');

				if (fragments.length !== 2) {
					return next(new Error('Malformed authorization header.'));
				}

				const hash = fragments[1];

				const payload = await this.auth.validateHash(hash);

				if (!payload) {
					return next(new Error('Invalid token.'));
				}

				const { user, token } = payload;

				socket.user = user as User;
				socket.token = token;

				return next();
			} catch (error) {
				return next(error);
			}
		});

		this.on('connection', (socket: Socket) => {
			this.connections++;

			this.users.push({ user: socket.user, id: socket.id });

			this.emit(`connect.${socket.user.id}`);

			socket.on('disconnect', async () => {
				this.connections--;

				const index = this.users.findIndex(
					(item) => item.id === socket.id,
				);

				this.users.splice(index, 1);

				this.emit(`disconnect.${socket.user.id}`);
			});
		});
	}

	emit<Ev extends EventNames<EventsMap>>(
		ev: Ev,
		...args: EventParams<EventsMap, Ev>
	): boolean {
		return this.server.emit(ev, ...args);
	}

	on<Ev extends ReservedOrUserEventNames<EventsMap, EventsMap>>(
		ev: Ev,
		listener: ReservedOrUserListener<EventsMap, EventsMap, Ev>,
	) {
		this.server.on(ev, listener);

		return this;
	}

	use(fn: (socket: Socket, next: (err?: ExtendedError) => void) => void) {
		this.server.use(fn);

		return this;
	}

	count() {
		return this.connections;
	}
}
