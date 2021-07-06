import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useRouteMatch } from 'react-router';
import { UserContract } from '../../Contracts/user.contract';
import { setValues, handleError } from '../../helpers';
import { useMode } from '../../hooks';
import { userService } from '../../Services/user.service';

type Props = {};

const Form: FC<Props> = (props) => {
	const [processing, setProcessing] = useState(false);
	const [mode, setMode] = useMode();
	const { register, setValue, handleSubmit, reset } = useForm<UserContract>();
	const [id, setID] = useState(-1);
	const history = useHistory();
	const match = useRouteMatch<{ id: string }>();

	const fetch = async (id: any) => {
		try {
			const data = await userService.fetchOne(id);
			setID(data.id!);
			setValues(setValue, data);
			setMode('Edit');
		} catch (error) {
			handleError(error);
			history.goBack();
		}
	};

	const submit = async (data: UserContract) => {
		setProcessing(true);
		try {
			await (mode === 'Add' ? userService.create(data) : userService.update(id, data));
			toastr.success('User has been saved successfully.');
			reset();
		} catch (error) {
			handleError(error);
		} finally {
			setProcessing(false);
		}
	};

	useEffect(() => {
		if (match.path.includes('edit')) {
			fetch(match.params.id);
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className='container-fluid'>
			<div className='card'>
				<div className='card-body'>
					<h5 className='card-title'>{mode} User</h5>
					<form onSubmit={handleSubmit(submit)}>
						<div className='form-group'>
							<label htmlFor='username'>Username</label>
							<input {...register('username')} type='text' id='username' className='form-control' disabled={processing} />
						</div>
						<div className='form-group'>
							<label htmlFor='password'>Password</label>
							<input {...register('password')} type='password' id='password' className='form-control' disabled={processing} />
						</div>
						<div className='form-group d-flex'>
							<button type='button' className='btn btn-secondary' onClick={() => history.goBack()} disabled={processing}>
								Return
							</button>
							<button type='submit' className='btn btn-primary ml-auto' disabled={processing}>
								{processing ? <i className='fas fa-circle-notch fa-spin'></i> : 'Save'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Form;
