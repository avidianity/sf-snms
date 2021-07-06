import { Server } from 'socket.io';
import { Token } from './models/Token';
import { User as UserModel } from './models/User';

declare global {
	interface String {
		toNumber(): number;
		ucfirst(): string;
		ucwords(): string;
	}

	interface Error {
		toJSON(): Object;
	}

	interface Array<T> {
		random(): T;
	}

	interface StringConstructor {
		random(size?: number): string;
	}

	namespace Express {
		interface Request {
			token?: Token;
		}

		interface Application {
			getIO(): Server;
		}

		interface User extends UserModel {}
	}
}

Error.prototype.toJSON = function () {
	const alt = {} as any;

	const _this = this as any;
	Object.getOwnPropertyNames(_this).forEach(function (key) {
		alt[key] = _this[key];
	}, _this);

	if ('stack' in alt) {
		alt.stack = alt.stack
			.split(/\r?\n/)
			.map((string: string) => string.trim())
			.filter((_: any, i: number) => i !== 0);
	}

	return alt;
};

String.prototype.toNumber = function () {
	const parts = this.split('.');
	if (parts.length > 1) {
		const whole = (parts[0].match(/\d/g) || []).join('');
		const decimals = (parts[1].match(/\d/g) || []).join('');
		return Number(`${whole}.${decimals}`) || 0;
	}
	const match = this.match(/\d/g);
	if (!match) {
		return 0;
	}
	return Number(match.join('')) || 0;
};

String.prototype.ucfirst = function () {
	const array = this.split('');
	array[0] = array[0].toUpperCase();
	return array.join('');
};

String.prototype.ucwords = function () {
	return this.split(' ')
		.map((word) => word.ucfirst())
		.join(' ');
};

const characters = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

String.random = (size = 40) => {
	let results = '';

	for (let x = 0; x < size; x++) {
		results += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return results;
};

Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)];
};

export {};
