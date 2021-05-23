import { Bus } from './Event/Bus';
import { Key } from './Event/Key';

export type StorageItem = {
	[key: string]: any;
};

export type ChangeEvent<T> = (value: T) => void;

export class State {
	protected static instance = new State();
	protected storage: Storage;
	protected key = 'paymento-state-key';
	protected bus: Bus;

	constructor(key?: string) {
		this.storage = window.localStorage;
		this.bus = new Bus();
		if (key) {
			this.key = key;
		}
		const data = this.getAll();
		this.setAll({ ...data });
	}

	static getInstance() {
		return this.instance;
	}

	clear() {
		return this.setAll({});
	}

	getAll(): StorageItem {
		try {
			const data = this.storage.getItem(this.key);
			return data ? JSON.parse(data) : {};
		} catch (_) {
			return {};
		}
	}

	setAll(data: StorageItem) {
		this.storage.setItem(this.key, JSON.stringify(data));
		return this;
	}

	has(key: string) {
		return key in this.getAll();
	}

	get<T = any>(key: string): T | null {
		if (!this.has(key)) {
			return null;
		}
		return this.getAll()[key];
	}

	set(key: string, value: any) {
		const data = this.getAll();
		data[key] = value;
		this.dispatch(key, value);
		return this.setAll(data);
	}

	remove(key: string) {
		if (this.has(key)) {
			const data = this.getAll();
			delete data[key];
			this.setAll(data);
		}
		return this;
	}

	dispatch<T>(key: string, value: T) {
		this.bus.dispatch(key, value);
		return this;
	}

	listen<T>(key: string, callback: ChangeEvent<T>) {
		return this.bus.listen(key, callback);
	}

	unlisten(key: Key) {
		this.bus.unlisten(key);
		return this;
	}
}
