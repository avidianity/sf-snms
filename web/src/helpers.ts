import toastr from 'toastr';
import _, { isArray, isString } from 'lodash';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import swal from 'sweetalert';

dayjs.extend(relativeTime);

export class Asker {
	static async notice(message: string, title?: string) {
		return toBool(await swal({ title, text: message, buttons: ['Cancel', 'Confirm'], icon: 'warning' }));
	}
	static async danger(message: string, title?: string) {
		return toBool(await swal({ title, text: message, buttons: ['Cancel', 'Confirm'], dangerMode: true, icon: 'warning' }));
	}
}

export function outIf<T>(condition: boolean, output: T, defaultValue: any = ''): T {
	return condition ? output : (defaultValue as T);
}
export function toBool(data: any) {
	return data ? true : false;
}

export function validURL(url: string) {
	let valid = false;
	var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!-/]))?/;
	try {
		new URL(url);
		valid = true;
	} catch (_) {
		valid = false;
	}
	return !!pattern.test(url) && valid;
}

export function ucfirst(string: string) {
	const array = string.split('');
	array[0] = array[0].toUpperCase();
	return array.join('');
}

export function ucwords(string: string) {
	return string
		.split(' ')
		.map((word) => (word === 'Id' ? 'ID' : ucfirst(word)))
		.join(' ');
}

let handle: NodeJS.Timeout | null = null;

export function handleError(error: any, useHandle = true) {
	if (error) {
		if (error.response) {
			const response = error.response;
			if (error.response.status === 422) {
				return (error.response.data.errors as any).reverse().forEach((error: any) => toastr.error(error.msg));
			} else if (response.data.message) {
				if (isArray(response.data.message)) {
					return response.data.message.forEach((message: string) =>
						toastr.error(sentencify(message), undefined, { extendedTimeOut: 2000 })
					);
				} else if (isString(response.data.message)) {
					return toastr.error(sentencify(response.data.message));
				}
			}
		} else if (error.message) {
			if (error.message.includes('Network Error')) {
				if (handle === null && useHandle) {
					toastr.error('Unable to connect. Please check your internet connection or the server may be down.');
					handle = setTimeout(() => {
						if (handle !== null) {
							clearTimeout(handle);
							handle = null;
						}
					}, 2500);
					return;
				} else {
					toastr.error('Unable to connect. Please check your internet connection or the server may be down.');
				}
			} else {
				return toastr.error(error.message);
			}
		}
	} else {
		return toastr.error('Something went wrong, please try again later.', 'Oops!');
	}
}

export function errorToStrings(error: any) {
	if (error) {
		if (error.response) {
			const response = error.response;
			if (response.data.message) {
				if (isArray(response.data.message)) {
					return (response.data.message as string[]).map((message) => sentencify(message));
				} else if (isString(response.data.message)) {
					return [sentencify(response.data.message)];
				}
			}
		} else if (error.message) {
			if (isString(error.message)) {
				if (error.message.includes('Network Error')) {
					return ['Unable to connect. Please check your internet connection or the server may be down.'];
				}
				return [error.message as string];
			} else if (isArray(error.message)) {
				return (error.message as string[]).map((message) => sentencify(message));
			}
		}
	}
	return ['Something went wrong, please try again later.'];
}

export function groupBy<T, K extends keyof T>(data: Array<T>, key: K) {
	const temp: { [key: string]: Array<T> } = {};

	data.forEach((item) => {
		const property: any = item[key];
		if (!(property in temp)) {
			temp[property] = [];
		}
		temp[property].push(item);
	});
	return Object.keys(temp).map((key) => temp[key]);
}

export function sentencify(words: string) {
	return ucfirst(
		_.snakeCase(words)
			.split('_')
			.map((word) => (word.toLowerCase() === 'id' ? 'ID' : word))
			.join(' ')
	);
}

export function fromNow(date: any) {
	return dayjs(date).fromNow();
}

export function makeMask<T extends Function>(callable: T, callback: Function) {
	return ((data: any) => {
		return callable(callback(data));
	}) as unknown as T;
}

export function except<T, K extends keyof T>(data: T, keys: Array<K>) {
	const copy = {} as T;

	for (const key in data) {
		copy[key] = data[key];
	}

	for (const key of keys) {
		if (key in copy) {
			delete copy[key];
		}
	}
	return copy;
}

export function exceptMany<T, K extends keyof T>(data: Array<T>, keys: Array<K>) {
	return [...data].map((item) => except(item, keys));
}

export function has<T>(keys: Array<T>, data: T) {
	return keys.includes(data);
}

export function only<T, K extends keyof T>(data: T, keys: Array<K>) {
	const result = {} as T;
	(result as any)['id'] = (data as any)['id'];
	for (const key of keys) {
		result[key] = data[key];
	}
	return result;
}

export function onlyMany<T, K extends keyof T>(data: Array<T>, keys: Array<K>) {
	return [...data].map((item) => only(item, keys));
}

const formatter = new Intl.NumberFormat('en-PH', {
	style: 'currency',
	currency: 'PHP',
});

export function formatCurrency(value: number) {
	return formatter.format(value).replace(/\D00(?=\D*$)/, '');
}
