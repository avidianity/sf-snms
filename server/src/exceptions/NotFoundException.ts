import { HttpException } from './HttpException';

export class NotFoundException extends HttpException {
	constructor(message?: string) {
		super({ message, status: 404 });
	}
}
