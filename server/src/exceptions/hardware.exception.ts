import { HttpException } from '@nestjs/common';

export class HardwareException extends HttpException {
	constructor(message: string) {
		super(message, 500);
	}
}
