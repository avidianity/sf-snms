import React, { useEffect, useState } from 'react';
import { ROOT, SERVER_URL } from './constants';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import { UserContract } from './contracts/user.contract';
import { AuthContext, ServerContext } from './contexts';
import State from '@avidian/state';
import { Key } from '@avidian/events';
import { useNullable, useToggle } from '@avidian/hooks';
import axios from 'axios';
import md5 from 'md5';
import PromptServer from './components/PromptServer';
import { compare } from 'bcryptjs';

const state = new State();

function App() {
	const [token, setToken] = useState<string | undefined>();
	const [user, setUser] = useState<UserContract | undefined>();
	const [valid, setValid] = useToggle(false);
	const [url, setUrl] = useNullable<string>();

	const check = async (url: string) => {
		try {
			const key = String.random(10).toLowerCase();
			const { data: result } = await axios.post<string>(`${url}/auth/ping`, { payload: key });
			if (typeof result !== 'string' || !(await compare(md5(key), result))) {
				toastr.error('URL provided is not valid.');
				setUrl(null);
				setValid(false);
				state.remove('server_url');
				return false;
			}
			setUrl(url);
			setValid(true);
			axios.defaults.baseURL = url;
			state.set('server_url', url);
			toastr.info(`Server URL pinged at ${url} with key: <br /><b>'${key}'</b>`);
			return true;
		} catch (error) {
			toastr.error('URL provided is not valid.');
			console.log(error instanceof Error ? error.toObject() : error);
			setUrl(null);
			setValid(false);
			state.remove('server_url');
			return false;
		}
	};

	useEffect(() => {
		if (SERVER_URL && SERVER_URL.length > 0) {
			check(SERVER_URL).then((valid) => {
				if (!valid && state.has('server_url')) {
					return check(state.get<string>('server_url'));
				}
			});
		}
		const id = `A${String.random(10)}A`;

		const scripts = ['/assets/js/smooth-scrollbar.min.js', '/assets/js/ss-init.js'].map((url) => {
			const script = document.createElement('script');
			script.classList.add(id);
			script.src = `${ROOT}${url}`;
			return script;
		});

		document.body.append(...scripts);
		document.body.classList.add('g-sidenav-show', 'bg-gray-100');

		if (state.has('user')) {
			setUser(state.get<UserContract>('user'));
		}

		if (state.has('token')) {
			setToken(state.get<string>('token'));
		}

		const keys: Key[] = [];

		keys.push(state.listen<UserContract>('user', setUser));
		keys.push(state.listen<string>('token', setToken));

		return () => {
			document.querySelectorAll(`.${id}`).forEach((element) => element.remove());
			document.body.classList.remove('g-sidenav-show', 'bg-gray-100');
			keys.forEach((key) => state.unlisten(key));
		};
		// eslint-disable-next-line
	}, []);

	return (
		<ServerContext.Provider value={{ url, setUrl, valid, setValid }}>
			<AuthContext.Provider value={{ user, setUser, token, setToken }}>
				{valid ? (
					<Switch>
						{routes.map((route, index) => (
							<Route {...route} key={index} />
						))}
					</Switch>
				) : (
					<PromptServer submit={(url) => check(url)} />
				)}
			</AuthContext.Provider>
		</ServerContext.Provider>
	);
}

export default App;
