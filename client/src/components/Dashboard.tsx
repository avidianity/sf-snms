import React, { FC } from 'react';
import { useSetup, useURL } from '../hooks';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Plugin from './Plugin';
import { Route, Switch } from 'react-router';
import SignUp from './Auth/SignUp';
import SignIn from './Auth/SignIn';

type Props = {};

const Dashboard: FC<Props> = (props) => {
	const { sidebarColor, sidebarType } = useSetup();
	const url = useURL();

	return (
		<>
			<Navbar />
			<Sidebar />
			<div className='main-content position-relative bg-gray-100 max-height-vh-100 h-100 pt-5'>
				<div className='container-fluid py-5'>
					<Switch>
						<Route path={url('/sign-up')} component={SignUp} />
						<Route path={url('/sign-in')} component={SignIn} />
					</Switch>
				</div>
			</div>
			<Plugin sidebarColor={sidebarColor} sidebarType={sidebarType} />
		</>
	);
};

export default Dashboard;
