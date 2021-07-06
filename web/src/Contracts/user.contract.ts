import { ModelContract } from './model.contract';

export interface UserContract extends ModelContract {
	username: string;
	password: string;
}
