import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('hardware')
export class HardwareController {
	constructor(protected readonly prisma: PrismaService) {}

	@Get()
	async all() {
		return await this.prisma.devices.findMany();
	}
}
