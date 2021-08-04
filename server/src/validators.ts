import { PrismaClient } from '@prisma/client';
import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class ExistsContraint implements ValidatorConstraintInterface {
	async validate(value: any, args: ValidationArguments) {
		const prisma = new PrismaClient();

		await prisma.$connect();

		try {
			const model = args.constraints[0];
			const key = args.constraints[1];

			await prisma[model].findFirst({
				where: {
					[key]: value,
				},
				rejectOnNotFound: true,
			});

			return true;
		} catch (_) {
			return false;
		}
	}

	defaultMessage(args: ValidationArguments) {
		return `${args.property} does not exist.`;
	}
}

export function Exists(
	model: string,
	key?: string,
	validationOptions?: ValidationOptions,
) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'exists',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [model, key || propertyName],
			options: validationOptions,
			validator: ExistsContraint,
		});
	};
}

@ValidatorConstraint({ async: true })
export class UniqueContraint implements ValidatorConstraintInterface {
	async validate(value: any, args: ValidationArguments) {
		const prisma = new PrismaClient();

		await prisma.$connect();

		try {
			const model = args.constraints[0];
			const key = args.constraints[1];

			await prisma[model].findFirst({
				where: {
					[key]: value,
				},
				rejectOnNotFound: true,
			});

			return false;
		} catch (_) {
			return true;
		}
	}

	defaultMessage(args: ValidationArguments) {
		return `${args.property} is already taken.`;
	}
}

export function Unique(
	model: string,
	key?: string,
	validationOptions?: ValidationOptions,
) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'exists',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [model, key || propertyName],
			options: validationOptions,
			validator: UniqueContraint,
		});
	};
}
