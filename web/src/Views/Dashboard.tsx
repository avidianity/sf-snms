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
									<p>Hello</p>
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
