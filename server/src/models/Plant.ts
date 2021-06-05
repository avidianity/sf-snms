import { Column, Entity } from 'typeorm';
import { Model } from './Model';

@Entity()
export class Plant extends Model {
	@Column()
	name: string;

	@Column()
	nitrogen: number;

	@Column()
	phosphorus: number;

	@Column()
	potassium: number;
}
