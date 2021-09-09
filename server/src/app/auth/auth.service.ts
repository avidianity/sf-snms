import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import md5 from 'md5';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
	constructor(protected readonly prisma: PrismaService) {}

	async validateHash(hash: string) {
		try {
			const {
				user: { password, ...user },
				...token
			} = await this.prisma.token.findFirst({
				where: {
					hash: md5(hash),
				},
				include: {
					user: true,
				},
				rejectOnNotFound: true,
			});

			return { user, token };
		} catch (_) {
			return null;
		}
	}

	async login(data: LoginDTO) {
		try {
			const { password, ...user } = await this.prisma.user.findFirst({
				where: {
					email: data.email,
				},
				rejectOnNotFound: true,
			});

			if (!(await compare(data.password, password))) {
				throw new UnauthorizedException('Password is incorrect.');
			}

			const hash = String.random(20);

			await this.prisma.token.create({
				data: {
					hash: md5(hash),
					userId: user.id,
				},
			});

			return { token: hash, user };
		} catch (_) {
			throw new NotFoundException('User does not exist.');
		}
	}

	async register(data: RegisterDTO) {
		data.password = await hash(data.password, 4);

		const { password, ...user } = await this.prisma.user.create({
			data,
		});

		const token = String.random(20);

		await this.prisma.token.create({
			data: {
				hash: md5(token),
				userId: user.id,
			},
		});

		return { token, user };
	}
}
