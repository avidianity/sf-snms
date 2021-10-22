import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DeviceStatus, DeviceTypes } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HardwareService } from '../hardware/hardware.service';
import { UltrasonicNames } from '../../interfaces/ultrasonic.interface';
import { shuffle } from 'lodash';

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
	protected async syncDevices() {
		await Promise.all(
			shuffle([
				this.syncDHT(),
				this.syncWaterMainLevel(),
				this.syncWaterBackupLevel(),
				this.syncNitrogenLevel(),
				this.syncPhosphorusLevel(),
				this.syncPotassiumLevel(),
				this.syncMoisture(),
			]),
		);
	}

	protected async syncDHT() {
		const dht = await this.prisma.devices.findFirst({
			where: {
				type: 'DHT',
			},
		});

		try {
			this.logger.log('Syncing DHT11');
			const data = await this.hardware.dht11();

			if (dht) {
				await this.prisma.devices.update({
					where: {
						id: dht.id,
					},
					data: {
						status: 'STANDBY',
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
						status: 'STANDBY',
						payload: {
							...data,
						},
					},
				});
			}

			this.logger.log('Syncing DHT11 Done');
		} catch (error) {
			if (dht) {
				await this.prisma.devices.update({
					where: {
						id: dht.id,
					},
					data: {
						status: 'UNAVAILABLE',
					},
				});
			} else {
				await this.prisma.devices.create({
					data: {
						type: 'DHT',
						name: 'DHT11',
						status: 'UNAVAILABLE',
						payload: {},
					},
				});
			}
			this.logger.log('Syncing DHT11 Error');
			this.logger.error(error);
		}
	}

	protected async syncWaterMainLevel() {
		const waterMainLevel = await this.prisma.devices.findFirst({
			where: {
				type: 'ULTRASONIC',
				name: UltrasonicNames.WATER_MAIN,
			},
		});

		try {
			this.logger.log('Syncing Water Main Level');

			const data = await this.hardware.waterMainLevel();

			if (waterMainLevel) {
				await this.prisma.devices.update({
					where: {
						id: waterMainLevel.id,
					},
					data: {
						status: 'STANDBY',
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
						status: 'STANDBY',
						payload: {
							...data,
						},
					},
				});
			}

			this.logger.log('Syncing Water Main Level Done');
		} catch (error) {
			if (waterMainLevel) {
				await this.prisma.devices.update({
					where: {
						id: waterMainLevel.id,
					},
					data: {
						status: 'UNAVAILABLE',
					},
				});
			} else {
				await this.prisma.devices.create({
					data: {
						type: 'ULTRASONIC',
						name: UltrasonicNames.WATER_MAIN,
						status: 'UNAVAILABLE',
						payload: {},
					},
				});
			}
			this.logger.log('Syncing Water Main Level Error');
			this.logger.error(error);
		}
	}

	protected async syncWaterBackupLevel() {
		const waterBackupLevel = await this.prisma.devices.findFirst({
			where: {
				type: 'ULTRASONIC',
				name: UltrasonicNames.WATER_BACKUP,
			},
		});

		try {
			this.logger.log('Syncing Water Backup Level');

			const data = await this.hardware.waterBackupLevel();

			if (waterBackupLevel) {
				await this.prisma.devices.update({
					where: {
						id: waterBackupLevel.id,
					},
					data: {
						status: 'STANDBY',
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
						status: 'STANDBY',
						payload: {
							...data,
						},
					},
				});
			}

			this.logger.log('Syncing Water Backup Level Done');
		} catch (error) {
			if (waterBackupLevel) {
				await this.prisma.devices.update({
					where: {
						id: waterBackupLevel.id,
					},
					data: {
						status: 'UNAVAILABLE',
					},
				});
			} else {
				await this.prisma.devices.create({
					data: {
						type: 'ULTRASONIC',
						name: UltrasonicNames.WATER_BACKUP,
						status: 'UNAVAILABLE',
						payload: {},
					},
				});
			}
			this.logger.log('Syncing Water Backup Level Error');
			this.logger.error(error);
		}
	}

	protected async syncNitrogenLevel() {
		const nitrogenLevel = await this.prisma.devices.findFirst({
			where: {
				type: 'ULTRASONIC',
				name: UltrasonicNames.NITROGEN,
			},
		});

		try {
			this.logger.log('Nitrogen Level');

			const data = await this.hardware.nitrogenLevel();

			if (nitrogenLevel) {
				await this.prisma.devices.update({
					where: {
						id: nitrogenLevel.id,
					},
					data: {
						status: 'STANDBY',
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
						status: 'STANDBY',
						payload: {
							...data,
						},
					},
				});
			}

			this.logger.log('Nitrogen Level Done');
		} catch (error) {
			if (nitrogenLevel) {
				await this.prisma.devices.update({
					where: {
						id: nitrogenLevel.id,
					},
					data: {
						status: 'UNAVAILABLE',
					},
				});
			} else {
				await this.prisma.devices.create({
					data: {
						type: 'ULTRASONIC',
						name: UltrasonicNames.NITROGEN,
						status: 'UNAVAILABLE',
						payload: {},
					},
				});
			}
			this.logger.log('Nitrogen Level Error');
			this.logger.error(error);
		}
	}

	protected async syncPhosphorusLevel() {
		const phosphorusLevel = await this.prisma.devices.findFirst({
			where: {
				type: 'ULTRASONIC',
				name: UltrasonicNames.PHOSPHORUS,
			},
		});

		try {
			this.logger.log('Phosphorus Level');

			const data = await this.hardware.phosphorusLevel();

			if (phosphorusLevel) {
				await this.prisma.devices.update({
					where: {
						id: phosphorusLevel.id,
					},
					data: {
						status: 'STANDBY',
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
			if (phosphorusLevel) {
				await this.prisma.devices.update({
					where: {
						id: phosphorusLevel.id,
					},
					data: {
						status: 'UNAVAILABLE',
					},
				});
			} else {
				await this.prisma.devices.create({
					data: {
						type: 'ULTRASONIC',
						name: UltrasonicNames.PHOSPHORUS,
						status: 'UNAVAILABLE',
						payload: {},
					},
				});
			}
			this.logger.log('Phosphorus Level Error');
			this.logger.error(error);
		}
	}

	protected async syncPotassiumLevel() {
		const potassiumLevel = await this.prisma.devices.findFirst({
			where: {
				type: 'ULTRASONIC',
				name: UltrasonicNames.POTASSIUM,
			},
		});

		try {
			this.logger.log('Potassium Level');

			const data = await this.hardware.potassiumLevel();

			if (potassiumLevel) {
				await this.prisma.devices.update({
					where: {
						id: potassiumLevel.id,
					},
					data: {
						type: 'ULTRASONIC',
						status: 'STANDBY',
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
			if (potassiumLevel) {
				await this.prisma.devices.update({
					where: {
						id: potassiumLevel.id,
					},
					data: {
						status: 'UNAVAILABLE',
					},
				});
			} else {
				await this.prisma.devices.create({
					data: {
						type: 'ULTRASONIC',
						name: UltrasonicNames.POTASSIUM,
						status: 'UNAVAILABLE',
						payload: {},
					},
				});
			}
			this.logger.log('Potassium Level Error');
			this.logger.error(error);
		}
	}

	protected async syncMoisture() {
		const potassiumLevel = await this.prisma.devices.findFirst({
			where: {
				type: 'ARDUINO',
			},
		});

		try {
			this.logger.log('Moisture');

			const data = await this.hardware.arduino();

			if (potassiumLevel) {
				await this.prisma.devices.update({
					where: {
						id: potassiumLevel.id,
					},
					data: {
						type: 'ARDUINO',
						status: 'STANDBY',
						payload: {
							...data,
						},
					},
				});
			} else {
				await this.prisma.devices.create({
					data: {
						type: 'ARDUINO',
						name: 'arduino',
						payload: {
							...data,
						},
					},
				});
			}

			this.logger.log('Moisture Done');
		} catch (error) {
			if (potassiumLevel) {
				await this.prisma.devices.update({
					where: {
						id: potassiumLevel.id,
					},
					data: {
						status: 'UNAVAILABLE',
					},
				});
			} else {
				await this.prisma.devices.create({
					data: {
						type: 'ARDUINO',
						name: 'arduino',
						status: 'UNAVAILABLE',
						payload: {},
					},
				});
			}
			this.logger.log('Moisture Error');
			this.logger.error(error);
		}
	}
}
