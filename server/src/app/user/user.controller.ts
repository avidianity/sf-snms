import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { HttpBearerGuard } from '../auth/http-bearer.guard';

@Controller('users')
@UseGuards(HttpBearerGuard)
export class UserController {
	@Get('/')
	get(@Req() req) {
		return req.user;
	}
}
