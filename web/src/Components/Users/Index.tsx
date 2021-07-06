import React, { FC, useMemo } from 'react';
import { Route, RouteProps, Switch } from 'react-router';
import { useURL } from '../../hooks';
import Form from './Form';
import List from './List';

type Props = {};

const Users: FC<Props> = (props) => {
	const url = useURL();
	const links: RouteProps[] = useMemo(
		() => [
			{
				path: url('/'),
				exact: true,
				component: List,
			},
			{
				path: url('/add'),
				component: Form,
			},
			{
				path: url('/:id/edit'),
				component: Form,
			},
		],
		[url]
	);

	return (
		<Switch>
			{links.map((route, index) => (
				<Route {...route} key={index} />
			))}
		</Switch>
	);
};

export default Users;
