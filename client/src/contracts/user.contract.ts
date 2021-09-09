import { BaseContract } from './base.contract';

export interface UserContract extends BaseContract {
	name: string;
	email: string;
	password: string;
}
