import { User as UserModel, Token } from '@prisma/client';

declare global {
	interface String {
		toNumber(): number;
	}

	interface StringConstructor {
		random(size?: number): string;
	}

	namespace Express {
		interface User extends UserModel {}
	}
}

declare module 'socket.io' {
	interface Socket {
		user: UserModel;
		token: Token;
	}
}

export {};
