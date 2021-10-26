import { DeviceTypes } from './contracts/device.contract';

export function errorToStrings(error: any): string[] {
	if (error) {
		if (error.response) {
			const response = error.response;
			if (response.data.message) {
				if (Array.isArray(response.data.message)) {
					return response.data.message.map((message: any) => message);
				} else if (typeof response.data.message === 'string') {
					return [response.data.message];
				}
			} else if (response.data.errors) {
				return response.data.errors.map((message: any) => message);
			}
		} else if (error.message) {
			if (error.message.includes('Network Error')) {
				return ['Unable to connect. Please check your internet connection or the server may be down.'];
			}
			return [error.message];
		}
	}
	return ['Something went wrong, please try again later.'];
}

export function transformDeviceValue(type: DeviceTypes, value: any) {
	switch (type) {
		case DeviceTypes.DHT:
			return (
				<>
					<div>Temperature: {value?.temperature}°C</div>
					<div>Humidity: {value?.humidity}%</div>
				</>
			);
		case DeviceTypes.ULTRASONIC:
			return <div>{Number(value?.distance).toPrecision(2)}</div>;
		case DeviceTypes.ARDUINO:
			return <div>{value?.moisture}%</div>;
		default:
			return JSON.stringify(value);
	}
}
