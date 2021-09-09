import { createContext } from 'react';
import { UserContract } from './contracts/user.contract';

export const AuthContext = createContext<{
	user?: UserContract;
	setUser: (user?: UserContract) => void;
	token?: string;
	setToken: (user?: string) => void;
}>({
	setUser: () => {},
	setToken: () => {},
});
