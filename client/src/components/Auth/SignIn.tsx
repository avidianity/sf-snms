import React, { FC, useContext, useState } from 'react';
import { usePreventAuth } from '../../hooks';
import Card from '../Shared/Card';
import Swal from 'sweetalert2';
import axios from 'axios';
import { UserContract } from '../../contracts/user.contract';
import State from '@avidian/state';
import { useHistory } from 'react-router';
import { errorToStrings } from '../../helpers';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts';

type Props = {};

interface Inputs {
	email: string;
	password: string;
}

const SignIn: FC<Props> = (props) => {
	const [processing, setProcessing] = useState(false);
	usePreventAuth();
	const history = useHistory();
	const { setUser, setToken } = useContext(AuthContext);
	const { register, handleSubmit, reset } = useForm<Inputs>();

	const submit = async (data: Inputs) => {
		setProcessing(true);
		try {
			const {
				data: { user, token },
			} = await axios.post<{ user: UserContract; token: string }>('/auth/login', data);

			const state = State.getInstance();

			state.set('user', user).set('token', token);
			setUser(user);
			setToken(token);

			await Swal.fire({
				icon: 'success',
				text: `Welcome, ${user.name}!`,
			});

			reset();

			history.push('/dashboard');
		} catch (error) {
			const messages = errorToStrings(error);
			await Swal.fire({
				icon: 'error',
				text: messages.length > 0 ? messages.join('. ') : 'Unable to sign in.',
			});
		} finally {
			setProcessing(false);
		}
	};

	return (
		<div className='row'>
			<div className='col-12 col-md-6 offset-md-3 col-xl-4 offset-xl-4'>
				<Card title='Sign In' subtitle='Please fill in your credentials below'>
					<form onSubmit={handleSubmit(submit)} className='form-row'>
						<div className='form-group col-12'>
							<label htmlFor='email'>Email</label>
							<input {...register('email')} type='email' id='email' className='form-control' />
						</div>
						<div className='form-group col-12'>
							<label htmlFor='password'>Password</label>
							<input {...register('password')} type='password' id='password' className='form-control' />
						</div>
						<div className='form-group col-12'>
							<button type='submit' className='btn btn-primary btn-sm' disabled={processing}>
								{processing ? <i className='material-icons spin'>autorenew</i> : 'Sign In'}
							</button>
						</div>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default SignIn;
