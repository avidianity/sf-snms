import React, { FC } from 'react';
import Settings from '@material-ui/icons/Settings';

type Props = {
	sidebarColor: (e: HTMLElement) => void;
	sidebarType: (e: HTMLButtonElement) => void;
};

const Plugin: FC<Props> = ({ sidebarColor, sidebarType }) => {
	return (
		<div className='fixed-plugin'>
			<a
				className='fixed-plugin-button text-dark position-fixed d-flex align-items-center justify-content-center'
				style={{ height: '32px', width: '32px', zIndex: 9999 }}>
				<Settings style={{ fontSize: '16px' }} />
			</a>
			<div className='card shadow-lg'>
				<div className='card-header pb-0 pt-3'>
					<div className='float-start'>
						<h5 className='mt-3 mb-0'>UI Configurator</h5>
						<p>See our dashboard options.</p>
					</div>
					<div className='float-end mt-4'>
						<button className='btn btn-link text-dark p-0 fixed-plugin-close-button'>
							<i className='fa fa-close'></i>
						</button>
					</div>
				</div>
				<hr className='horizontal dark my-1' />
				<div className='card-body pt-sm-3 pt-0'>
					<div>
						<h6 className='mb-0'>Sidebar Colors</h6>
					</div>
					<a href='#' className='switch-trigger background-color'>
						<div className='badge-colors my-2 text-start'>
							<span
								className='badge filter bg-gradient-primary active'
								data-color='primary'
								onClick={(e) => sidebarColor(e.currentTarget)}></span>
							<span
								className='badge filter bg-gradient-dark'
								data-color='dark'
								onClick={(e) => sidebarColor(e.currentTarget)}></span>
							<span
								className='badge filter bg-gradient-info'
								data-color='info'
								onClick={(e) => sidebarColor(e.currentTarget)}></span>
							<span
								className='badge filter bg-gradient-success'
								data-color='success'
								onClick={(e) => sidebarColor(e.currentTarget)}></span>
							<span
								className='badge filter bg-gradient-warning'
								data-color='warning'
								onClick={(e) => sidebarColor(e.currentTarget)}></span>
							<span
								className='badge filter bg-gradient-danger'
								data-color='danger'
								onClick={(e) => sidebarColor(e.currentTarget)}></span>
						</div>
					</a>
					<div className='mt-3'>
						<h6 className='mb-0'>Sidenav Type</h6>
						<p className='text-sm'>Choose between 2 different sidenav types.</p>
					</div>
					<div className='d-flex'>
						<button
							className='btn bg-gradient-primary w-100 px-3 mb-2 active'
							data-class='bg-transparent'
							onClick={(e) => sidebarType(e.currentTarget)}>
							Transparent
						</button>
						<button
							className='btn bg-gradient-primary w-100 px-3 mb-2 ms-2'
							data-class='bg-white'
							onClick={(e) => sidebarType(e.currentTarget)}>
							White
						</button>
					</div>
					<p className='text-sm d-xl-none d-block mt-2'>You can change the sidenav type just on desktop view.</p>
					<hr className='horizontal dark my-sm-4' />
				</div>
			</div>
		</div>
	);
};

export default Plugin;
