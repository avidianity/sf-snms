import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { exec as parentExec } from 'child_process';
import { resolve } from 'path';
import { promisify } from 'util';
import { SCRIPTS_PATH } from '../../constants';
import { ArduinoException } from '../../exceptions/arduino.exception';
import { DHT11Exception } from '../../exceptions/dht11.exception';
import { RelayException } from '../../exceptions/relay.exception';
import { UltrasonicException } from '../../exceptions/ultrasonic.exception';
import { Arduino } from '../../interfaces/arduino.interface';
import { DHT11 } from '../../interfaces/dht11.interface';
import { Ultrasonic } from '../../interfaces/ultrasonic.interface';

const exec = promisify(parentExec);

@Injectable()
export class HardwareService {
	constructor(protected readonly config: ConfigService) {}

	async dht11() {
		const path = resolve(SCRIPTS_PATH, 'dht11.py');
		const pin = this.config.get<number>('DHT11_PIN');

		if (!pin) {
			throw new DHT11Exception('DHT11 pin not defined.');
		}

		const { stdout, stderr } = await exec(`python3 ${path} ${pin}`);

		if (stderr) {
			throw new DHT11Exception(stderr);
		}

		return JSON.parse(stdout) as DHT11;
	}

	protected async relay(pin: number, mode: 'on' | 'off') {
		const path = resolve(SCRIPTS_PATH, 'relay.py');

		const { stderr } = await exec(`python3 ${path} ${pin} ${mode}`);

		if (stderr) {
			throw new RelayException(stderr);
		}
	}

	protected async ultrasonic(trigger: number, echo: number) {
		const path = resolve(SCRIPTS_PATH, 'ultrasonic.py');

		const { stdout, stderr } = await exec(
			`python3 ${path} ${trigger} ${echo}`,
		);

		if (stderr) {
			throw new UltrasonicException(stderr);
		}

		return JSON.parse(stdout) as Ultrasonic;
	}

	async waterMainLevel() {
		const trigger = this.config.get<number>(
			'WATER_MAIN_ULTRASONIC_TRIGGER_PIN',
		);

		if (!trigger) {
			throw new UltrasonicException(
				'Water Main trigger pin not defined.',
			);
		}

		const echo = this.config.get<number>('WATER_MAIN_ULTRASONIC_ECHO_PIN');

		if (!echo) {
			throw new UltrasonicException('Water Main echo pin not defined.');
		}

		const response = await this.ultrasonic(trigger, echo);

		return response;
	}

	async waterBackupLevel() {
		const trigger = this.config.get<number>(
			'WATER_BACKUP_ULTRASONIC_TRIGGER_PIN',
		);

		const echo = this.config.get<number>(
			'WATER_BACKUP_ULTRASONIC_ECHO_PIN',
		);

		if (!trigger) {
			throw new UltrasonicException(
				'Water Backup trigger pin not defined.',
			);
		}

		if (!echo) {
			throw new UltrasonicException('Water Backup echo pin not defined.');
		}

		const response = await this.ultrasonic(trigger, echo);

		return response;
	}

	async nitrogenLevel() {
		const trigger = this.config.get<number>(
			'NITROGEN_ULTRASONIC_TRIGGER_PIN',
		);

		const echo = this.config.get<number>('NITROGEN_ULTRASONIC_ECHO_PIN');

		if (!trigger) {
			throw new UltrasonicException('Nitrogen trigger pin not defined.');
		}

		if (!echo) {
			throw new UltrasonicException('Nitrogen echo pin not defined.');
		}

		const response = await this.ultrasonic(trigger, echo);

		return response;
	}

	async phosphorusLevel() {
		const trigger = this.config.get<number>(
			'PHOSPHORUS_ULTRASONIC_TRIGGER_PIN',
		);

		const echo = this.config.get<number>('PHOSPHORUS_ULTRASONIC_ECHO_PIN');

		if (!trigger) {
			throw new UltrasonicException(
				'Phosphorus trigger pin not defined.',
			);
		}

		if (!echo) {
			throw new UltrasonicException('Phosphorus echo pin not defined.');
		}

		const response = await this.ultrasonic(trigger, echo);

		return response;
	}

	async potassiumLevel() {
		const trigger = this.config.get<number>(
			'POTASSIUM_ULTRASONIC_TRIGGER_PIN',
		);
		const echo = this.config.get<number>('POTASSIUM_ULTRASONIC_ECHO_PIN');

		if (!trigger) {
			throw new UltrasonicException('Potassium trigger pin not defined.');
		}

		if (!echo) {
			throw new UltrasonicException('Potassium echo pin not defined.');
		}

		const response = await this.ultrasonic(trigger, echo);

		return response;
	}

	async toggleWaterMain(mode: 'on' | 'off') {
		const pin = this.config.get<number>('WATER_MAIN_RELAY_PIN');

		if (!pin) {
			throw new RelayException('Water Main relay pin not defined.');
		}

		await this.relay(pin, mode);
	}

	async toggleWaterBackup(mode: 'on' | 'off') {
		const pin = this.config.get<number>('WATER_BACKUP_RELAY_PIN');

		if (!pin) {
			throw new RelayException('Water Backup relay pin not defined.');
		}

		await this.relay(pin, mode);
	}

	async toggleNitrogen(mode: 'on' | 'off') {
		const pin = this.config.get<number>('NITROGEN_RELAY_PIN');

		if (!pin) {
			throw new RelayException('Nitrogen relay pin not defined.');
		}

		await this.relay(pin, mode);
	}

	async togglePhosphorus(mode: 'on' | 'off') {
		const pin = this.config.get<number>('PHOSPHORUS_RELAY_PIN');

		if (!pin) {
			throw new RelayException('Phosphorus relay pin not defined.');
		}

		await this.relay(pin, mode);
	}

	async togglePotassium(mode: 'on' | 'off') {
		const pin = this.config.get<number>('POTASSIUM_RELAY_PIN');

		if (!pin) {
			throw new RelayException('Potassium relay pin not defined.');
		}

		await this.relay(pin, mode);
	}

	async arduino() {
		const path = resolve(SCRIPTS_PATH, 'arduino.py');
		const port = this.config.get<string>('ARDUINO_PORT');

		if (!port) {
			throw new ArduinoException('Arduino port not defined.');
		}

		const { stdout, stderr } = await exec(`python3 ${path} ${port}`);

		if (stderr) {
			throw new ArduinoException(stderr);
		}

		return JSON.parse(stdout) as Arduino;
	}
}
