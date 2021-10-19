import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DeviceStatus, DeviceTypes } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HardwareService } from '../hardware/hardware.service';
import { UltrasonicNames } from '../../interfaces/ultrasonic.interface';

export type ListOptions = {
	type?: DeviceTypes;
	status?: DeviceStatus;
};

@Injectable()
export class DeviceService {
	protected readonly logger = new Logger(DeviceService.name);

	constructor(
		protected readonly prisma: PrismaService,
		protected readonly hardware: HardwareService,
	) {}

	async listDevices(options?: ListOptions) {
		return await this.prisma.devices.findMany({
			where: {
				...(options || {}),
			},
		});
	}

	@Cron(CronExpression.EVERY_10_SECONDS)
	protected syncDevices() {
		this.syncDHT();
		this.syncWaterMainLevel();
		this.syncWaterBackupLevel();
		this.syncNitrogenLevel();
		this.syncPhosphorusLevel();
		this.syncPotassiumLevel();
		this.syncMoisture();
	}

	protected async syncDHT() {
		try {
			this.logger.log('Syncing DHT11');
			const data = await this.hardware.dht11();

			const dht = await this.prisma.devices.findFirst({
				where: {
					type: 'DHT',
				},
			});

			if (dht) {
				await this.prisma.devices.update({
					where: {
						id: dht.id,
					},
					data: {
						type: 'DHT',
						payload: {
							...data,
						},
					},
				});
			} else {
				await this.prisma.devices.create({
					data: {
						type: 'DHT',
						name: 'DHT11',
						payload: {
							...data,
						},
					},
				});
			}

			this.logger.log('Syncing DHT11 Done');
		} catch (error) {
			this.logger.log('Syncing DHT11 Error');
			this.logger.error(error);
		}
	}

	protected async syncWaterMainLevel() {
		try {
			this.logger.log('Syncing Water Main Level');

			const data = await this.hardware.waterMainLevel();

			const waterMainLevel = await this.prisma.devices.findFirst({
				where: {
					type: 'ULTRASONIC',
					name: UltrasonicNames.WATER_MAIN,
				},
			});

			if (waterMainLevel) {
				await this.prisma.devices.update({
					where: {
						id: waterMainLevel.id,
					},
					data: {
						payload: {
							...data,
						},
					},
				});
			} else {
				await this.prisma.devices.create({
					data: {
						type: 'ULTRASONIC',
						name: UltrasonicNames.WATER_MAIN,
						payload: {
							...data,
						},
					},
				});
			}

			this.logger.log('Syncing Water Main Level Done');
		} catch (error) {
			this.logger.log('Syncing Water Main Level Error');
			this.logger.error(error);
		}
	}

	protected async syncWaterBackupLevel() {
		try {
			this.logger.log('Syncing Water Backup Level');

			const data = await this.hardware.waterBackupLevel();

			const waterBackupLevel = await this.prisma.devices.findFirst({
				where: {
					type: 'ULTRASONIC',
					name: UltrasonicNames.WATER_BACKUP,
				},
			});

			if (waterBackupLevel) {
				await this.prisma.devices.update({
					where: {
						id: waterBackupLevel.id,
					},
					data: {
						type: 'ULTRASONIC',
						payload: {
							...data,
						},
					},
				});
			} else {
				await this.prisma.devices.create({
					data: {
						type: 'ULTRASONIC',
						name: UltrasonicNames.WATER_BACKUP,
						payload: {
							...data,
						},
					},
				});
			}

			this.logger.log('Syncing Water Backup Level Done');
		} catch (error) {
			this.logger.log('Syncing Water Backup Level Error');
			this.logger.error(error);
		}
	}

	protected async syncNitrogenLevel() {
		try {
			this.logger.log('Nitrogen Level');

			const data = await this.hardware.nitrogenLevel();

			const nitrogenLevel = await this.prisma.devices.findFirst({
				where: {
					type: 'ULTRASONIC',
					name: UltrasonicNames.NITROGEN,
				},
			});

			if (nitrogenLevel) {
				await this.prisma.devices.update({
					where: {
						id: nitrogenLevel.id,
					},
					data: {
						type: 'ULTRASONIC',
						payload: {
							...data,
						},
					},
				});
			} else {
				await this.prisma.devices.create({
					data: {
						type: 'ULTRASONIC',
						name: UltrasonicNames.NITROGEN,
						payload: {
							...data,
						},
					},
				});
			}

			this.logger.log('Nitrogen Level Done');
		} catch (error) {
			this.logger.log('Nitrogen Level Error');
			this.logger.error(error);
		}
	}

	protected async syncPhosphorusLevel() {
		try {
			this.logger.log('Phosphorus Level');

			const data = await this.hardware.phosphorusLevel();

			const phosphorusLevel = await this.prisma.devices.findFirst({
				where: {
					type: 'ULTRASONIC',
					name: UltrasonicNames.PHOSPHORUS,
				},
			});

			if (phosphorusLevel) {
				await this.prisma.devices.update({
					where: {
						id: phosphorusLevel.id,
					},
					data: {
						type: 'ULTRASONIC',
						payload: {
							...data,
						},
					},
				});
			} else {
				await this.prisma.devices.create({
					data: {
						type: 'ULTRASONIC',
						name: UltrasonicNames.PHOSPHORUS,
						payload: {
							...data,
						},
					},
				});
			}

			this.logger.log('Phosphorus Level Done');
		} catch (error) {
			this.logger.log('Phosphorus Level Error');
			this.logger.error(error);
		}
	}

	protected async syncPotassiumLevel() {
		try {
			this.logger.log('Potassium Level');

			const data = await this.hardware.potassiumLevel();

			const potassiumLevel = await this.prisma.devices.findFirst({
				where: {
					type: 'ULTRASONIC',
					name: UltrasonicNames.POTASSIUM,
				},
			});

			if (potassiumLevel) {
				await this.prisma.devices.update({
					where: {
						id: potassiumLevel.id,
					},
					data: {
						type: 'ULTRASONIC',
						payload: {
							...data,
						},
					},
				});
			} else {
				await this.prisma.devices.create({
					data: {
						type: 'ULTRASONIC',
						name: UltrasonicNames.POTASSIUM,
						payload: {
							...data,
						},
					},
				});
			}

			this.logger.log('Potassium Level Done');
		} catch (error) {
			this.logger.log('Potassium Level Error');
			this.logger.error(error);
		}
	}

	protected async syncMoisture() {
		try {
			this.logger.log('Moisture');

			const data = await this.hardware.arduino();

			const name = 'arduino';

			const potassiumLevel = await this.prisma.devices.findFirst({
				where: {
					type: 'ARDUINO',
					name,
				},
			});

			if (potassiumLevel) {
				await this.prisma.devices.update({
					where: {
						id: potassiumLevel.id,
					},
					data: {
						type: 'ARDUINO',
						payload: {
							...data,
						},
					},
				});
			} else {
				await this.prisma.devices.create({
					data: {
						type: 'ARDUINO',
						name,
						payload: {
							...data,
						},
					},
				});
			}

			this.logger.log('Moisture Done');
		} catch (error) {
			this.logger.log('Moisture Error');
			this.logger.error(error);
		}
	}
}
