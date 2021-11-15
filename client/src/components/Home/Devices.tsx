import axios from 'axios';
import React, { FC, useState } from 'react';
import { errorToStrings } from '../../helpers';

type Props = {};

const Devices: FC<Props> = (props) => {
	const [devices, setDevices] = useState({
		['water-main']: 'off',
		['water-backup']: 'off',
		nitrogen: 'off',
		phosphorus: 'off',
		potassium: 'off',
	});

	const toggle = async (mode: 'on' | 'off', item: any) => {
		try {
			await axios.post(`/hardware/toggle/${item}`, { mode });
			setDevices({
				...devices,
				[item]: mode,
			});
		} catch (error) {
			errorToStrings(error).forEach((message) => toastr.error(message));
		}
	};

	return (
		<div className='container'>
			<button
				className={`mx-2 btn btn-sm btn-${devices['water-main'] === 'on' ? 'success' : 'danger'}`}
				onClick={(e) => {
					e.preventDefault();
					toggle(devices['water-main'] === 'on' ? 'off' : 'on', 'water-main');
				}}>
				Toggle Main Water {devices['water-main'] === 'on' ? 'Off' : 'On'}
			</button>
			<button
				className={`mx-2 btn btn-sm btn-${devices['water-backup'] === 'on' ? 'success' : 'danger'}`}
				onClick={(e) => {
					e.preventDefault();
					toggle(devices['water-backup'] === 'on' ? 'off' : 'on', 'water-backup');
				}}>
				Toggle Backup Water {devices['water-backup'] === 'on' ? 'Off' : 'On'}
			</button>
			<button
				className={`mx-2 btn btn-sm btn-${devices['nitrogen'] === 'on' ? 'success' : 'danger'}`}
				onClick={(e) => {
					e.preventDefault();
					toggle(devices['nitrogen'] === 'on' ? 'off' : 'on', 'nitrogen');
				}}>
				Toggle Nitrogen {devices['nitrogen'] === 'on' ? 'Off' : 'On'}
			</button>
			<button
				className={`mx-2 btn btn-sm btn-${devices['phosphorus'] === 'on' ? 'success' : 'danger'}`}
				onClick={(e) => {
					e.preventDefault();
					toggle(devices['phosphorus'] === 'on' ? 'off' : 'on', 'phosphorus');
				}}>
				Toggle Phosphorus {devices['phosphorus'] === 'on' ? 'Off' : 'On'}
			</button>
			<button
				className={`mx-2 btn btn-sm btn-${devices['potassium'] === 'on' ? 'success' : 'danger'}`}
				onClick={(e) => {
					e.preventDefault();
					toggle(devices['potassium'] === 'on' ? 'off' : 'on', 'potassium');
				}}>
				Toggle Potassium {devices['potassium'] === 'on' ? 'Off' : 'On'}
			</button>
		</div>
	);
};

export default Devices;
