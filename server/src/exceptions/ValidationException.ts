import { HttpException } from './HttpException';

export class ValidationException extends HttpException {
	constructor(errors: Array<any>) {
		super({
			status: 422,
			message: 'There are errors while submitting the form.',
			errors,
		});
	}
}
