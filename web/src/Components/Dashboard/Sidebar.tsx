import React, { createRef, FC } from 'react';
import { Link } from 'react-router-dom';
import { useURL } from '../../hooks';
import { routes } from '../../routes';

type Props = {};

const Sidebar: FC<Props> = (props) => {
	const url = useURL();

	const refs = {
		dashboard: createRef<HTMLUListElement>(),
	};

	return (
		<aside className='sidebar-left border-right bg-white shadow' id='leftSidebar' data-simplebar>
			<a href='/' className='btn collapseSidebar toggle-btn d-lg-none text-muted ml-2 mt-3' data-toggle='toggle'>
				<i className='fe fe-x'>
					<span className='sr-only'></span>
				</i>
			</a>
			<nav className='vertnav navbar navbar-light'>
				<div className='w-100 mb-4 d-flex'>
					<a className='navbar-brand mx-auto mt-2 flex-fill text-center' href='./index.html'>
						<img
							src='/logo.png'
							alt='SF-SNMS'
							className='shadow border rounded-circle'
							style={{ height: '50px', width: '50px' }}
						/>
					</a>
				</div>
				<ul className='navbar-nav flex-fill w-100 mb-2'>
					<li className='nav-item dropdown'>
						<a
							href='/dashboard'
							className='dropdown-toggle nav-link'
							onClick={(e) => {
								e.preventDefault();
								if (refs.dashboard.current) {
									$(refs.dashboard.current).collapse('toggle');
								}
							}}>
							<i className='fe fe-home fe-16'></i>
							<span className='ml-3 item-text'>Dashboard</span>
						</a>
						<ul className='collapse list-unstyled pl-4 w-100' ref={refs.dashboard}>
							<li className='nav-item'>
								<Link className='nav-link pl-3' to={url(routes.ANALYTICS)}>
									<i className='fas fa-chart-bar'></i>
									<span className='ml-3 item-text'>Analytics</span>
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link pl-3' to={url(routes.SENSORS)}>
									<i className='fas fa-satellite-dish'></i>
									<span className='ml-3 item-text'>Sensors</span>
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link pl-3' to={url(routes.CONTROLS)}>
									<i className='fas fa-broadcast-tower'></i>
									<span className='ml-3 item-text'>Controls</span>
								</Link>
							</li>
						</ul>
					</li>
					<li className='nav-item'>
						<Link to={url(routes.PLANTS)} className='nav-link'>
							<i className='la la-seedling fe-16'></i>
							<span className='ml-3 item-text'>Plants</span>
						</Link>
					</li>
					<li className='nav-item'>
						<Link to={url(routes.USERS)} className='nav-link'>
							<i className='la la-user fe-16'></i>
							<span className='ml-3 item-text'>Users</span>
						</Link>
					</li>
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;
