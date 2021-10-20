import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HardwareException } from '../hardware.exception';
import { Request, Response } from 'express';

@Catch(HardwareException)
export class HardwareExceptionFilter implements ExceptionFilter {
	catch(exception: HardwareException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		response.status(500).json({
			...exception.toObject(),
			timestamp: new Date().toISOString(),
		});
	}
}
