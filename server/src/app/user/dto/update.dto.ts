import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDTO {
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	name?: string;

	@IsEmail()
	@IsNotEmpty()
	@IsOptional()
	email?: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	password?: string;
}
