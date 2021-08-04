import { Injectable } from '@nestjs/common';
import md5 from 'md5';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
	constructor(protected readonly prisma: PrismaService) {}

	async validateHash(hash: string) {
		try {
			const token = await this.prisma.token.findFirst({
				where: {
					hash: md5(hash),
				},
				include: {
					user: true,
				},
			});

			if (!token) {
				return null;
			}

			const { user } = token;

			return { user, token };
		} catch (_) {
			return null;
		}
	}
}
