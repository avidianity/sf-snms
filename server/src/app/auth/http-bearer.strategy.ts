import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class HttpBearerStrategy extends PassportStrategy(
	Strategy,
	'http-bearer',
) {
	constructor(protected readonly auth: AuthService) {
		super();
	}

	async validate(hash: string) {
		const payload = await this.auth.validateHash(hash);

		if (!payload) {
			throw new UnauthorizedException({
				message: 'Action is unauthorized.',
			});
		}

		return payload;
	}
}
