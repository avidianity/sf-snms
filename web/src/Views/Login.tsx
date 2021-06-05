import axios from 'axios';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { handleError } from '../helpers';
import { routes } from '../routes';

type Props = {};

type Inputs = {
	email: string;
	password: string;
};

const Login: FC<Props> = (props) => {
	const [processing, setProcessing] = useState(false);
	const [remember, setRemember] = useState(false);
	const { register, handleSubmit } = useForm<Inputs>();

	const submit = async (payload: Inputs) => {
		setProcessing(true);
		try {
			const { data } = await axios.post('/auth/login', payload);
			console.log(data);
		} catch (error) {
			handleError(error, false);
		} finally {
			setProcessing(false);
		}
	};

	return (
		<div className='wrapper vh-100 overflow-hidden'>
			<div className='row align-items-center h-100'>
				<form className='col-lg-3 col-md-4 col-10 mx-auto text-center' onSubmit={handleSubmit(submit)}>
					<Link className='navbar-brand mx-auto mt-2 flex-fill text-center' to={routes.HOME}>
						<img src='/logo.png' alt='SF-SNMS' style={{ width: '64px', height: '64px' }} className='rounded-circle border' />
					</Link>
					<h1 className='h6 mb-3'>Sign In</h1>
					<div className='form-group'>
						<label htmlFor='email' className='sr-only'>
							Email Address
						</label>
						<input
							{...register('email')}
							type='email'
							id='email'
							className='form-control'
							placeholder='Email Address'
							disabled={processing}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password' className='sr-only'>
							Password
						</label>
						<input
							{...register('password')}
							type='password'
							id='password'
							className='form-control'
							placeholder='Password'
							disabled={processing}
						/>
					</div>
					<div
						className='checkbox mb-3
                     '>
						<label>
							{' '}
							<input type='checkbox' checked={remember} onChange={() => setRemember(!remember)} disabled={processing} />{' '}
							Remember{' '}
						</label>
					</div>
					<button className='btn btn-primary btn-block' type='submit' disabled={processing}>
						{processing ? <i className='la la-circle-notch la-spin'></i> : 'Login'}
					</button>
					<p className='mt-5 mb-3 text-muted'>© {new Date().getFullYear()}</p>
				</form>
			</div>
		</div>
	);
};

export default Login;
