import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { HttpBearerGuard } from './http-bearer.guard';

@Controller('auth')
export class AuthController {
	constructor(
		protected readonly auth: AuthService,
		protected readonly prisma: PrismaService,
	) {}

	@Post('/login')
	async login(@Body() data: LoginDTO) {
		return await this.auth.login(data);
	}

	@Post('/register')
	async register(@Body() data: RegisterDTO) {
		return await this.auth.register(data);
	}

	@Get('/check')
	@UseGuards(HttpBearerGuard)
	async check(@Req() req: Request) {
		return req.user.user;
	}

	@Get('/logout')
	@UseGuards(HttpBearerGuard)
	async logout(@Req() req: Request) {
		const { token } = req.user;
		await this.prisma.token.delete({ where: { id: token.id } });
	}
}
