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

export const ServerContext = createContext<{
	url: string | null;
	setUrl: (url: string | null) => void;
	valid: boolean;
	setValid: (valid: boolean) => void;
}>({
	url: null,
	setUrl: () => {},
	valid: false,
	setValid: () => {},
});
