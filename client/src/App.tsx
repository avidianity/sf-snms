import React, { useEffect, useState } from 'react';
import { ROOT } from './constants';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import { UserContract } from './contracts/user.contract';
import { AuthContext } from './contexts';
import State from '@avidian/state';
import { Key } from '@avidian/events';

const state = new State();

function App() {
	const [token, setToken] = useState<string | undefined>();
	const [user, setUser] = useState<UserContract | undefined>();

	useEffect(() => {
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
		<AuthContext.Provider value={{ user, setUser, token, setToken }}>
			<BrowserRouter>
				<Switch>
					{routes.map((route, index) => (
						<Route {...route} key={index} />
					))}
				</Switch>
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

export default App;
