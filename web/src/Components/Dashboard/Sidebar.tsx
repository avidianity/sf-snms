import React, { FC } from 'react';

type Props = {}

const Sidebar: FC<Props> = (props) => {
    return (
		<aside className='sidebar-left border-right bg-white shadow' id='leftSidebar' data-simplebar>
			<a href='#' className='btn collapseSidebar toggle-btn d-lg-none text-muted ml-2 mt-3' data-toggle='toggle'>
				<i className='fe fe-x'>
					<span className='sr-only'></span>
				</i>
			</a>
			<nav className='vertnav navbar navbar-light'>
				<div className='w-100 mb-4 d-flex'>
					<a className='navbar-brand mx-auto mt-2 flex-fill text-center' href='./index.html'>
						<svg
							version='1.1'
							id='logo'
							className='navbar-brand-img brand-sm'
							xmlns='http://www.w3.org/2000/svg'
							xmlnsXlink='http://www.w3.org/1999/xlink'
							x='0px'
							y='0px'
							viewBox='0 0 120 120'
							xmlSpace='preserve'>
							<g>
								<polygon className='st0' points='78,105 15,105 24,87 87,87 	' />
								<polygon className='st0' points='96,69 33,69 42,51 105,51 	' />
								<polygon className='st0' points='78,33 15,33 24,15 87,15 	' />
							</g>
						</svg>
					</a>
				</div>
				<ul className='navbar-nav flex-fill w-100 mb-2'>
					<li className='nav-item dropdown'>
						<a href='#dashboard' data-toggle='collapse' aria-expanded='false' className='dropdown-toggle nav-link'>
							<i className='fe fe-home fe-16'></i>
							<span className='ml-3 item-text'>Dashboard</span>
							<span className='sr-only'>(current)</span>
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
				<p className='text-muted nav-heading mt-4 mb-1'>
					<span>Components</span>
				</p>
				<ul className='navbar-nav flex-fill w-100 mb-2'>
					<li className='nav-item dropdown'>
						<a href='#ui-elements' data-toggle='collapse' aria-expanded='false' className='dropdown-toggle nav-link'>
							<i className='fe fe-box fe-16'></i>
							<span className='ml-3 item-text'>UI elements</span>
						</a>
						<ul className='collapse list-unstyled pl-4 w-100' id='ui-elements'>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./ui-color.html'>
									<span className='ml-1 item-text'>Colors</span>{' '}
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./ui-typograpy.html'>
									<span className='ml-1 item-text'>Typograpy</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./ui-icons.html'>
									<span className='ml-1 item-text'>Icons</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./ui-buttons.html'>
									<span className='ml-1 item-text'>Buttons</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./ui-notification.html'>
									<span className='ml-1 item-text'>Notifications</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./ui-modals.html'>
									<span className='ml-1 item-text'>Modals</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./ui-tabs-accordion.html'>
									<span className='ml-1 item-text'>Tabs & Accordion</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./ui-progress.html'>
									<span className='ml-1 item-text'>Progress</span>
								</a>
							</li>
						</ul>
					</li>
					<li className='nav-item w-100'>
						<a className='nav-link' href='widgets.html'>
							<i className='fe fe-layers fe-16'></i>
							<span className='ml-3 item-text'>Widgets</span>
							<span className='badge badge-pill badge-primary'>New</span>
						</a>
					</li>
					<li className='nav-item dropdown'>
						<a href='#forms' data-toggle='collapse' aria-expanded='false' className='dropdown-toggle nav-link'>
							<i className='fe fe-credit-card fe-16'></i>
							<span className='ml-3 item-text'>Forms</span>
						</a>
						<ul className='collapse list-unstyled pl-4 w-100' id='forms'>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./form_elements.html'>
									<span className='ml-1 item-text'>Basic Elements</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./form_advanced.html'>
									<span className='ml-1 item-text'>Advanced Elements</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./form_validation.html'>
									<span className='ml-1 item-text'>Validation</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./form_wizard.html'>
									<span className='ml-1 item-text'>Wizard</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./form_layouts.html'>
									<span className='ml-1 item-text'>Layouts</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./form_upload.html'>
									<span className='ml-1 item-text'>File upload</span>
								</a>
							</li>
						</ul>
					</li>
					<li className='nav-item dropdown'>
						<a href='#tables' data-toggle='collapse' aria-expanded='false' className='dropdown-toggle nav-link'>
							<i className='fe fe-grid fe-16'></i>
							<span className='ml-3 item-text'>Tables</span>
						</a>
						<ul className='collapse list-unstyled pl-4 w-100' id='tables'>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./table_basic.html'>
									<span className='ml-1 item-text'>Basic Tables</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./table_advanced.html'>
									<span className='ml-1 item-text'>Advanced Tables</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./table_datatables.html'>
									<span className='ml-1 item-text'>Data Tables</span>
								</a>
							</li>
						</ul>
					</li>
					<li className='nav-item dropdown'>
						<a href='#charts' data-toggle='collapse' aria-expanded='false' className='dropdown-toggle nav-link'>
							<i className='fe fe-pie-chart fe-16'></i>
							<span className='ml-3 item-text'>Charts</span>
						</a>
						<ul className='collapse list-unstyled pl-4 w-100' id='charts'>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./chart-inline.html'>
									<span className='ml-1 item-text'>Inline Chart</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./chart-chartjs.html'>
									<span className='ml-1 item-text'>Chartjs</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./chart-apexcharts.html'>
									<span className='ml-1 item-text'>ApexCharts</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./datamaps.html'>
									<span className='ml-1 item-text'>Datamaps</span>
								</a>
							</li>
						</ul>
					</li>
				</ul>
				<p className='text-muted nav-heading mt-4 mb-1'>
					<span>Apps</span>
				</p>
				<ul className='navbar-nav flex-fill w-100 mb-2'>
					<li className='nav-item w-100'>
						<a className='nav-link' href='calendar.html'>
							<i className='fe fe-calendar fe-16'></i>
							<span className='ml-3 item-text'>Calendar</span>
						</a>
					</li>
					<li className='nav-item dropdown'>
						<a href='#contact' data-toggle='collapse' aria-expanded='false' className='dropdown-toggle nav-link'>
							<i className='fe fe-book fe-16'></i>
							<span className='ml-3 item-text'>Contacts</span>
						</a>
						<ul className='collapse list-unstyled pl-4 w-100' id='contact'>
							<a className='nav-link pl-3' href='./contacts-list.html'>
								<span className='ml-1'>Contact List</span>
							</a>
							<a className='nav-link pl-3' href='./contacts-grid.html'>
								<span className='ml-1'>Contact Grid</span>
							</a>
							<a className='nav-link pl-3' href='./contacts-new.html'>
								<span className='ml-1'>New Contact</span>
							</a>
						</ul>
					</li>
					<li className='nav-item dropdown'>
						<a href='#profile' data-toggle='collapse' aria-expanded='false' className='dropdown-toggle nav-link'>
							<i className='fe fe-user fe-16'></i>
							<span className='ml-3 item-text'>Profile</span>
						</a>
						<ul className='collapse list-unstyled pl-4 w-100' id='profile'>
							<a className='nav-link pl-3' href='./profile.html'>
								<span className='ml-1'>Overview</span>
							</a>
							<a className='nav-link pl-3' href='./profile-settings.html'>
								<span className='ml-1'>Settings</span>
							</a>
							<a className='nav-link pl-3' href='./profile-security.html'>
								<span className='ml-1'>Security</span>
							</a>
							<a className='nav-link pl-3' href='./profile-notification.html'>
								<span className='ml-1'>Notifications</span>
							</a>
						</ul>
					</li>
					<li className='nav-item dropdown'>
						<a href='#fileman' data-toggle='collapse' aria-expanded='false' className='dropdown-toggle nav-link'>
							<i className='fe fe-folder fe-16'></i>
							<span className='ml-3 item-text'>File Manager</span>
						</a>
						<ul className='collapse list-unstyled pl-4 w-100' id='fileman'>
							<a className='nav-link pl-3' href='./files-list.html'>
								<span className='ml-1'>Files List</span>
							</a>
							<a className='nav-link pl-3' href='./files-grid.html'>
								<span className='ml-1'>Files Grid</span>
							</a>
						</ul>
					</li>
					<li className='nav-item dropdown'>
						<a href='#support' data-toggle='collapse' aria-expanded='false' className='dropdown-toggle nav-link'>
							<i className='fe fe-compass fe-16'></i>
							<span className='ml-3 item-text'>Help Desk</span>
						</a>
						<ul className='collapse list-unstyled pl-4 w-100' id='support'>
							<a className='nav-link pl-3' href='./support-center.html'>
								<span className='ml-1'>Home</span>
							</a>
							<a className='nav-link pl-3' href='./support-tickets.html'>
								<span className='ml-1'>Tickets</span>
							</a>
							<a className='nav-link pl-3' href='./support-ticket-detail.html'>
								<span className='ml-1'>Ticket Detail</span>
							</a>
							<a className='nav-link pl-3' href='./support-faqs.html'>
								<span className='ml-1'>FAQs</span>
							</a>
						</ul>
					</li>
				</ul>
				<p className='text-muted nav-heading mt-4 mb-1'>
					<span>Extra</span>
				</p>
				<ul className='navbar-nav flex-fill w-100 mb-2'>
					<li className='nav-item dropdown'>
						<a href='#pages' data-toggle='collapse' aria-expanded='false' className='dropdown-toggle nav-link'>
							<i className='fe fe-file fe-16'></i>
							<span className='ml-3 item-text'>Pages</span>
						</a>
						<ul className='collapse list-unstyled pl-4 w-100 w-100' id='pages'>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./page-orders.html'>
									<span className='ml-1 item-text'>Orders</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./page-timeline.html'>
									<span className='ml-1 item-text'>Timeline</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./page-invoice.html'>
									<span className='ml-1 item-text'>Invoice</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./page-404.html'>
									<span className='ml-1 item-text'>Page 404</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./page-500.html'>
									<span className='ml-1 item-text'>Page 500</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./page-blank.html'>
									<span className='ml-1 item-text'>Blank</span>
								</a>
							</li>
						</ul>
					</li>
					<li className='nav-item dropdown'>
						<a href='#auth' data-toggle='collapse' aria-expanded='false' className='dropdown-toggle nav-link'>
							<i className='fe fe-shield fe-16'></i>
							<span className='ml-3 item-text'>Authentication</span>
						</a>
						<ul className='collapse list-unstyled pl-4 w-100' id='auth'>
							<a className='nav-link pl-3' href='./auth-login.html'>
								<span className='ml-1'>Login 1</span>
							</a>
							<a className='nav-link pl-3' href='./auth-login-half.html'>
								<span className='ml-1'>Login 2</span>
							</a>
							<a className='nav-link pl-3' href='./auth-register.html'>
								<span className='ml-1'>Register</span>
							</a>
							<a className='nav-link pl-3' href='./auth-resetpw.html'>
								<span className='ml-1'>Reset Password</span>
							</a>
							<a className='nav-link pl-3' href='./auth-confirm.html'>
								<span className='ml-1'>Confirm Password</span>
							</a>
						</ul>
					</li>
					<li className='nav-item dropdown'>
						<a href='#layouts' data-toggle='collapse' aria-expanded='false' className='dropdown-toggle nav-link'>
							<i className='fe fe-layout fe-16'></i>
							<span className='ml-3 item-text'>Layout</span>
						</a>
						<ul className='collapse list-unstyled pl-4 w-100' id='layouts'>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./index.html'>
									<span className='ml-1 item-text'>Default</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./index-horizontal.html'>
									<span className='ml-1 item-text'>Top Navigation</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link pl-3' href='./index-boxed.html'>
									<span className='ml-1 item-text'>Boxed</span>
								</a>
							</li>
						</ul>
					</li>
				</ul>
				<p className='text-muted nav-heading mt-4 mb-1'>
					<span>Documentation</span>
				</p>
				<ul className='navbar-nav flex-fill w-100 mb-2'>
					<li className='nav-item w-100'>
						<a className='nav-link' href='../docs/index.html'>
							<i className='fe fe-help-circle fe-16'></i>
							<span className='ml-3 item-text'>Getting Start</span>
						</a>
					</li>
				</ul>
				<div className='btn-box w-100 mt-4 mb-1'>
					<button type='button' className='btn mb-2 btn-primary btn-lg btn-block'>
						<i className='fe fe-shopping-cart fe-12 mr-2'></i>
						<span className='small'>Buy now</span>
					</button>
				</div>
			</nav>
		</aside>
	);
}

export default Sidebar;
