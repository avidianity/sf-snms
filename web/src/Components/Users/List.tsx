import React, { FC } from 'react';
import Table from '../Shared/Table';
import { useQuery } from 'react-query';
import { userService } from '../../Services/user.service';
import { Asker, handleError } from '../../helpers';
import { Link } from 'react-router-dom';
import { useURL } from '../../hooks';
import dayjs from 'dayjs';

type Props = {};

const List: FC<Props> = (props) => {
	const { data: items, isError, error, refetch, isFetching: loading } = useQuery('users', () => userService.fetch());
	const url = useURL();

	if (isError) {
		handleError(error);
	}

	const deleteItem = async (id: any) => {
		if (await Asker.danger('Are you sure you want to delete this user?')) {
			try {
				await userService.delete(id);
				toastr.success('User deleted successfully.');
				refetch();
			} catch (error) {
				handleError(error);
			}
		}
	};

	return (
		<Table
			onRefresh={() => refetch()}
			title='Users'
			loading={loading}
			items={
				items?.map((user) => ({
					...user,
					createdAt: dayjs(user.createdAt).format('MMMM DD, YYYY hh:mm A'),
					actions: (
						<>
							<Link to={url(`${user.id}/edit`)} className='btn btn-warning btn-sm mx-1'>
								<i className='fas fa-edit'></i>
							</Link>
							<button
								className='btn btn-danger btn-sm mx-1'
								onClick={(e) => {
									e.preventDefault();
									deleteItem(user.id);
								}}>
								<i className='fas fa-trash'></i>
							</button>
						</>
					),
				})) || []
			}
			columns={[
				{
					title: 'ID',
					accessor: 'id',
				},
				{
					title: 'Username',
					accessor: 'username',
				},
				{
					title: 'Created',
					accessor: 'createdAt',
				},
				{
					title: 'Actions',
					accessor: 'actions',
				},
			]}
			buttons={
				<>
					<Link to={url(`add`)} className='btn btn-primary btn-sm ml-2'>
						<i className='fas fa-plus'></i>
					</Link>
				</>
			}
		/>
	);
};

export default List;
