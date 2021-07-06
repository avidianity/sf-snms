import React, { FC, useMemo } from 'react';
import { Route, RouteProps, Switch } from 'react-router';
import Analytics from '../Components/Dashboard/Analytics';
import Controls from '../Components/Dashboard/Controls';
import Navbar from '../Components/Dashboard/Navbar';
import Sensors from '../Components/Dashboard/Sensors';
import Sidebar from '../Components/Dashboard/Sidebar';
import Users from '../Components/Users/Index';
import { useURL } from '../hooks';
import { routes } from '../routes';

type Props = {};

const Dashboard: FC<Props> = (props) => {
	const url = useURL();

	const links: RouteProps[] = useMemo(
		() => [
			{
				path: url(routes.ANALYTICS),
				component: Analytics,
			},
			{
				path: url(routes.SENSORS),
				component: Sensors,
			},
			{
				path: url(routes.USERS),
				component: Users,
			},
			{
				path: url(routes.CONTROLS),
				component: Controls,
			},
		],
		[url]
	);

	return (
		<div className='wrapper'>
			<Navbar />
			<Sidebar />
			<main role='main' className='main-content'>
				<Switch>
					{links.map((route, index) => (
						<Route {...route} key={index} />
					))}
				</Switch>
			</main>
		</div>
	);
};

export default Dashboard;
