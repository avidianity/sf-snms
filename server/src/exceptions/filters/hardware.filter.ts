import { ExceptionFilter, InternalServerErrorException } from '@nestjs/common';
import { HardwareException } from '../hardware.exception';

export class HardwareExceptionFilter implements ExceptionFilter {
	catch(exception: HardwareException) {
		throw new InternalServerErrorException(exception);
	}
}
