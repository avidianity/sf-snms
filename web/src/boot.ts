import toastr from 'toastr';
import 'toastr/build/toastr.css';
import axios from 'axios';
import './shims';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import 'datatables.net';
import 'datatables.net-bs4';
import { State } from './Libraries/State';

window.toastr = toastr;
window.$ = $;
window.jQuery = $;

axios.defaults.baseURL = `${process.env.REACT_APP_SERVER_URL || 'http://localhost:8000'}`;

axios.defaults.headers.common['Accept'] = 'application/json';

const state = State.getInstance();

if (state.has('token')) {
	const token = state.get('token');
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

state.listen<string>('token', (token) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
});

axios.interceptors.request.use((config) => {
	if (state.has('token')) {
		const token = state.get<string>('token');
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	return config;
});
