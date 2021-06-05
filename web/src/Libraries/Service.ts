import axios from 'axios';

type FreeObject = {
	[key: string]: any;
};

export class Service<T> {
	protected url: string;

	constructor(url: string) {
		this.url = url;
	}

	async fetch(params?: FreeObject) {
		const { data } = await axios.get<T[]>(this.resolveURL(params));
		return data;
	}

	async fetchOne(id: any, params?: FreeObject) {
		const { data } = await axios.get<T>(`${this.resolveURL(params)}/${id}`);
		return data;
	}

	async create(payload: T, params?: FreeObject) {
		const { data } = await axios.post(`${this.resolveURL(params)}`, payload);
		return data;
	}

	async update(id: any, payload: Partial<T>, params?: FreeObject) {
		const { data } = await axios.put(`${this.resolveURL(params)}/${id}`, payload);
		return data;
	}

	async delete(id: any, params?: FreeObject) {
		await axios.delete(`${this.resolveURL(params)}/${id}`);
	}

	protected resolveURL(params?: FreeObject) {
		return `${this.url}${params ? `?${new URLSearchParams(params).toString()}` : ''}`;
	}
}
