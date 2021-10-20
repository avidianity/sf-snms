import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { DeviceContract, DeviceStatus, DeviceTypes } from '../../contracts/device.contract';
import { useArray } from '../../hooks';
import dayjs from 'dayjs';
import { transformDeviceValue } from '../../helpers';

type Props = {};

type Item = {
	name: string;
	type: DeviceTypes;
	status: 'online' | 'offline';
	value: any;
	date?: string;
};

const Home: FC<Props> = (props) => {
	const [loading, setLoading] = useState(false);
	const [items, setItems] = useArray<Item>();

	const fetch = async () => {
		setLoading(true);
		try {
			const { data } = await axios.get<DeviceContract[]>('hardware/all');
			setItems(
				data.map((item) => ({
					name: item.name,
					type: item.type,
					status: item.status === DeviceStatus.STANDBY ? 'online' : 'offline',
					value: item.payload,
					date: item.updatedAt,
				}))
			);
		} catch (error) {
			toastr.error('Unable to fetch devices. Please try again later.');
			console.log(error instanceof Error ? error.toObject() : error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetch();
	}, []);

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-12'>
					<div className='card mb-4'>
						<div className='card-header pb-0'>
							<div className='d-flex'>
								<h6 className='d-inline'>Device Statuses</h6>
								<button
									className='btn btn-info btn-sm'
									onClick={(e) => {
										e.preventDefault();
										fetch();
									}}
									disabled={loading}
									style={{ marginLeft: 'auto' }}>
									{loading ? 'Loading' : 'Refresh'}
								</button>
							</div>
						</div>
						<div className='card-body px-0 pt-0 pb-2'>
							<div className='table-responsive p-0'>
								<table className='table align-items-center mb-0'>
									<thead>
										<tr>
											<th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
												Device Name
											</th>
											<th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>
												Device Type
											</th>
											<th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
												Status
											</th>
											<th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
												Value
											</th>
										</tr>
									</thead>
									<tbody>
										{items.map((item, index) => (
											<tr key={index}>
												<td>
													<div className='d-flex px-2 py-1'>
														<div className='d-flex flex-column justify-content-center'>
															<h6 className='mb-0 text-sm'>{item.name}</h6>
															<p className='text-xs text-secondary mb-0'>
																{dayjs(item.date).format('MMMM DD, YYYY hh:mm A')}
															</p>
														</div>
													</div>
												</td>
												<td>
													<span className='text-secondary text-xs font-weight-bold'>{item.type}</span>
												</td>
												<td className='align-middle text-center text-sm'>
													<span
														className={`badge badge-sm bg-gradient-${
															item.status === 'online' ? 'success' : 'secondary'
														}`}>
														{item.status}
													</span>
												</td>
												<td className='align-middle text-center'>
													<span className='text-secondary text-xs font-weight-bold'>
														{transformDeviceValue(item.type, item.value)}
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
