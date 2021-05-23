import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class Model extends BaseEntity {
	protected hidden: Array<string> = [];
	protected fillable: Array<string> = [];

	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	constructor(data?: any) {
		super();

		if (data) {
			this.forceFill(data);
		}
	}

	toJSON() {
		const data = { ...this } as any;
		for (const key of this.hidden) {
			delete data[key];
		}
		delete data.hidden;
		delete data.fillable;
		return data;
	}

	fill(data: Partial<this>) {
		const fillable = this.fillable;
		for (const key in data) {
			if (fillable.includes(key)) {
				this[key] = <any>data[key];
			}
		}
		return this;
	}

	forceFill(data: Partial<this>) {
		for (const key in data) {
			this[key] = <any>data[key];
		}
		return this;
	}
}
