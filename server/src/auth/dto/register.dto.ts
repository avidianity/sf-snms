import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Unique } from '../../validators';

export class RegisterDTO {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsEmail()
	@IsNotEmpty()
	@Unique('user')
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
