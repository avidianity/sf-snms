import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { SERVER_URL } from '../constants';

type Props = {
	submit: (data: string) => void;
};

type Inputs = {
	url: string;
};

const PromptServer: FC<Props> = ({ submit }) => {
	const { register, handleSubmit } = useForm<Inputs>({ defaultValues: { url: SERVER_URL } });

	return (
		<>
			<div className='modal fade show d-block' tabIndex={-1}>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title'>Configure Server</h5>
						</div>
						<form onSubmit={handleSubmit((data) => submit(data.url))}>
							<div className='modal-body'>
								<div className='form-group'>
									<label htmlFor='url'>Server URL</label>
									<input {...register('url')} type='url' id='url' className='form-control form-control-sm' />
								</div>
							</div>
							<div className='modal-footer'>
								<button type='submit' className='btn btn-primary btn-sm'>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className='modal-backdrop fade show'></div>
		</>
	);
};

export default PromptServer;
