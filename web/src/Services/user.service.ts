import { UserContract } from '../Contracts/user.contract';
import { Service } from '../Libraries/Service';

export class UserService extends Service<UserContract> {}

export const userService = new UserService('/users');
