import React, { FC } from 'react';

type Props = {};

const Navbar: FC<Props> = (props) => {
	return (
		<nav className='navbar navbar-main navbar-expand-lg bg-dark shadow-none position-absolute px-4 w-100 z-index-2'>
			<div className='container-fluid pb-1 pt-4'>
				<div className='collapse navbar-collapse me-md-0 me-sm-4 mt-sm-0 mt-2' id='navbar'>
					<div className='ms-md-auto pe-md-3 d-flex align-items-center'></div>
					<ul className='navbar-nav justify-content-end'>
						<li className='nav-item d-xl-none ps-3 pe-0 d-flex align-items-center'>
							<a href='#' className='nav-link text-white text-body p-0' id='iconNavbarSidenav'>
								<div className='sidenav-toggler-inner'>
									<i className='sidenav-toggler-line bg-white'></i>
									<i className='sidenav-toggler-line bg-white'></i>
									<i className='sidenav-toggler-line bg-white'></i>
								</div>
							</a>
						</li>
						<li className='nav-item px-3 d-flex align-items-center'>
							<a href='#' className='nav-link text-white p-0'>
								<i className='fa fa-cog fixed-plugin-button-nav cursor-pointer'></i>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
