import React, { FC } from 'react';

type Props = {};

const Sidebar: FC<Props> = (props) => {
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
						<a href='#dashboard' data-toggle='collapse' className='dropdown-toggle nav-link'>
							<i className='fe fe-home fe-16'></i>
							<span className='ml-3 item-text'>Dashboard</span>
						</a>
						<ul className='collapse list-unstyled pl-4 w-100' id='dashboard'>
							<li className='nav-item active'>
								<a className='nav-link pl-3' href='./index.html'>
									<span className='ml-1 item-text'>Default</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./dashboard-analytics.html'>
									<span className='ml-1 item-text'>Analytics</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./dashboard-sales.html'>
									<span className='ml-1 item-text'>E-commerce</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./dashboard-saas.html'>
									<span className='ml-1 item-text'>Saas Dashboard</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./dashboard-system.html'>
									<span className='ml-1 item-text'>Systems</span>
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;
