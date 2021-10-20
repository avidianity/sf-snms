import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ToggleDTO } from './dto/toggle.dto';
import { HardwareService } from './hardware.service';

@Controller('hardware')
export class HardwareController {
	constructor(
		protected readonly prisma: PrismaService,
		protected readonly hardware: HardwareService,
	) {}

	@Get('all')
	async all() {
		return await this.prisma.devices.findMany();
	}

	@Post('toggle/water-main')
	async toggleWaterMain(@Body() { mode }: ToggleDTO) {
		return await this.hardware.toggleWaterMain(mode);
	}

	@Post('toggle/water-backup')
	async toggleWaterBackup(@Body() { mode }: ToggleDTO) {
		return await this.hardware.toggleWaterBackup(mode);
	}

	@Post('toggle/nitrogen')
	async toggleNitrogen(@Body() { mode }: ToggleDTO) {
		return await this.hardware.toggleNitrogen(mode);
	}

	@Post('toggle/phosphorus')
	async togglePhosphorus(@Body() { mode }: ToggleDTO) {
		return await this.hardware.togglePhosphorus(mode);
	}

	@Post('toggle/potassium')
	async togglePotassium(@Body() { mode }: ToggleDTO) {
		return await this.hardware.togglePotassium(mode);
	}
}
