import React, { FC } from 'react';

type Props = {};

const Analytics: FC<Props> = (props) => {
	return (
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
					<div className='row my-4'>
						<div className='col-md-4'>
							<div className='card shadow mb-4'>
								<div className='card-body'>
									<div className='row align-items-center'>
										<div className='col'>
											<small className='text-muted mb-1'>NPK Usage</small>
											<h3 className='card-title mb-0'>1168</h3>
											<p className='small text-muted mb-0'>
												<span className='fe fe-arrow-down fe-12 text-danger'></span>
												<span>-18.9% Last week</span>
											</p>
										</div>
										<div className='col-4 text-right'>
											<span className='sparkline inlineline'></span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='col-md-4'>
							<div className='card shadow mb-4'>
								<div className='card-body'>
									<div className='row align-items-center'>
										<div className='col'>
											<small className='text-muted mb-1'>Sensor Usage</small>
											<h3 className='card-title mb-0'>68</h3>
											<p className='small text-muted mb-0'>
												<span className='fe fe-arrow-up fe-12 text-warning'></span>
												<span>+1.9% Last week</span>
											</p>
										</div>
										<div className='col-4 text-right'>
											<span className='sparkline inlinepie'></span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='col-md-4'>
							<div className='card shadow mb-4'>
								<div className='card-body'>
									<div className='row align-items-center'>
										<div className='col'>
											<small className='text-muted mb-1'>Water Distributions</small>
											<h3 className='card-title mb-0'>108</h3>
											<p className='small text-muted mb-0'>
												<span className='fe fe-arrow-up fe-12 text-success'></span>
												<span>37.7% Last week</span>
											</p>
										</div>
										<div className='col-4 text-right'>
											<span className='sparkline inlinebar'></span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='my-4'>
						<div id='lineChart'></div>
					</div>
					<div className='row'>
						<div className='col-md-6'>
							<div className='card shadow eq-card mb-4'>
								<div className='card-header'>
									<strong className='card-title'>Traffic</strong>
									<a className='float-right small text-muted' href='#!'>
										View all
									</a>
								</div>
								<div className='card-body'>
									<div className='chart-box mb-3' style={{ minHeight: '180px' }}>
										<div id='customAngle'></div>
									</div>
									<div className='mx-auto'>
										<div className='row align-items-center mb-2'>
											<div className='col'>
												<p className='mb-0'>Direct</p>
												<span className='my-0 text-muted small'>+10%</span>
											</div>
											<div className='col-auto text-right'>
												<p className='mb-0'>218</p>
												<span className='dot dot-md bg-success'></span>
											</div>
										</div>
										<div className='row align-items-center mb-2'>
											<div className='col'>
												<p className='mb-0'>Organic Search</p>
												<span className='my-0 text-muted small'>+0.6%</span>
											</div>
											<div className='col-auto text-right'>
												<p className='mb-0'>1002</p>
												<span className='dot dot-md bg-warning'></span>
											</div>
										</div>
										<div className='row align-items-center mb-2'>
											<div className='col'>
												<p className='mb-0'>Referral</p>
												<span className='my-0 text-muted small'>+1.6%</span>
											</div>
											<div className='col-auto text-right'>
												<p className='mb-0'>67</p>
												<span className='dot dot-md bg-primary'></span>
											</div>
										</div>
										<div className='row align-items-center'>
											<div className='col'>
												<p className='mb-0'>Social</p>
												<span className='my-0 text-muted small'>+118%</span>
											</div>
											<div className='col-auto text-right'>
												<p className='mb-0'>386</p>
												<span className='dot dot-md bg-secondary'></span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='col-md-6'>
							<div className='card shadow eq-card mb-4'>
								<div className='card-header'>
									<strong>NPK Levels</strong>
								</div>
								<div className='card-body'>
									<div className='chart-box mt-3 mb-5'>
										<div id='radarChartWidget'></div>
									</div>
									<div className='mx-auto'>
										<div className='row align-items-center my-2'>
											<div className='col-6 col-xl-3 my-3'>
												<span className='mb-0'>Nitrogen</span>
												<div className='progress my-2' style={{ height: '4px' }}>
													<div className='progress-bar' role='progressbar' style={{ width: '10%' }}></div>
												</div>
											</div>
											<div className='col-6 col-xl-3 my-3 text-right'>
												<span>118</span>
												<br />
												<span className='my-0 text-muted small'>+10%</span>
											</div>
											<div className='col-6 col-xl-3 my-3'>
												<span className='mb-0'>Phosphorus</span>
												<div className='progress my-2' style={{ height: '4px' }}>
													<div className='progress-bar' role='progressbar' style={{ width: '36%' }}></div>
												</div>
											</div>
											<div className='col-6 col-xl-3 my-3 text-right'>
												<span>1008</span>
												<br />
												<span className='my-0 text-muted small'>+36%</span>
											</div>
											<div className='col-6 col-xl-3 my-3'>
												<span className='mb-0'>Potassium</span>
												<div className='progress my-2' style={{ height: '4px' }}>
													<div className='progress-bar' role='progressbar' style={{ width: '85%' }}></div>
												</div>
											</div>
											<div className='col-6 col-xl-3 my-3 text-right'>
												<span>67</span>
												<br />
												<span className='my-0 text-muted small'>+1.6%</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Analytics;
