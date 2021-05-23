import React, { FC } from 'react';
import Navbar from '../Components/Dashboard/Navbar';
import Sidebar from '../Components/Dashboard/Sidebar';

type Props = {};

const Dashboard: FC<Props> = (props) => {
	return (
		<div className='wrapper'>
			<Navbar />
			<Sidebar />
			<main role='main' className='main-content'>
				<div className='container-fluid'>
					<div className='row justify-content-center'>
						<div className='col-12'>
							<div className='row align-items-center mb-2'>
								<div className='col'>
									<h2 className='h5 page-title'>Welcome!</h2>
								</div>
								<div className='col-auto'>
									<form className='form-inline'>
										<div className='form-group d-none d-lg-inline'>
											<label htmlFor='reportrange' className='sr-only'>
												Date Ranges
											</label>
											<div id='reportrange' className='px-2 py-2 text-muted'>
												<span className='small'></span>
											</div>
										</div>
										<div className='form-group'>
											<button type='button' className='btn btn-sm'>
												<span className='fe fe-refresh-ccw fe-16 text-muted'></span>
											</button>
											<button type='button' className='btn btn-sm mr-2'>
												<span className='fe fe-filter fe-16 text-muted'></span>
											</button>
										</div>
									</form>
								</div>
							</div>
							<div className='mb-2 align-items-center'>
								<div className='card shadow mb-4'>
									<div className='card-body'>
										<div className='row mt-1 align-items-center'>
											<div className='col-12 col-lg-4 text-left pl-4'>
												<p className='mb-1 small text-muted'>Balance</p>
												<span className='h3'>$12,600</span>
												<span className='small text-muted'>+20%</span>
												<span className='fe fe-arrow-up text-success fe-12'></span>
												<p className='text-muted mt-2'>
													Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui
												</p>
											</div>
											<div className='col-6 col-lg-2 text-center py-4'>
												<p className='mb-1 small text-muted'>Today</p>
												<span className='h3'>$2600</span>
												<br />
												<span className='small text-muted'>+20%</span>
												<span className='fe fe-arrow-up text-success fe-12'></span>
											</div>
											<div className='col-6 col-lg-2 text-center py-4 mb-2'>
												<p className='mb-1 small text-muted'>Goal Value</p>
												<span className='h3'>$260</span>
												<br />
												<span className='small text-muted'>+6%</span>
												<span className='fe fe-arrow-up text-success fe-12'></span>
											</div>
											<div className='col-6 col-lg-2 text-center py-4'>
												<p className='mb-1 small text-muted'>Completions</p>
												<span className='h3'>26</span>
												<br />
												<span className='small text-muted'>+20%</span>
												<span className='fe fe-arrow-up text-success fe-12'></span>
											</div>
											<div className='col-6 col-lg-2 text-center py-4'>
												<p className='mb-1 small text-muted'>Conversion</p>
												<span className='h3'>6%</span>
												<br />
												<span className='small text-muted'>-2%</span>
												<span className='fe fe-arrow-down text-danger fe-12'></span>
											</div>
										</div>
										<div className='chartbox mr-4'>
											<div id='areaChart'></div>
										</div>
									</div>
								</div>
							</div>
							<div className='row items-align-baseline'>
								<div className='col-md-12 col-lg-4'>
									<div className='card shadow eq-card mb-4'>
										<div className='card-body mb-n3'>
											<div className='row items-align-baseline h-100'>
												<div className='col-md-6 my-3'>
													<p className='mb-0'>
														<strong className='mb-0 text-uppercase text-muted'>Earning</strong>
													</p>
													<h3>$2,562</h3>
													<p className='text-muted'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
												</div>
												<div className='col-md-6 my-4 text-center'>
													<div className='chart-box mx-4'>
														<div id='radialbarWidget'></div>
													</div>
												</div>
												<div className='col-md-6 border-top py-3'>
													<p className='mb-1'>
														<strong className='text-muted'>Cost</strong>
													</p>
													<h4 className='mb-0'>108</h4>
													<p className='small text-muted mb-0'>
														<span>37.7% Last week</span>
													</p>
												</div>
												<div className='col-md-6 border-top py-3'>
													<p className='mb-1'>
														<strong className='text-muted'>Revenue</strong>
													</p>
													<h4 className='mb-0'>1168</h4>
													<p className='small text-muted mb-0'>
														<span>-18.9% Last week</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-12 col-lg-4'>
									<div className='card shadow eq-card mb-4'>
										<div className='card-body'>
											<div className='chart-widget mb-2'>
												<div id='radialbar'></div>
											</div>
											<div className='row items-align-center'>
												<div className='col-4 text-center'>
													<p className='text-muted mb-1'>Cost</p>
													<h6 className='mb-1'>$1,823</h6>
													<p className='text-muted mb-0'>+12%</p>
												</div>
												<div className='col-4 text-center'>
													<p className='text-muted mb-1'>Revenue</p>
													<h6 className='mb-1'>$6,830</h6>
													<p className='text-muted mb-0'>+8%</p>
												</div>
												<div className='col-4 text-center'>
													<p className='text-muted mb-1'>Earning</p>
													<h6 className='mb-1'>$4,830</h6>
													<p className='text-muted mb-0'>+8%</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-12 col-lg-4'>
									<div className='card shadow eq-card mb-4'>
										<div className='card-body'>
											<div className='d-flex mt-3 mb-4'>
												<div className='flex-fill pt-2'>
													<p className='mb-0 text-muted'>Total</p>
													<h4 className='mb-0'>108</h4>
													<span className='small text-muted'>+37.7%</span>
												</div>
												<div className='flex-fill chart-box mt-n2'>
													<div id='barChartWidget'></div>
												</div>
											</div>
											<div className='row border-top'>
												<div className='col-md-6 pt-4'>
													<h6 className='mb-0'>
														108 <span className='small text-muted'>+37.7%</span>
													</h6>
													<p className='mb-0 text-muted'>Cost</p>
												</div>
												<div className='col-md-6 pt-4'>
													<h6 className='mb-0'>
														1168 <span className='small text-muted'>-18.9%</span>
													</h6>
													<p className='mb-0 text-muted'>Revenue</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12 col-lg-4 mb-4'>
									<div className='card timeline shadow'>
										<div className='card-header'>
											<strong className='card-title'>Recent Activity</strong>
											<a className='float-right small text-muted' href='#!'>
												View all
											</a>
										</div>
										<div
											className='card-body'
											data-simplebar
											style={{ height: '355px', overflowY: 'auto', overflowX: 'hidden' }}>
											<h6 className='text-uppercase text-muted mb-4'>Today</h6>
											<div className='pb-3 timeline-item item-primary'>
												<div className='pl-5'>
													<div className='mb-1'>
														<strong>@Brown Asher</strong>
														<span className='text-muted small mx-2'>
															Just create new layout Index, form, table
														</span>
														<strong>Tiny Admin</strong>
													</div>
													<p className='small text-muted'>
														Creative Design <span className='badge badge-light'>1h ago</span>
													</p>
												</div>
											</div>
											<div className='pb-3 timeline-item item-warning'>
												<div className='pl-5'>
													<div className='mb-3'>
														<strong>@Hester Nissim</strong>
														<span className='text-muted small mx-2'>has upload new files to</span>
														<strong>Tiny Admin</strong>
													</div>
													<div className='row mb-3'>
														<div className='col'>
															<img src='./assets/products/p1.jpg' alt='...' className='img-fluid rounded' />
														</div>
														<div className='col'>
															<img src='./assets/products/p2.jpg' alt='...' className='img-fluid rounded' />
														</div>
														<div className='col'>
															<img src='./assets/products/p3.jpg' alt='...' className='img-fluid rounded' />
														</div>
														<div className='col'>
															<img src='./assets/products/p4.jpg' alt='...' className='img-fluid rounded' />
														</div>
													</div>
													<p className='small text-muted'>
														Front-End Development <span className='badge badge-light'>1h ago</span>
													</p>
												</div>
											</div>
											<div className='pb-3 timeline-item item-success'>
												<div className='pl-5'>
													<div className='mb-3'>
														<strong>@Kelley Sonya</strong>
														<span className='text-muted small mx-2'>has commented on</span>
														<strong>Advanced table</strong>
													</div>
													<div className='card d-inline-flex mb-2'>
														<div className='card-body bg-light py-2 px-3 small rounded'>
															Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim nulla
															eu quam cursus placerat. Vivamus non odio ullamcorper, lacinia ante nec, blandit
															leo.
														</div>
													</div>
													<p className='small text-muted'>
														Back-End Development <span className='badge badge-light'>1h ago</span>
													</p>
												</div>
											</div>
											<h6 className='text-uppercase text-muted mb-4'>Yesterday</h6>
											<div className='pb-3 timeline-item item-warning'>
												<div className='pl-5'>
													<div className='mb-3'>
														<strong>@Fletcher Everett</strong>
														<span className='text-muted small mx-2'>created new group for</span>
														<strong>Tiny Admin</strong>
													</div>
													<ul className='avatars-list mb-3'>
														<li>
															<a href='#!' className='avatar avatar-sm'>
																<img
																	alt='...'
																	className='avatar-img rounded-circle'
																	src='./assets/avatars/face-1.jpg'
																/>
															</a>
														</li>
														<li>
															<a href='#!' className='avatar avatar-sm'>
																<img
																	alt='...'
																	className='avatar-img rounded-circle'
																	src='./assets/avatars/face-4.jpg'
																/>
															</a>
														</li>
														<li>
															<a href='#!' className='avatar avatar-sm'>
																<img
																	alt='...'
																	className='avatar-img rounded-circle'
																	src='./assets/avatars/face-3.jpg'
																/>
															</a>
														</li>
													</ul>
													<p className='small text-muted'>
														Front-End Development <span className='badge badge-light'>1h ago</span>
													</p>
												</div>
											</div>
											<div className='pb-3 timeline-item item-success'>
												<div className='pl-5'>
													<div className='mb-3'>
														<strong>@Bertha Ball</strong>
														<span className='text-muted small mx-2'>has commented on</span>
														<strong>Advanced table</strong>
													</div>
													<div className='card d-inline-flex mb-2'>
														<div className='card-body bg-light py-2 px-3'>
															Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim nulla
															eu quam cursus placerat. Vivamus non odio ullamcorper, lacinia ante nec, blandit
															leo.
														</div>
													</div>
													<p className='small text-muted'>
														Back-End Development <span className='badge badge-light'>1h ago</span>
													</p>
												</div>
											</div>
											<div className='pb-3 timeline-item item-danger'>
												<div className='pl-5'>
													<div className='mb-3'>
														<strong>@Lillith Joseph</strong>
														<span className='text-muted small mx-2'>has upload new files to</span>
														<strong>Tiny Admin</strong>
													</div>
													<div className='row mb-3'>
														<div className='col'>
															<img src='./assets/products/p4.jpg' alt='...' className='img-fluid rounded' />
														</div>
														<div className='col'>
															<img src='./assets/products/p1.jpg' alt='...' className='img-fluid rounded' />
														</div>
														<div className='col'>
															<img src='./assets/products/p2.jpg' alt='...' className='img-fluid rounded' />
														</div>
													</div>
													<p className='small text-muted'>
														Front-End Development <span className='badge badge-light'>1h ago</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-12 col-lg-8'>
									<div className='card shadow'>
										<div className='card-header'>
											<strong className='card-title'>Recent Data</strong>
											<a className='float-right small text-muted' href='#!'>
												View all
											</a>
										</div>
										<div className='card-body my-n2'>
											<table className='table table-striped table-hover table-borderless'>
												<thead>
													<tr>
														<th>ID</th>
														<th>Name</th>
														<th>Address</th>
														<th>Date</th>
														<th>Action</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>2474</td>
														<th scope='col'>Brown, Asher D.</th>
														<td>Ap #331-7123 Lobortis Avenue</td>
														<td>13/09/2020</td>
														<td>
															<div className='dropdown'>
																<button
																	className='btn btn-sm dropdown-toggle more-vertical'
																	type='button'
																	id='dr1'
																	data-toggle='dropdown'
																	aria-haspopup='true'
																	aria-expanded='false'>
																	<span className='text-muted sr-only'>Action</span>
																</button>
																<div className='dropdown-menu dropdown-menu-right' aria-labelledby='dr1'>
																	<a className='dropdown-item' href='#'>
																		Edit
																	</a>
																	<a className='dropdown-item' href='#'>
																		Remove
																	</a>
																	<a className='dropdown-item' href='#'>
																		Assign
																	</a>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td>2786</td>
														<th scope='col'>Leblanc, Yoshio V.</th>
														<td>287-8300 Nisl. St.</td>
														<td>04/05/2019</td>
														<td>
															<div className='dropdown'>
																<button
																	className='btn btn-sm dropdown-toggle more-vertical'
																	type='button'
																	id='dr2'
																	data-toggle='dropdown'
																	aria-haspopup='true'
																	aria-expanded='false'>
																	<span className='text-muted sr-only'>Action</span>
																</button>
																<div className='dropdown-menu dropdown-menu-right' aria-labelledby='dr2'>
																	<a className='dropdown-item' href='#'>
																		Edit
																	</a>
																	<a className='dropdown-item' href='#'>
																		Remove
																	</a>
																	<a className='dropdown-item' href='#'>
																		Assign
																	</a>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td>2747</td>
														<th scope='col'>Hester, Nissim L.</th>
														<td>4577 Cras St.</td>
														<td>04/06/2019</td>
														<td>
															<div className='dropdown'>
																<button
																	className='btn btn-sm dropdown-toggle more-vertical'
																	type='button'
																	data-toggle='dropdown'
																	aria-haspopup='true'
																	aria-expanded='false'>
																	<span className='text-muted sr-only'>Action</span>
																</button>
																<div className='dropdown-menu dropdown-menu-right'>
																	<a className='dropdown-item' href='#'>
																		Edit
																	</a>
																	<a className='dropdown-item' href='#'>
																		Remove
																	</a>
																	<a className='dropdown-item' href='#'>
																		Assign
																	</a>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td>2639</td>
														<th scope='col'>Gardner, Leigh S.</th>
														<td>P.O. Box 228, 7512 Lectus Ave</td>
														<td>04/08/2019</td>
														<td>
															<div className='dropdown'>
																<button
																	className='btn btn-sm dropdown-toggle more-vertical'
																	type='button'
																	id='dr4'
																	data-toggle='dropdown'
																	aria-haspopup='true'
																	aria-expanded='false'>
																	<span className='text-muted sr-only'>Action</span>
																</button>
																<div className='dropdown-menu dropdown-menu-right' aria-labelledby='dr4'>
																	<a className='dropdown-item' href='#'>
																		Edit
																	</a>
																	<a className='dropdown-item' href='#'>
																		Remove
																	</a>
																	<a className='dropdown-item' href='#'>
																		Assign
																	</a>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td>2238</td>
														<th scope='col'>Higgins, Uriah L.</th>
														<td>Ap #377-5357 Sed Road</td>
														<td>04/01/2019</td>
														<td>
															<div className='dropdown'>
																<button
																	className='btn btn-sm dropdown-toggle more-vertical'
																	type='button'
																	id='dr5'
																	data-toggle='dropdown'
																	aria-haspopup='true'
																	aria-expanded='false'>
																	<span className='text-muted sr-only'>Action</span>
																</button>
																<div className='dropdown-menu dropdown-menu-right' aria-labelledby='dr5'>
																	<a className='dropdown-item' href='#'>
																		Edit
																	</a>
																	<a className='dropdown-item' href='#'>
																		Remove
																	</a>
																	<a className='dropdown-item' href='#'>
																		Assign
																	</a>
																</div>
															</div>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					className='modal fade modal-notif modal-slide'
					tabIndex={-1}
					role='dialog'
					aria-labelledby='defaultModalLabel'
					aria-hidden='true'>
					<div className='modal-dialog modal-sm' role='document'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5 className='modal-title' id='defaultModalLabel'>
									Notifications
								</h5>
								<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
									<span aria-hidden='true'>&times;</span>
								</button>
							</div>
							<div className='modal-body'>
								<div className='list-group list-group-flush my-n3'>
									<div className='list-group-item bg-transparent'>
										<div className='row align-items-center'>
											<div className='col-auto'>
												<span className='fe fe-box fe-24'></span>
											</div>
											<div className='col'>
												<small>
													<strong>Package has uploaded successfull</strong>
												</small>
												<div className='my-0 text-muted small'>Package is zipped and uploaded</div>
												<small className='badge badge-pill badge-light text-muted'>1m ago</small>
											</div>
										</div>
									</div>
									<div className='list-group-item bg-transparent'>
										<div className='row align-items-center'>
											<div className='col-auto'>
												<span className='fe fe-download fe-24'></span>
											</div>
											<div className='col'>
												<small>
													<strong>Widgets are updated successfull</strong>
												</small>
												<div className='my-0 text-muted small'>Just create new layout Index, form, table</div>
												<small className='badge badge-pill badge-light text-muted'>2m ago</small>
											</div>
										</div>
									</div>
									<div className='list-group-item bg-transparent'>
										<div className='row align-items-center'>
											<div className='col-auto'>
												<span className='fe fe-inbox fe-24'></span>
											</div>
											<div className='col'>
												<small>
													<strong>Notifications have been sent</strong>
												</small>
												<div className='my-0 text-muted small'>Fusce dapibus, tellus ac cursus commodo</div>
												<small className='badge badge-pill badge-light text-muted'>30m ago</small>
											</div>
										</div>
									</div>
									<div className='list-group-item bg-transparent'>
										<div className='row align-items-center'>
											<div className='col-auto'>
												<span className='fe fe-link fe-24'></span>
											</div>
											<div className='col'>
												<small>
													<strong>Link was attached to menu</strong>
												</small>
												<div className='my-0 text-muted small'>New layout has been attached to the menu</div>
												<small className='badge badge-pill badge-light text-muted'>1h ago</small>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='modal-footer'>
								<button type='button' className='btn btn-secondary btn-block' data-dismiss='modal'>
									Clear All
								</button>
							</div>
						</div>
					</div>
				</div>
				<div
					className='modal fade modal-shortcut modal-slide'
					tabIndex={-1}
					role='dialog'
					aria-labelledby='defaultModalLabel'
					aria-hidden='true'>
					<div className='modal-dialog' role='document'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5 className='modal-title' id='defaultModalLabel'>
									Shortcuts
								</h5>
								<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
									<span aria-hidden='true'>&times;</span>
								</button>
							</div>
							<div className='modal-body px-5'>
								<div className='row align-items-center'>
									<div className='col-6 text-center'>
										<div className='squircle bg-success justify-content-center'>
											<i className='fe fe-cpu fe-32 align-self-center text-white'></i>
										</div>
										<p>Control area</p>
									</div>
									<div className='col-6 text-center'>
										<div className='squircle bg-primary justify-content-center'>
											<i className='fe fe-activity fe-32 align-self-center text-white'></i>
										</div>
										<p>Activity</p>
									</div>
								</div>
								<div className='row align-items-center'>
									<div className='col-6 text-center'>
										<div className='squircle bg-primary justify-content-center'>
											<i className='fe fe-droplet fe-32 align-self-center text-white'></i>
										</div>
										<p>Droplet</p>
									</div>
									<div className='col-6 text-center'>
										<div className='squircle bg-primary justify-content-center'>
											<i className='fe fe-upload-cloud fe-32 align-self-center text-white'></i>
										</div>
										<p>Upload</p>
									</div>
								</div>
								<div className='row align-items-center'>
									<div className='col-6 text-center'>
										<div className='squircle bg-primary justify-content-center'>
											<i className='fe fe-users fe-32 align-self-center text-white'></i>
										</div>
										<p>Users</p>
									</div>
									<div className='col-6 text-center'>
										<div className='squircle bg-primary justify-content-center'>
											<i className='fe fe-settings fe-32 align-self-center text-white'></i>
										</div>
										<p>Settings</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Dashboard;
