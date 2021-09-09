import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DeviceStatus, DeviceTypes } from '@prisma/client';

export type ListOptions = {
	type?: DeviceTypes;
	status?: DeviceStatus;
};

@Injectable()
export class DeviceService {
	constructor(protected readonly prisma: PrismaService) {}

	async listDevices(options?: ListOptions) {
		return await this.prisma.devices.findMany({
			where: {
				...(options || {}),
			},
		});
	}
}
