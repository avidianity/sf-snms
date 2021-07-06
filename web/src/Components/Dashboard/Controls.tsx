import axios from 'axios';
import React, { FC, useState } from 'react';

type Props = {};

const Controls: FC<Props> = (props) => {
	const [pump, setPump] = useState(false);

	const set = async (mode: boolean) => {
		try {
			await axios.get(`http://192.168.8.105:8000/relay-${mode ? 'on' : 'off'}`);
			setPump(mode);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-12 text-center'>
					<h1>Controls</h1>
				</div>
				<div className='col-12 col-md-6 text-center'>
					<h4>Water Pump</h4>
					<button
						className={`btn btn-${pump ? 'danger' : 'info'}`}
						onClick={(e) => {
							e.preventDefault();
							set(!pump);
						}}>
						{pump ? 'Off' : 'On'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Controls;
