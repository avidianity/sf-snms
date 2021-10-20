import { IsIn, IsString } from 'class-validator';

export class ToggleDTO {
	@IsString()
	@IsIn(['on', 'off'])
	mode: 'on' | 'off';
}
