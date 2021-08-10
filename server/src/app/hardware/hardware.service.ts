import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { exec as parentExec } from 'child_process';
import { resolve } from 'path';
import { promisify } from 'util';
import { SCRIPTS_PATH } from '../../constants';
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

		const { stdout, stderr } = await exec(`python3 ${path} ${pin}`);

		if (stderr) {
			throw new InternalServerErrorException(stderr);
		}

		return JSON.parse(stdout) as DHT11;
	}

	protected async relay(pin: number, mode: 'on' | 'off') {
		const path = resolve(SCRIPTS_PATH, 'relay.py');

		const { stderr } = await exec(`python3 ${path} ${pin} ${mode}`);

		if (stderr) {
			throw new InternalServerErrorException(stderr);
		}
	}

	protected async ultrasonic(trigger: number, echo: number) {
		const path = resolve(SCRIPTS_PATH, 'ultrasonic.py');

		const { stdout, stderr } = await exec(
			`python3 ${path} ${trigger} ${echo}`,
		);

		if (stderr) {
			throw new InternalServerErrorException(stderr);
		}

		return JSON.parse(stdout) as Ultrasonic;
	}

	async waterMainLevel() {
		const relayPin = this.config.get<number>(
			'WATER_MAIN_ULTRASONIC_RELAY_PIN',
		);
		const trigger = this.config.get<number>(
			'WATER_MAIN_ULTRASONIC_TRIGGER_PIN',
		);
		const echo = this.config.get<number>('WATER_MAIN_ULTRASONIC_ECHO_PIN');

		await this.relay(relayPin, 'on');

		const response = await this.ultrasonic(trigger, echo);

		await this.relay(relayPin, 'off');

		return response;
	}

	async waterBackupLevel() {
		const relayPin = this.config.get<number>(
			'WATER_BACKUP_ULTRASONIC_RELAY_PIN',
		);
		const trigger = this.config.get<number>(
			'WATER_BACKUP_ULTRASONIC_TRIGGER_PIN',
		);
		const echo = this.config.get<number>(
			'WATER_BACKUP_ULTRASONIC_ECHO_PIN',
		);

		await this.relay(relayPin, 'on');

		const response = await this.ultrasonic(trigger, echo);

		await this.relay(relayPin, 'off');

		return response;
	}

	async nitrogenLevel() {
		const relayPin = this.config.get<number>(
			'NITROGEN_ULTRASONIC_RELAY_PIN',
		);
		const trigger = this.config.get<number>(
			'NITROGEN_ULTRASONIC_TRIGGER_PIN',
		);
		const echo = this.config.get<number>('NITROGEN_ULTRASONIC_ECHO_PIN');

		await this.relay(relayPin, 'on');

		const response = await this.ultrasonic(trigger, echo);

		await this.relay(relayPin, 'off');

		return response;
	}

	async phosphorusLevel() {
		const relayPin = this.config.get<number>(
			'PHOSPHORUS_ULTRASONIC_RELAY_PIN',
		);
		const trigger = this.config.get<number>(
			'PHOSPHORUS_ULTRASONIC_TRIGGER_PIN',
		);
		const echo = this.config.get<number>('PHOSPHORUS_ULTRASONIC_ECHO_PIN');

		await this.relay(relayPin, 'on');

		const response = await this.ultrasonic(trigger, echo);

		await this.relay(relayPin, 'off');

		return response;
	}

	async potassiumLevel() {
		const relayPin = this.config.get<number>(
			'POTASSIUM_ULTRASONIC_RELAY_PIN',
		);
		const trigger = this.config.get<number>(
			'POTASSIUM_ULTRASONIC_TRIGGER_PIN',
		);
		const echo = this.config.get<number>('POTASSIUM_ULTRASONIC_ECHO_PIN');

		await this.relay(relayPin, 'on');

		const response = await this.ultrasonic(trigger, echo);

		await this.relay(relayPin, 'off');

		return response;
	}

	async toggleWaterMain(mode: 'on' | 'off') {
		const pin = this.config.get<number>('WATER_MAIN_RELAY_PIN');

		await this.relay(pin, mode);
	}

	async toggleWaterBackup(mode: 'on' | 'off') {
		const pin = this.config.get<number>('WATER_BACKUP_RELAY_PIN');

		await this.relay(pin, mode);
	}

	async toggleNitrogen(mode: 'on' | 'off') {
		const pin = this.config.get<number>('NITROGEN_RELAY_PIN');

		await this.relay(pin, mode);
	}

	async togglePhosphorus(mode: 'on' | 'off') {
		const pin = this.config.get<number>('PHOSPHORUS_RELAY_PIN');

		await this.relay(pin, mode);
	}

	async togglePotassium(mode: 'on' | 'off') {
		const pin = this.config.get<number>('POTASSIUM_RELAY_PIN');

		await this.relay(pin, mode);
	}

	async arduino() {
		const path = resolve(SCRIPTS_PATH, 'arduino.py');
		const port = this.config.get<string>('ARDUINO_PORT');

		const { stdout, stderr } = await exec(`python3 ${path} ${port}`);

		if (stderr) {
			throw new InternalServerErrorException(stderr);
		}

		return JSON.parse(stdout) as Arduino;
	}
}
