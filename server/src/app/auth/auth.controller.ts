import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
	constructor(protected readonly auth: AuthService) {}

	@Post('/login')
	async login(@Body() data: LoginDTO) {
		return await this.auth.login(data);
	}

	@Post('/register')
	async register(@Body() data: RegisterDTO) {
		return await this.auth.register(data);
	}
}
