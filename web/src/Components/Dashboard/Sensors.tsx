import React, { FC, useCallback, useEffect, useState } from 'react';
import Chart from 'apexcharts';
import { State } from '../../Libraries/State';
import axios from 'axios';
import dayjs from 'dayjs';
import { update } from 'lodash';

type Props = {};

const Sensors: FC<Props> = (props) => {
	const state = State.getInstance();
	const mode = state.get('mode');
	const [temperature, setTemperature] = useState({
		celsius: 0,
		farenheit: 0,
		humidity: 0,
	});
	const [updated, setUpdated] = useState(new Date());

	const setup = useCallback(() => {
		const charts: { config: any; chart: Chart; element: any }[] = [];

		(() => {
			const config = {
				chart: {
					height: 350,
					type: 'radialBar',
				},
				series: [65],
				labels: ['Percentage'],
				theme: {
					mode,
				},
			};
			const element = document.querySelector('#nitrogen');
			const chart = new Chart(element, config);

			charts.push({ chart, config, element });
		})();

		(() => {
			const config = {
				chart: {
					height: 350,
					type: 'radialBar',
				},
				series: [87],
				labels: ['Percentage'],
				theme: {
					mode,
					pallete: 'pallete2',
				},
			};
			const element = document.querySelector('#phosphorus');
			const chart = new Chart(element, config);

			charts.push({ chart, config, element });
		})();

		(() => {
			const config = {
				chart: {
					height: 350,
					type: 'radialBar',
				},
				series: [33],
				labels: ['Percentage'],
				theme: {
					mode,
					pallete: 'pallete3',
				},
			};
			const element = document.querySelector('#potassium');
			const chart = new Chart(element, config);

			charts.push({ chart, config, element });
		})();

		(() => {
			const config = {
				chart: {
					height: 350,
					type: 'radialBar',
				},
				series: [80],
				labels: ['Percentage'],
				theme: {
					mode,
					pallete: 'pallete4',
				},
			};
			const element = document.querySelector('#water');
			const chart = new Chart(element, config);

			charts.push({ chart, config, element });
		})();

		return charts;
	}, [mode]);

	useEffect(() => {
		const charts = setup();

		charts.forEach((chart) => chart.chart.render().catch(console.error));

		const key = state.listen<string>('mode', (mode) => {
			charts.forEach((chart) => {
				chart.chart.destroy();
				chart.config.theme.mode = mode;
				console.log(chart.config, mode);
				chart.chart = new Chart(chart.element, chart.config);
				chart.chart.render().catch(console.error);
			});
		});

		const timeout = setInterval(() => {
			axios
				.get<{ celsius: number; farenheit: number; humidity: number }>('http://192.168.8.105:8000/dht11')
				.then((response) => response.data)
				.then((data) => setTemperature(data))
				.catch(console.error)
				.finally(() => setUpdated(new Date()));
		}, 2000);

		return () => {
			clearInterval(timeout);
			state.unlisten(key);
		};
	}, [setup, state]);

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-12 pb-4'>
					<h1 className='text-center'>Water Container Levels</h1>
					<p className='text-center'>Last Updated: {dayjs(updated).fromNow()}</p>
				</div>
				<div className='col-12'>
					<div className='card-group'>
						<div className='card'>
							<div className='card-header'>
								<h4 className='card-titl text-centere'>Nitrogen</h4>
							</div>
							<div className='card-body'>
								<div id='nitrogen'></div>
							</div>
						</div>
						<div className='card'>
							<div className='card-header'>
								<h4 className='card-title' text-center>
									Phosphorus
								</h4>
							</div>
							<div className='card-body'>
								<div id='phosphorus'></div>
							</div>
						</div>
						<div className='card'>
							<div className='card-header'>
								<h4 className='card-title text-center'>Potassium</h4>
							</div>
							<div className='card-body'>
								<div id='potassium'></div>
							</div>
						</div>
					</div>
				</div>
				<div className='col-12'>
					<div className='card-group'>
						<div className='card'>
							<div className='card-header'>
								<h4 className='card-title text-center'>Water (Pure)</h4>
							</div>
							<div className='card-body'>
								<div id='water'></div>
							</div>
						</div>
						<div className='card'>
							<div className='card-header'>
								<h4 className='card-title text-center'>Temperature</h4>
							</div>
							<div className='card-body d-flex align-items-center justify-content-center'>
								<h1>
									{temperature.celsius.toFixed(1)}C - {temperature.farenheit.toFixed(1)}F
								</h1>
							</div>
						</div>
						<div className='card'>
							<div className='card-header'>
								<h4 className='card-title text-center'>Humidity</h4>
							</div>
							<div className='card-body d-flex align-items-center justify-content-center'>
								<h1>{temperature.humidity}%</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sensors;
