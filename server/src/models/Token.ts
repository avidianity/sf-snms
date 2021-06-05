import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';
import { Model } from './Model';
import { User } from './User';

@Entity()
export class Token extends Model {
	protected fillable = ['hash', 'lastUsed'];

	@Column()
	hash: string;

	@Column()
	lastUsed: Date;

	@ManyToOne(() => User, (user) => user.tokens)
	user: User;

	@BeforeInsert()
	protected insert() {
		this.lastUsed = new Date();
	}
}
