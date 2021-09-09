import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class UserService {
	constructor(protected readonly prisma: PrismaService) {}

	async all() {
		return await this.prisma.user.findMany();
	}

	async show(id: number) {
		const user = await this.prisma.user.findFirst({ where: { id } });

		if (!user) {
			throw new NotFoundException('User does not exist.');
		}

		return user;
	}

	async create(data: CreateDTO) {
		data.password = await hash(data.password, 4);
		return await this.prisma.user.create({ data });
	}

	async update(id: number, data: UpdateDTO) {
		return await this.prisma.user.update({
			where: {
				id,
			},
			data,
		});
	}

	async delete(id: number) {
		return await this.prisma.user.delete({
			where: {
				id,
			},
		});
	}
}
