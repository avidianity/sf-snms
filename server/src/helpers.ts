import { hashSync, compareSync } from 'bcrypt';
import { Application, NextFunction, Request, Response } from 'express';
import { Location, matchedData, validationResult } from 'express-validator';
import { Server } from 'socket.io';
import { ValidationException } from './exceptions/ValidationException';
import { Model } from './models/Model';

export namespace Validation {
	export function unique<T extends Model, K extends keyof T>(model: { new (): T }, key: K, message?: string) {
		const Model: any = model;
		return async (value: any) => {
			try {
				const exists = await Model.findOne({
					where: {
						[key]: value,
					},
				});
				if (exists) {
					return Promise.reject(message ? message : `${(key as string).ucfirst()} is already taken.`);
				}
				return true;
			} catch (error) {
				console.error(error);
				return Promise.reject(`Unable to verify ${key}.`);
			}
		};
	}

	export function exists<T extends Model, K extends keyof T>(model: { new (): T }, key: K, message?: string) {
		const Model: any = model;
		return async (value: any) => {
			try {
				const exists = await Model.findOne({
					where: {
						[key]: value,
					},
				});
				if (!exists) {
					return Promise.reject(message ? message : `${(key as string).ucfirst()} does not exist.`);
				}
				return true;
			} catch (error) {
				console.error(error);
				return Promise.reject(`Unable to verify ${key}.`);
			}
		};
	}

	export function validate(locations: Location[] = ['body']) {
		return (req: Request, _res: Response, next: NextFunction) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return next(new ValidationException(errors.array()));
			}

			const data = matchedData(req, { locations });

			locations.forEach((key) => {
				req[key] = { ...data };
			});

			return next();
		};
	}
}

export namespace Hash {
	export function make(data: any) {
		return hashSync(data, 8);
	}

	export function check(data: any, hashed: string) {
		return compareSync(data, hashed);
	}
}

export function getIO(app: Application): Server {
	return app.get('io');
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

const formatter = new Intl.NumberFormat('en-PH', {
	style: 'currency',
	currency: 'PHP',
});

export function formatCurrency(value: number) {
	return formatter.format(value);
}
