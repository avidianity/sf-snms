import { BaseContract } from './base.contract';

export enum DeviceTypes {
	DHT = 'DHT',
	ULTRASONIC = 'ULTRASONIC',
	WATER = 'WATER',
	PERISTALTIC = 'PERISTALTIC',
	RELAY = 'RELAY',
	ARDUINO = 'ARDUINO',
}
export enum DeviceStatus {
	USED = 'USED',
	STANDBY = 'STANDBY',
	UNAVAILABLE = 'UNAVAILABLE',
}

export interface DeviceContract extends BaseContract {
	id: number;
	name: string;
	type: DeviceTypes;
	status: DeviceStatus;
	payload: Record<string, any>;
}
