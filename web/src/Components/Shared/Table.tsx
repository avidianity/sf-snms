import React, { FC, useEffect } from 'react';
import { v4 } from 'uuid';
import { outIf } from '../../helpers';
import { useNullable } from '../../hooks';
import { State } from '../../Libraries/State';

export type TableProps = {
	title: string;
	columns: { title: string; accessor: string }[];
	buttons?: any;
	casts?: { [key: string]: (value: any) => any };
	loading: boolean;
	onRefresh: () => void;
	items: any[];
	misc?: any;
};

const Table: FC<TableProps> = ({ columns, title, buttons, casts, loading, onRefresh, items, misc }) => {
	const id = v4();
	const [datatable, setDatatable] = useNullable<DataTables.Api>();
	const state = State.getInstance();

	const cast = (key: string, value: any) => {
		if (casts && key in casts) {
			return casts[key](value);
		}

		return value;
	};

	useEffect(() => {
		const table = $(`#${id}`);

		if (datatable) {
			datatable.destroy();
		}

		if (table.DataTable) {
			try {
				setDatatable(table.DataTable());
			} catch (error) {
				console.error(error);
			}
		}

		setTimeout(() => {
			$('.dataTables_length')
				.find('select')
				.on('input', function () {
					const select = $(this);
					const value = select.val();
					state.set(`${title.trim().toLowerCase()}-entries`, value);
				});
		}, 500);

		const entries = state.get<string>(`${title.trim().toLowerCase()}-entries`) || '10';

		$('.dataTables_length').find('select').val(entries).trigger('change');

		return () => {
			if (datatable) {
				datatable.destroy();
				setDatatable(null);
			}
		};
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (items.length > 0) {
			$('.dataTables_empty').remove();
		}
	});

	return (
		<div className='container-fluid'>
			<div className='card shadow'>
				<div className='card-header'>
					<div className='container-fluid'>
						<div className='row'>
							<div className='col-12 d-flex align-items-center'>
								<h4 className='card-title mb-0'>{title}</h4>
								<button
									className='btn btn-info btn-sm ml-auto'
									disabled={loading}
									onClick={(e) => {
										e.preventDefault();
										onRefresh();
									}}
									title='Refresh'>
									<i className={`fas fa-sync-alt ${outIf(loading, 'fa-spin')}`}></i>
								</button>
								{buttons}
							</div>
							{misc ? <div className='col-12'>{misc}</div> : null}
						</div>
					</div>
				</div>
				<div className={`card-body table-responsive`}>
					<table id={id} className='table table-hover'>
						<thead>
							<tr>
								{columns.map((column, index) => (
									<th key={index}>{column.title}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{items.map((item, index) => (
								<tr key={index}>
									{columns.map(({ accessor }, index) => (
										<td key={index}>{cast(accessor, item[accessor])}</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Table;
