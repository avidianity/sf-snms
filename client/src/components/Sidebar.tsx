import React, { FC, useContext } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { ReactComponent as Spaceship } from '../assets/icons/spaceship.svg';
import { ReactComponent as Document } from '../assets/icons/document.svg';
import { ReactComponent as Settings } from '../assets/icons/settings.svg';
import { ReactComponent as Office } from '../assets/icons/office.svg';
import { ReactComponent as Box3D50 } from '../assets/icons/box-3d-50.svg';
import { ReactComponent as CreditCard } from '../assets/icons/credit-card.svg';
import { ReactComponent as Shop } from '../assets/icons/shop.svg';
import { useURL } from '../hooks';
import { AuthContext } from '../contexts';

type Props = {};

const Sidebar: FC<Props> = (props) => {
	const url = useURL();
	const { user } = useContext(AuthContext);

	return (
		<aside
			className='sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3'
			id='sidenav-main'>
			<div className='sidenav-header'>
				<i
					className='fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none'
					aria-hidden='true'
					id='iconSidenav'></i>
				<Link className='navbar-brand m-0' to={url('')} target='_blank'>
					<img src='../assets/img/logo-ct.png' className='navbar-brand-img h-100' alt='main_logo' />
					<span className='ms-1 font-weight-bold'>Smart Farming</span>
				</Link>
			</div>
			<hr className='horizontal dark mt-0' />
			<div className='collapse navbar-collapse w-auto max-height-vh-100 h-100' id='sidenav-collapse-main'>
				<ul className='navbar-nav'>
					<li className='nav-item'>
						<a className='nav-link' href='../pages/dashboard.html'>
							<div
								className='
								icon icon-shape icon-sm
								shadow
								border-radius-md
								bg-white
								text-center
								me-2
								d-flex
								align-items-center
								justify-content-center
							'>
								<Shop />
							</div>
							<span className='nav-link-text ms-1'>Dashboard</span>
						</a>
					</li>
					<li className='nav-item'>
						<a className='nav-link' href='../pages/tables.html'>
							<div
								className='
								icon icon-shape icon-sm
								shadow
								border-radius-md
								bg-white
								text-center
								me-2
								d-flex
								align-items-center
								justify-content-center
							'>
								<Office />
							</div>
							<span className='nav-link-text ms-1'>Tables</span>
						</a>
					</li>
					<li className='nav-item'>
						<a className='nav-link' href='../pages/billing.html'>
							<div
								className='
								icon icon-shape icon-sm
								shadow
								border-radius-md
								bg-white
								text-center
								me-2
								d-flex
								align-items-center
								justify-content-center
							'>
								<CreditCard />
							</div>
							<span className='nav-link-text ms-1'>Billing</span>
						</a>
					</li>
					<li className='nav-item'>
						<a className='nav-link' href='../pages/virtual-reality.html'>
							<div
								className='
								icon icon-shape icon-sm
								shadow
								border-radius-md
								bg-white
								text-center
								me-2
								d-flex
								align-items-center
								justify-content-center
							'>
								<Box3D50 />
							</div>
							<span className='nav-link-text ms-1'>Virtual Reality</span>
						</a>
					</li>
					<li className='nav-item'>
						<a className='nav-link' href='../pages/rtl.html'>
							<div
								className='
								icon icon-shape icon-sm
								shadow
								border-radius-md
								bg-white
								text-center
								me-2
								d-flex
								align-items-center
								justify-content-center
							'>
								<Settings />
							</div>
							<span className='nav-link-text ms-1'>RTL</span>
						</a>
					</li>
					<li className='nav-item mt-3'>
						<h6 className='ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6'>Account</h6>
					</li>
					{!user ? (
						<>
							<li className='nav-item'>
								<Link className='nav-link' to={url('/sign-in')}>
									<div
										className='
								icon icon-shape icon-sm
								shadow
								border-radius-md
								bg-white
								text-center
								me-2
								d-flex
								align-items-center
								justify-content-center
							'>
										<Document />
									</div>
									<span className='nav-link-text ms-1'>Sign In</span>
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to={url('/sign-up')}>
									<div
										className='
								icon icon-shape icon-sm
								shadow
								border-radius-md
								bg-white
								text-center
								me-2
								d-flex
								align-items-center
								justify-content-center
							'>
										<Spaceship />
									</div>
									<span className='nav-link-text ms-1'>Sign Up</span>
								</Link>
							</li>
						</>
					) : null}
				</ul>
			</div>
			<div className='sidenav-footer mx-3'></div>
		</aside>
	);
};

export default Sidebar;
